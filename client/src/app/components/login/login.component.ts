import { Component, OnDestroy } from '@angular/core';
import { Account, Login } from '../../models/account.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnDestroy
 { 

   accountRes: Login|undefined;
   subscribed: Subscription| undefined;  
   res :any
  
  constructor(private fb :FormBuilder , private http:HttpClient , private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe;
  }
  
  userFg = this.fb.group({
    // usernameCtrl:['',[Validators.required, Validators.minLength(3)]],
    emailCtrl:['',[Validators.required]],
    passwordCtrl:['',  [Validators.minLength(6), Validators.maxLength(8), Validators.required]] ,
    
  });
  
  
  logIn(): void {

    let enter:Login={
      // username: this.UsernameCtrl.value,
      email: this.EmailCtrl.value,
      password:this.PasswordCtrl.value
    }

    this.subscribed = this.http.post<Login>('http://localhost:5000/api/User/login-user',enter).subscribe(
      {
        next: res => {
          console.log(res)
          this.accountRes = res
          this.router.navigateByUrl('');

    }
  }
  );
}



// get UsernameCtrl():FormControl{
//   return this.userFg.get('usernameCtrl') as FormControl;
// }
 get EmailCtrl():FormControl{
   return this.userFg.get('emailCtrl') as FormControl;   
 }
 get PasswordCtrl():FormControl{
  return this.userFg.get ('passwordCtrl') as FormControl;
 }
}