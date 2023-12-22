import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUser } from '../../models/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ]

})
export class signupComponent implements OnDestroy {
  accountService = inject(AccountService);
  fb = inject(FormBuilder);

  passowrdsNotMatch: boolean | undefined;
  apiErrorMessage: string | undefined;
  subscribed: Subscription | undefined;
  confirmPasswordCtrl: any;

  ngOnDestroy(): void {

    this.subscribed?.unsubscribe;

  }

  userFg = this.fb.group({ // formGroup
    usernameCtrl: ['', [Validators.minLength(3)]], // formControl
    emailCtrl: ['', [Validators.required, Validators.email]],// ya . pattern mizanim  va az regEx estefade mikonim . 
    passwordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
  });




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



  register(): void {
    this.apiErrorMessage = undefined;
    if (this.PassswordCtrl.value === this.confirmPasswordCtrl.value) {
      this.passowrdsNotMatch = false;

      let signup: RegisterUser = {

        username: this.UsernameCtrl.value,
        email: this.EmailCtrl.value,
        password: this.PassswordCtrl.value,
        confirmPassword: this.ConfirmPassword.value
      }

      this.accountService.registerUser(signup).subscribe({
        next: signup => console.log(signup),
        error: err => this.apiErrorMessage = err.error
      })
    }
    else
      this.passowrdsNotMatch = true;
  }
}