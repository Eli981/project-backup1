import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  user: User | null | undefined;
  subscription: Subscription | undefined

  constructor(private accountService: AccountService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logout(): void {
    this.accountService.logoutUser();
  }
}
