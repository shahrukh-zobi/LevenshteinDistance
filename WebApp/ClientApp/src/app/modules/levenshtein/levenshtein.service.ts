import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevenshteinService {

  constructor(private httpClient: HttpClient) { }

  GetMinimumDistance(stringA: string, stringB: string) {
    return this.httpClient.get<LevenshteinResponse>(environment.apiUrl + `Levenshtein/GetMinimumDistance?stringA=${stringA}&stringB=${stringB}`);
  }
}
