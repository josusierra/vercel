import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Contact } from '../interfaces/contact';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-contactos',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './mis-contactos.component.html',
})
export class MisContactosComponent {
  contactos: Contact[] = [];

  constructor(private authService: UserService) {}


  ngOnInit(): void {
    this.fetchContacts();
  }

  deleteContact(contacto: string){
    this.authService.deleteContact(contacto);
  }

  fetchContacts(): void {
    this.authService.contacts.subscribe({
      next: (contacts) => {
        this.contactos = contacts;
      },
      error: (error) => {
        console.error('Error al obtener los contactos:', error);
      },
    });
    this.authService.getContacts(); 
  }
}
