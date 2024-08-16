import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HireMeService {
  private apiUrl = 'my-api-base-url'
  constructor(private http: HttpClient) { }

  public sendRequest(): string {
    return 'Data from MyService';
    // this.http.post()
  }
}
