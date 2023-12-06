import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Account, Login } from '../models/account.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private currentUserSource = new BehaviorSubject<Account |null>(null);
currentUser$= this.currentUserSource.asObservable();

  constructor(private http: HttpClient , private router :Router) { }

  registerUser(userInput:Account): Observable<Login |null > {
  return this.http.post < Login > ('http://localhost:5000/api/account/register',userInput).pipe(
  map(userRes => {
if ( userRes ){

  this.router.navigateByUrl('home');

  return userRes;
  }

  return null;
}));
  }

  loginUser(userInput: User):Observable<Login| null>{

    return this.http.post<Login>('http://localhost:5000/api/User/login-user',userInput).pipe(
        map(login => {
          if (login){
          console.log(login)
          
          this.router.navigateByUrl('home');
          return login;
            }
    return null;
  }));
}


logoutUser():void{
  this.currentUserSource.next(null);
  
  localStorage.removeItem('user')
  
  this.router.navigateByUrl('/login');
}
}
