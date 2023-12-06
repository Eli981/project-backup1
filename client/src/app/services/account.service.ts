import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private currentUserSource = new BehaviorSubject<Account |null>(null);
currentUser$= this.currentUserSource.asObservable();

  constructor(private http: HttpClient , private router :Router) { }

  registerUser(userInput:Account): Observable<Account |null > {
  return this.http.post < Account > ('http://localhost:5000/api/account/register',userInput).pipe(
  map(userRes => {
if ( userRes ){

  this.setCurrentUser(userRes);
  this.router.navigateByUrl('/');
  return userRes;
  }
  return null;
})
  );
  
  }
  setCurrentUser(user: Account): void {
    this.currentUserSource.next(user);
    
    localStorage.setItem('user', JSON.stringify(user));
  }
}  

//az service baraye sepraion of consernse esttefade mishavad.. 