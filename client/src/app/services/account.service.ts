import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, RegisterUser } from '../models/account.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userInput: RegisterUser): Observable<User | null> {
    return this.http.post<User>('http://localhost:5000/api/account/register', userInput).pipe(
      map(userRes => {
        if (userRes) {
          this.setCurrentUser(userRes);

          this.router.navigateByUrl('home');

          return userRes;
        }

        return null;
      }
      ));
  }


  loginUser(userInput: Login): Observable<User | null> {
    return this.http.post<User>('http://localhost:5000/api/user/login-user', userInput).pipe(
      map(login => {
        if (login) {
          console.log(login)
          this.setCurrentUser(login);

          return login;
        }

        return null;
      })
    );
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);

    localStorage.setItem('user', JSON.stringify(user));
  }

  logoutUser(): void {
    this.currentUserSource.next(null);

    localStorage.removeItem('user')

    this.router.navigateByUrl('/no-access');
  }
}
