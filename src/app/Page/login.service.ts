import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:1020/mascotas/login'; 

  constructor(private http: HttpClient) {}
  login(data: any): Observable<any>{
    return this.http.post<any>(`${this.loginUrl}`,data).pipe(res=>res);
  }
}
