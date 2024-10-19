import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserState } from '../store/state/users.state';
import { Users, UsersDetails } from '../Types/users.type';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private baseUrl = 'https://reqres.in/api/users'
  private http = inject(HttpClient)


  getUser(page:number):Observable<any>{
      return this.http.get<any>(`${this.baseUrl}?page=${page}`)
  }

  getUserDetails(id: number):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }



}
