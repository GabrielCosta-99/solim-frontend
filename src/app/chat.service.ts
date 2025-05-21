import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatResponse {
  resposta: string;
}

interface ChatRequest {
  Pergunta: string;
}

@Injectable({
  providedIn: 'root',
})

export class ChatService {
  private baseUrl = 'http://localhost:5215/api/chat/chat'; // sua URL do backend

  constructor(private http: HttpClient) {}

  enviarPergunta(pergunta: string): Observable<ChatResponse> {
    const payload: ChatRequest = { Pergunta: pergunta };
    return this.http.post<ChatResponse>(this.baseUrl, payload);
  }
}
