import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
let HomeComponent = class HomeComponent {
    chatService;
    novaMensagem = ''; // Para o input de mensagem
    carregando = false;
    erro = '';
    mensagens = [];
    constructor(chatService) {
        this.chatService = chatService;
    }
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
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css'], // <--- aqui
    })
], HomeComponent);
export { HomeComponent };
