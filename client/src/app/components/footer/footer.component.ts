import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, MatButtonModule]
})
export class FooterComponent {
  userService = inject(UserService);
  accountService = inject(AccountService);

  allUsers: User[] | null | undefined;
  allUsers$: Observable<User[] | null> | undefined;
  showAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: User[] | null) => this.allUsers = users,
      error: err => console.log(err.message),
    });

    this.allUsers$ = this.userService.getAllUsers();
  }

  logout(): void {
    this.accountService.logoutUser();
  }
}