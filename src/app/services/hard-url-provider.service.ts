import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, combineLatest, timer } from 'rxjs';
import { map, catchError, switchMap, shareReplay } from 'rxjs/operators';
import { IUrlProvider } from '../interfaces/url-provider.service.interface';

@Injectable({
  providedIn: 'root'
})
export class HardUrlProviderService implements IUrlProvider {
  private servers = [
    {
      serverName: 'Azure Training Tools',
      healthCheckUrl: 'https://training-tools.azurewebsites.net/health',
      apiUrl: 'https://training-tools.azurewebsites.net/api/v1'
    },
    {
      serverName: 'Somee Training Tools',
      healthCheckUrl: 'https://trainingtools.somee.com/health',
      apiUrl: 'https://trainingtools.somee.com/api/v1'
    }
  ];

  private lastChecked: number = 0;
  private cacheDuration: number = 30 * 60 * 1000; // 30 minutes in milliseconds
  private apiUrl$: Observable<string>;

  constructor(private http: HttpClient) {
    this.apiUrl$ = this.checkServers().pipe(
      shareReplay(1) // Cache the latest result
    );
  }

  private __isAvailableUrl(url: string): Observable<boolean> {
    return this.http.get(url, { observe: 'response' }).pipe(
      map(response => response.status >= 200 && response.status < 300),
      catchError(() => of(false))
    );
  }

  private checkServers(): Observable<string> {
    // Create an array of observables for checking server availability
    const availabilityChecks: Observable<string | null>[] = this.servers.map(server =>
      this.__isAvailableUrl(server.healthCheckUrl).pipe(
        map(isAvailable => isAvailable ? server.apiUrl : null)
      )
    );

    // Combine all observables and return the first available API URL
    return combineLatest(availabilityChecks).pipe(
      map(results => results.find(apiUrl => apiUrl !== null)),
      switchMap(apiUrl => {
        if (apiUrl) {
          return of(apiUrl);
        } else {
          return throwError(() => new Error('No available servers'));
        }
      })
    );
  }

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastChecked > this.cacheDuration;
  }

  getAvailableApiUrl(): Observable<string> {
    if (this.shouldRefreshCache()) {
      // Refresh the cache
      this.lastChecked = Date.now();
      this.apiUrl$ = this.checkServers().pipe(
        shareReplay(1) // Cache the latest result
      );
    }
    return this.apiUrl$;
  }
}
