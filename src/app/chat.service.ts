import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Disponível em toda a aplicação
})
export class ChatService {
  private apiUrl = 'http://localhost:5215/api/chat/ask'; // URL da API

  constructor(private http: HttpClient) {}

// Método para enviar uma mensagem e obter a resposta
enviarMensagem(mensagem: string): Observable<any> {
  const payload = { Question: mensagem }; // Formato esperado pela API
  console.log('Payload enviado para a API:', payload); // Log do payload enviado

  return this.http.post<any>(this.apiUrl, payload).pipe(
    catchError((error) => {
      console.error('Erro ao enviar mensagem:', error); // Log do erro
      // Retorna um erro tratado para quem chamou o método
      return throwError(() => new Error('Erro ao enviar mensagem. Tente novamente.'));
    })
  );
}
}