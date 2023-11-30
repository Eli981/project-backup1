import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  allUsers: User[] | undefined;

constructor(private adminService: AdminService) {}

  showAllUsers() {
    this.adminService.getAllUser().subscribe({
        next: users => this.allUsers = users,
        error: err => console.log(err)
      });
  }
}
