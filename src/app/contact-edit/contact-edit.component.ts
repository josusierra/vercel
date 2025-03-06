import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Contact } from '../interfaces/contact';
import { CommonModule } from '@angular/common';
//Esto no es pedido en el pdf, es un extra.
@Component({
  selector: 'app-contact-edit',
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './contact-edit.component.html',
})
export class ContactEditComponent implements OnInit {
  @Input() id!: string; 
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Creao el formulario vacío
   
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      direccion: ['', Validators.required],
    });

    const contact = this.userService.getContactById(this.id);

    if (contact) {
      console.log('Datos del contacto:', contact);
      this.editForm.patchValue(contact);
    } else {
      console.error('Contacto no encontrado');
      // mensaje error o redirigir
    }

    // Si el método devolviera un Observable<Contact> en lugar de un Contact, si estuviera
    // el endpoint necesario, sería:
    /* this.userService.getContactById(this.id).subscribe({
      next: (contact) => {
        console.log('Datos del contacto:', contact);
        this.editForm.patchValue(contact); 
      },
      error: (err) => {
        console.error('Error al obtener el contacto:', err);
      },
    });*/
  }

  isValidField(field: string) {
    return this.editForm.controls[field].errors && this.editForm.controls[field].touched;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.userService.editContact(this.id, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/contacts']), 
        error: (err) => console.error('Error al editar contacto:', err),
      });
    }
  }
}
