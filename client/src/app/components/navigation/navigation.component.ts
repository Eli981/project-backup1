import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: User | null | undefined;

  constructor(private accountService: AccountService) { }


  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: response => this.user = response
    });
  }

  logout(): void {
    this.accountService.logoutUser();
  }
}