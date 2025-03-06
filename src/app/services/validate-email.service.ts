import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';
import { CheckEmailResponse } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class ValidateEmailService implements AsyncValidator{

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    
    
    return this.http.get<CheckEmailResponse>(`http://localhost:3000/api/auth/check-email/${email}`)
    .pipe(
      map( resp => {
        return (resp.exists) ? { emailTaken: true} : null 
      })

    )
    
    
  }
}