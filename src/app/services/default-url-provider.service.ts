import { combineLatest, Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IUrlProvider } from '../interfaces/url-provider.service.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService implements IUrlProvider {
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

  constructor(private http: HttpClient) {}

  private __isAvailableUrl(url: string): Observable<boolean> {
    return this.http.get(url, { observe: 'response' }).pipe(
      map(response => {console.log(`Request to (${url}) response: ${response.status}`);return response.status >= 200 && response.status < 300;}),
      catchError(() => of(false))
    );
  }

  getAvailableApiUrl(): Observable<string> {
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
}
