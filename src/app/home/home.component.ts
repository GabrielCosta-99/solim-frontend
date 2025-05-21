import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // <--- aqui
})
export class HomeComponent {
  novaMensagem: string = ''; // Para o input de mensagem
  carregando: boolean = false;
  erro: string = '';

  mensagens: { remetente: 'user' | 'bot'; texto: string }[] = [];

  constructor(private chatService: ChatService) {}

  enviarMensagem() {
    if (!this.novaMensagem.trim()) {
      this.erro = 'Digite uma mensagem!';
      return;
    }

    this.erro = '';
    this.carregando = true;

    // Adiciona a mensagem do usuário na tela imediatamente
    this.mensagens.push({ remetente: 'user', texto: this.novaMensagem });

    this.chatService.enviarPergunta(this.novaMensagem).subscribe({
      next: (res) => {
        this.mensagens.push({ remetente: 'bot', texto: res.resposta });
        this.carregando = false;
      },
      error: (err) => {
        this.erro = 'Erro ao se comunicar com o servidor.';
        this.carregando = false;
        console.error(err);
      },
    });

    this.novaMensagem = ''; // limpa o input após envio
  }
}