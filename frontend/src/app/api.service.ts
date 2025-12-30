import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getVinyls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vinyls`);
  }

  editVinyl(vinylId: number, vinylData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/vinyls/${vinylId}`, vinylData);
  }

  createVinyl(vinylData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/vinyls`, vinylData);
  }

  deleteVinyl(vinylId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/vinyls/${vinylId}`);
  }

}
