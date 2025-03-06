import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { PersonaRegister } from '../interfaces/persona';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(private authService: UserService) {}

  private fb: FormBuilder = inject(FormBuilder);

  registrationSuccess: boolean = false;

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ,]],
    confirmPassword: [null, [Validators.required]],  },
  {
    validators: this.passwordsMatchValidator('password', 'confirmPassword'),
  }
)

submit(): void {
  if (this.myForm.valid) {
    const persona: PersonaRegister = this.myForm.value; 
    this.authService.register(persona).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.registrationSuccess = true; 

      },
      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });
  } else {
    this.myForm.markAllAsTouched();
  }
}
isValidField(field: string) {
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}


passwordsMatchValidator(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const passControl = formGroup.controls[password];
    const confirmPassControl = formGroup.controls[confirmPassword];

    if (confirmPassControl.errors && !confirmPassControl.errors['passwordMismatch']) {
      return;
    }

    if (passControl.value !== confirmPassControl.value) {
      confirmPassControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPassControl.setErrors(null);
    }
  };
}



/*submit3(){
  if (this.myForm.valid) {
    console.log('Formulario enviado');
    this.myForm.reset({
      nombre: 'Patatas',
      precio:0
    })
  }

  this.myForm.markAllAsTouched()
}*/



//Sin interfaz en el parámetro
/*submit2(): void {
  if (this.myForm.valid) {
  console.log('Botón de iniciar sesión pulsado');
  
    const { nombre, email, password, confirmPassword } = this.myForm.value;
    this.authService.emailExists(email).subscribe({
      next: (response) => {
        if (!response.exists) {
          this.authService.register2(nombre, email, password, confirmPassword ).subscribe({
            next: (user) => {
              console.log('Registro exitoso:', user);
              // Aquí puedes manejar la respuesta, como guardar el token o redirigir al usuario.
            },
            error: (error) => {
              console.error('Error en el registro:', error);
              // Maneja los errores, como mostrar un mensaje al usuario.
            }
          });

        } else {
          console.error('No existe el email');
        }
      }, error: (error) => {
        console.error('Error al verificar el correo:', error);
      }     
  }
)
}
else{
  this.myForm.markAllAsTouched();
}
}*/

}
