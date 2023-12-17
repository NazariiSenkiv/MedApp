import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }

  public getCurrentUserId(): number {
    // TODO: implement
    return 6
  }

  public getCurrentUserName(): string {
    // TODO: implement
    return "John Doe"
  }
}
