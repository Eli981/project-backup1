import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http :HttpClient) { }

  getAllUser():Observable<User[]>{
  return this.http.get<User[]>('https://localhost:5001/api/User').pipe(
    map(users =>{
      return users;
    })
  )
}
}