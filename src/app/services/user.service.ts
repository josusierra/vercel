import { Injectable } from '@angular/core';
import { PersonaLogin, PersonaLoginResponse, PersonaRegister } from '../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrlLogin: string = 'http://localhost:3000/api/auth/login';
  private apiUrlCheck: string ='http://localhost:3000/api/auth/check-email';
  private apiUrlRegister: string ='http://localhost:3000/api/auth/register';
  private apiUrlContacts: string ='http://localhost:3000/api/contactos';

  private currentUserSubject$ = new BehaviorSubject<any | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );

  private ContactSubject$ = new BehaviorSubject< Contact[]>([]);


  constructor(private httpClient: HttpClient) { }



      getContactById(id: string): Contact | undefined {
        const contacts = this.ContactSubject$.getValue(); 
        return contacts.find(contact => contact.id === id); //filtramos por el contacto que hemos selecionado
      }

      getContactByIdObservable(id: string): Observable<Contact> {
        return this.httpClient.get<Contact>(`${this.apiUrlContacts}/${id}`);
      }
     
      get contacts(){
        return  this.ContactSubject$.asObservable();
      }
      

    editContact(id: string, updatedContact: Contact): Observable<Contact> {
      return this.httpClient.put<Contact>(`${this.apiUrlContacts}/${id}`, updatedContact);
    }

    deleteContact(id: string): void {
      this.httpClient.delete<Contact>(`${this.apiUrlContacts}/${id}`)
      .subscribe({
        // next: task => this.taskSubject$.next(this.taskSubject$.getValue().filter(task=> task.id != id)) ,
        next: contact => {
          this.getContacts();
        },
        error: error => console.log(error)
      })
    }

    getContacts(): void {
      const userId = this.currentUserSubject$.value?.userId;
      if (!userId) return;
    
      this.httpClient.get<Contact[]>(`${this.apiUrlContacts}/${userId}`).subscribe({
        next: contacts => this.ContactSubject$.next(contacts),
        error: err => console.error(err)
      });
    }
  
    saveContact(contact: Contact): Observable<Contact> {
      const userId = this.currentUserSubject$.value?.userId;
      if (!userId) throw new Error('Usuario no autenticado');
    
      const newContact = { ...contact, userId };
      return this.httpClient.post<Contact>(this.apiUrlContacts, newContact);
    }

        
    login(persona: PersonaLogin): Observable<PersonaLoginResponse> {
      return this.httpClient.post<PersonaLoginResponse>(this.apiUrlLogin, persona).pipe(
        tap((response) => {
          const user = {
            userId: response.userId,
            email: persona.email,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject$.next(user);
        })
      );
    }
    
    

  register(persona: PersonaRegister): Observable<PersonaRegister> {
    return this.httpClient.post<PersonaRegister>(this.apiUrlRegister, persona);
  }

  register2(nombre:string,email: string, password: string, confirmPassword: string): Observable<PersonaRegister> {
    return this.httpClient.post<PersonaRegister>(this.apiUrlRegister,  { email, password, nombre, confirmPassword });
   }


  emailExists(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrlCheck}/${email}`);
  }

  get currentUser() {
    return this.currentUserSubject$.asObservable();
  }



    logout(): void {
      localStorage.removeItem('currentUser');
      this.currentUserSubject$.next(null);    }


//PARA HACERLO SIN INTERFAZ EN EL PARÁMETRO:
 /* login(email: string, password: string): Observable<PersonaLogin> {
    return this.httpClient.post<PersonaLogin>(this.apiUrlLogin, { email, password }).pipe(
      tap((response) => {
        // Con esto actualizo el estado del usuario después del login
        const user = {
          userId: response.userId,
          email: email,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject$.next(user);
      })
    );
  }*/




//versiones anteriores


  /*getUserDetails(userId: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/api/users/${userId}`);
  }*/

      /*  getContact(id: string): Observable<Contact> {
      return this.httpClient.get<Contact>(`${this.apiUrlContacts}/${id}`)
    }*/

   /* getContacts4(): void {
      this.httpClient.get<Contact[]>(this.apiUrlContacts, {  })
      .subscribe({
        next: contacts => this.ContactSubject$.next(contacts)
      })
    }*/

     /* saveContacts(contacts: Contact[]): Observable<Contact[]> {
        const userId = this.currentUserSubject$.value?.userId;
        if (!userId) throw new Error('Usuario no autenticado');
        return this.httpClient.post<Contact[]>(`${this.apiUrlContacts}/${userId}`, contacts);
      }*/


         /* login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.apiUrlLogin, { email, password });
  }*/
}
