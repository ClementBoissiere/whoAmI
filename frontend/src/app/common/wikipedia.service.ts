import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  private apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  private http: HttpClient = inject(HttpClient);
  
  constructor() { }

  getIntroduction(personality: string): Observable<string> {
    const formattedName = encodeURIComponent(personality);
    return this.http.get<any>(`${this.apiUrl}${formattedName}`).pipe(
      map(response => response.extract)
    );
  }
}
