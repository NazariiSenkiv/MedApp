import { Injectable } from '@angular/core';
import { LoginData, UserModel } from '../interfaces/user';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private loginEndpoint = `${API_BASE_URL}/Login`;

  private currentUser: UserModel | null = null;

  private localStorageKey = 'currentUser';

  protected doctorId: number = 2

  constructor(private http: HttpClient) 
  {
    const storedUser = localStorage.getItem(this.localStorageKey);
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  public isDoctor(): boolean {
    return this.currentUser?.userRoleId == this.doctorId;
  }

  public getCurrentUser(): UserModel | null {
    return this.currentUser;
  }

  public getCurrentUserId(): number {
    return this.currentUser ? this.currentUser.id : -1;
  }

  public getCurrentUserName(): string | null {
    return this.currentUser ? this.currentUser.name : null;
  }

  public loginCurrentUser(loginData: LoginData): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.loginEndpoint}`, loginData).pipe(
      tap(user => {
        this.currentUser = user;
        localStorage.setItem(this.localStorageKey, JSON.stringify(user));
      })
    );
  }
}
