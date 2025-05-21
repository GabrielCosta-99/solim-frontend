import { Component } from '@angular/core';
import { ChatService } from '../chat.service'; // Importar o serviço
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // É um componente Standalone
  imports: [FormsModule, CommonModule], 
  providers: [],
})
export class HomeComponent {
  mensagens: { texto: string; remetente: string }[] = []; // Armazena as mensagens com remetente
  novaMensagem: string = ''; // Valor da nova mensagem digitada

  constructor(private chatService: ChatService) {}


  enviarMensagem() {
  console.log('Função enviarMensagem foi chamada.'); // Verifica se a função está sendo executada
  if (this.novaMensagem.trim() !== '') {
    console.log('Enviando mensagem para a API:', this.novaMensagem);

    // Adiciona a mensagem do usuário ao chat
    this.mensagens.push({ texto: this.novaMensagem, remetente: 'user' });

    // Envia a mensagem para a API e espera pela resposta
    this.chatService.enviarMensagem(this.novaMensagem).pipe(
      // Trata erros durante o envio
      catchError((error) => {
        console.error('Erro ao enviar mensagem para a API:', error);
        // Adiciona uma mensagem de erro ao chat
        this.mensagens.push({ texto: 'Erro ao enviar mensagem. Tente novamente.', remetente: 'bot' });
        // Continua a propagação do erro
        return throwError(() => new Error('Erro ao enviar mensagem. Tente novamente.'));
      })
    ).subscribe({
      next: (response) => {
        console.log('Resposta da API:', response);

        // Acessa o conteúdo da resposta da API
        const respostaTexto = response?.resposta || 'Erro ao obter resposta da API.';
        // Adiciona a resposta da API ao chat
        this.mensagens.push({ texto: respostaTexto, remetente: 'bot' });
      },
      error: (error) => {
        console.error('Erro no subscribe:', error);
      }
    });

    // Limpa a área de texto após o envio
    this.novaMensagem = '';
  } else {
    console.log('Mensagem vazia, envio cancelado.');
  }
}
}