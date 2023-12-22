import { Component, OnDestroy } from '@angular/core';
import { Login } from '../../models/account.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class loginComponent implements OnDestroy {

  subscribed: Subscription | undefined;
  apiErrorMessage: string | undefined;

  constructor(private fb: FormBuilder, private accountService: AccountService, private route: Router) { }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe();
  }

  userFg: FormGroup = this.fb.group({
    usernameCtrl: ['', [Validators.required, Validators.minLength(3)]],
    emailCtrl: ['', [Validators.required]],
    passwordCtrl: ['', [Validators.minLength(6), Validators.maxLength(8), Validators.required]],
  })


  get UsernameCtrl(): FormControl {
    return this.userFg.get('usernameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }



  logIn(): void {
    this.apiErrorMessage = undefined;

    let user: Login = {
      username: this.UsernameCtrl.value,
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value
    }

    this.accountService.loginUser(user).subscribe({
      next: user => {
        console.log(user),
          this.route.navigateByUrl('home');
      },
      error: err => this.apiErrorMessage = err.error
    })
  }
}