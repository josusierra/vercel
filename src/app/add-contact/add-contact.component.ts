import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Contact } from '../interfaces/contact';

@Component({
  selector: 'app-add-contact',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-contact.component.html',
})

export class AddContactComponent {
  /*private fb: FormBuilder = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    contacts: this.fb.array([], Validators.required) // Contacts se inicializa vacío.
  });*/
  message: string = '';
  myForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      contacts: this.fb.array([], Validators.required) // Contacts se inicializa vacío.
    });
  }
 /* myForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.myForm = this.fb.group({
      contacts: this.fb.array([]), // lo inicializamos vacío
    });
  }*/
  //private fb: FormBuilder = inject(FormBuilder);

 // newContact: FormControl = this.fb.control('', Validators.required);


  get contacts(): FormArray {
    return this.myForm.get('contacts') as FormArray;
  }


  addContact(): void {
    const contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      direccion: ['', Validators.required],
    });
    
    this.contacts.push(contactForm); 
  }

  saveContacts(): void {
    
    const contactos = this.contacts.value; 
  
    contactos.forEach((contact: Contact) => {
      this.userService.saveContact(contact).subscribe({
        next: response => {
          console.log('Contacto guardado:', response);
        },
        error: error => {
          console.error('Error al guardar el contacto:', error);
        }
      });
    });
    /* this.userService.saveContacts(this.contacts.value).subscribe({
        next: () => console.log('Contactos guardados exitosamente'),
        error: (err) => console.error('Error al guardar contactos:', err),
      });*/
    
      this.message = 'Contactos guardados con éxito';
      this.contacts.clear();
      this.myForm.reset();

  }

  deleteContact(index: number): void {
    this.contacts.removeAt(index); 
  }
  
//método distinto al resto para validar los campos de los contactos. 
//La diferencia es que es para formularios dinamicos con los controles dentro de un FormArray.
//por ejemplo si quieres verificar el campo email del SEGUNDO contacto.
//tomas un índice para pillar el grupo de controles dentro del array y luego verifica el campo x en ese grupo
  isValidField(arrayIndex: number, field: string): boolean {
    const group = this.contacts.at(arrayIndex) as FormGroup;
    return group.controls[field]?.invalid && group.controls[field]?.touched;
  }
  
}
