import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Account } from '../../models/account.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnDestroy {

  userRes: Account | undefined;
  globAccount: Account | undefined;
  subscribed : Subscription | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }
  
  ngOnDestroy(): void {

  this.subscribed?.unsubscribe;
  
  }

  userFg = this.fb.group({ // formGroup
    usernameCtrl: ['', [Validators.minLength(3)]], // formControl
    emailCtrl: ['', [Validators.required, Validators.email]],// ya . pattern mizanim  va az regEx estefade mikonim . 
    passwordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
  });

  registerUser(): void {

    let signup: Account = {

      username: this.UsernameCtrl.value,
      email: this.EmailCtrl.value,
      password: this.PassswordCtrl.value,
      confirmPassword: this.ConfirmPassword.value
    }

    this.http.post<Account>('http://localhost:5000/api/Account/register', signup).subscribe(// dar in khat b jaye in khat az service estefade mikonim . edit shavad . <==
      {
        next: res => {
          this.globAccount = res;
          this.router.navigateByUrl('log-in');
        }
      }
    );
  }

  get UsernameCtrl(): FormControl {
    return this.userFg.get('usernameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PassswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.userFg.get('confirmPasswordCtrl') as FormControl;
  }
}
