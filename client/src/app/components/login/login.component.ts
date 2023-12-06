import { Component, OnDestroy } from '@angular/core';
import { Account, Login } from '../../models/account.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnDestroy
 { 

   subscribed: Subscription| undefined;  
   apiErrorMessage: string |undefined;
  
  constructor(private fb :FormBuilder , private accountService : AccountService) {
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe;
  }
  
  userFg = this.fb.group({
    usernameCtrl:['',[Validators.required, Validators.minLength(3)]],
    emailCtrl:['',[Validators.required]],
    passwordCtrl:['',  [Validators.minLength(6), Validators.maxLength(8), Validators.required]] ,
    
  });
  

get UsernameCtrl():FormControl{
  return this.userFg.get('usernameCtrl') as FormControl;
}
 get EmailCtrl():FormControl{
   return this.userFg.get('emailCtrl') as FormControl;   
 }
 get PasswordCtrl():FormControl{
  return this.userFg.get ('passwordCtrl') as FormControl;
 }



 logIn(): void {

  let login:Login={

    username: this.UsernameCtrl.value,
    email: this.EmailCtrl.value,
    password:this.PasswordCtrl.value
  }

  this.accountService.loginUser(login).subscribe({
    next :login =>console.log(login),
    // error:err =>this.apiErrorMessage =err.error
  })
  }
 }