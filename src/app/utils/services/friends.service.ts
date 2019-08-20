import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  url: string = 'http://favr.api/';
  constructor(private http: HttpClient) { }

  getFriends() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IncxZUh6cmxsYVRUOVhCRGY3dmsyS1ozM3RoOURwRnBTREtYSFBNRlEzS0oxZFdtYWxYR1VnTktZdmVDVnhEcngi.JLHHg9mU7pwu7dQUxmCUQOg2NCEl5TRUhhJMfLMWrf4';
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get(this.url + 'friends', options);
  }

  searchUsers(query: string) {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IncxZUh6cmxsYVRUOVhCRGY3dmsyS1ozM3RoOURwRnBTREtYSFBNRlEzS0oxZFdtYWxYR1VnTktZdmVDVnhEcngi.JLHHg9mU7pwu7dQUxmCUQOg2NCEl5TRUhhJMfLMWrf4';
    const headers = new HttpHeaders().set('Authorization', token);
    const params = new HttpParams().set('search', query);
    return this.http.get(this.url + 'search', {headers, params});
  }
}
