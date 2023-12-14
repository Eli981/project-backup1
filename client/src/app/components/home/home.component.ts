import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | null | undefined;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: res => this.user = res
    });
  }

  logout(): void {
    this.accountService.logoutUser();
  }
}
