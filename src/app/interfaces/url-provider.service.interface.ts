import {Observable} from "rxjs";

export interface IUrlProvider {
  getAvailableApiUrl(): Observable<string>;
}
