import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {

    currentUser: any = null;
  
    constructor(private userService: UserService, private route: ActivatedRoute) {}
  
    messageShow: string='';
  
    ngOnInit(): void {
      //obtenemos el usuario actual
      this.userService.currentUser.subscribe((user) => {
        this.currentUser = user;
      });
    
      // para que el mensaje de login salga aquí.
     /* this.route.paramMap.subscribe((params) => {
        let message= params.get('message2');
        if (message) {
          console.log('Mensaje recibido:', decodeURIComponent(message));
          this.messageShow = decodeURIComponent(message); 
        }
      });*/
    }
    
}
