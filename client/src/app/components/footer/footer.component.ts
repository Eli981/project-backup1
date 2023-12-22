import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
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