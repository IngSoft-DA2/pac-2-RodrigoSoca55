import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReflectionService {
  private apiUrl = 'http://localhost:5000/api/reflection';

  constructor(private http: HttpClient) { }

  getImporters(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/importers`);
  }
}