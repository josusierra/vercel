import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class NavbarComponent implements OnInit {
  userName: string | null = null;
  currentUser: any = null;

  constructor(private userService: UserService) {}



  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.userService.logout();
  }
}
