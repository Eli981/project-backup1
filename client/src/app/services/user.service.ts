import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  private readonly baseApiUrl = environment.apiUrl + 'user/';

  getAllUsers(): Observable<User[] | null> {


    return this.http.get<User[]>(this.baseApiUrl).pipe(
      map((users: User[]) => {
        if (users)
          return users;

        return null;
      })
    )
  }

  getUserById(): Observable<User | null> {
    return this.http.get<User>(this.baseApiUrl + '10923849128437912').pipe(
      map((user: User | null) => {
        if (user)
          return user;

        return null;
      })
    )
  }
}