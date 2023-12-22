import { Component, OnDestroy, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  userService = inject(UserService);
  accountService = inject(AccountService);

  allUsers: User[] | null | undefined;
  allUsers$: Observable<User[] | null> | undefined; subscription: Subscription | undefined


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logout(): void {
    this.accountService.logoutUser();
  }
}
