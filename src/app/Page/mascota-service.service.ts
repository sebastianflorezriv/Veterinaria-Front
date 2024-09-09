import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaServiceService {
  private Url: string = 'http://localhost:1020/mascotas';
  constructor(private http:HttpClient) { }

  getMascotas(): Observable<any> {
    return this.http.get<any>(`${this.Url}/All`).pipe(res=>res);
  }
  AddMascota(mascota: any): Observable<any>{
    return this.http.post<any>(`${this.Url}/saveOrUpdate`,mascota).pipe(res=>res);

  }
  DeleteMascota(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}/Delete`,formdata).pipe(resp => resp)
  }
  
  getMascotaById(formdata: any): Observable<any> {
    return this.http.post<any>(`${this.Url}/findById`,formdata);
  }
}
