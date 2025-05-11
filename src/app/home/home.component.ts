import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mensagens: string[] = []; // Armazena as mensagens enviadas
  novaMensagem: string = ''; // Valor da nova mensagem digitada

  // Função para enviar a mensagem
  enviarMensagem() {
    if (this.novaMensagem.trim() !== '') {
      this.mensagens.push(this.novaMensagem); // Adiciona a mensagem no array de mensagens
      this.novaMensagem = ''; // Limpa a área de texto após o envio
    }
  }
}
