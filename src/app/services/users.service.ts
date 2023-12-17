import { Injectable } from '@angular/core';
import { UserModel } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

import { API_BASE_URL } from '../api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userWardsEndpoint = `${API_BASE_URL}/UsersWards`;
  private usersEndpoint = `${API_BASE_URL}/Users`;

  constructor(private http: HttpClient) { }

  public getFullNameById(userId: number): string {
    // TODO: add call to API
    return "John Doe"
  }

  public getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.usersEndpoint}/${userId}`)
  }

  public getWards(userId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.userWardsEndpoint}/${userId}`)
  }
}
