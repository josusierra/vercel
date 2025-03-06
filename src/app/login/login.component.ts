import { JsonPipe, CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { PersonaLogin } from '../interfaces/persona';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  message: string = '';
  constructor(
    private authService: UserService,
    private router: Router
  ) {}

  @ViewChild('myForm') myForm! : NgForm;
  email: string = "";
  //message2: string = "Login exitoso.";
  successMessage = "";
  notValid(field: string): boolean {
    return this.myForm?.controls[field].invalid && this.myForm?.controls[field].touched
  }

  save(): void {
    if (this.myForm.valid) {

    const { email, password } = this.myForm.value;
  
    const personaLogin: PersonaLogin = { email, password };
  
    this.authService.emailExists(email).subscribe({
      next: (response) => {
        if (response.exists) {
          this.authService.login(personaLogin).subscribe({
            next: (loginResponse) => {
              console.log('Login exitoso:', loginResponse);
              this.successMessage="Login exitoso";
             // this.router.navigate(['/welcome', encodeURIComponent(this.message2)]);
            },
            error: (error) => {
              console.error('Error en el login:', error);
              this.message = 'Error en el login';

            }
          });
        } else {
          console.error('El email no existe');
          this.message = 'El email no existe';

        }
      },
      error: (error) => {
        console.error('Error al verificar el correo:', error);
        this.message = 'Error al verificar el correo';

      }
    });
  }else {
    this.myForm.form.markAllAsTouched(); 
    console.error('El formulario no es válido');
    this.message = 'El formulario no es válido';
  }
  }
  
  

  
  //PARA HACERLO SIN INTERFAZ EN EL PARÁMETRO DEL MÉTODO LOGIN DEL SERVICIO:
  
/*  save(): void {
    //if (this.myForm.valid) {
    console.log('Botón de iniciar sesión pulsado');
    
      const { email, password } = this.myForm.value;
      this.authService.emailExists(email).subscribe({
        next: (response) => {
          if (response.exists) {
            this.authService.login(email, password).subscribe({
              next: (user) => {
                console.log('Login exitoso:', user);
                // no sé si guardar el token aquí 
                this.router.navigate(['/welcome'])
              },
              error: (error) => {
                console.error('Error en el login:', error);
                //podría mostrar un mensaje de error al usuario.
              }
            });

          } else {
            console.error('no existe el email');
          }
        }, error: (error) => {
          console.error('Error al verificar el correo:', error);
        }
  })
  //   } else {
    //  this.myForm.control.markAllAsTouched();
   // }
     
  }
*/
}
