import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [
    CommonModule, RouterModule, MatButtonModule,
    HttpClientModule
  ]
})
export class NavigationComponent implements OnInit {
  accountService = inject(AccountService);

  user: User | null | undefined;

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: response => this.user = response
    });
  }

  logout(): void {
    this.accountService.logoutUser();
  }
}