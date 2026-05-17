import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // TODO: Descomentar cuando vayas a conectar con un backend real
  // private readonly http = inject(HttpClient);
  // private readonly apiUrl = 'https://api.tecsisman.com/v1/contact';

  sendMessage(data: ContactMessage): Observable<void> {
    // Implementación temporal (Mock): Simula una petición de 1.5 segundos
    console.log('Mensaje de contacto interceptado por el simulador:', data);
    return of(undefined).pipe(delay(1500));

    // Implementación real:
    // return this.http.post<void>(this.apiUrl, data);
  }
}