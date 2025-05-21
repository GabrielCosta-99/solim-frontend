import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ChatService = class ChatService {
    http;
    baseUrl = 'http://localhost:5215/api/chat/chat'; // sua URL do backend
    constructor(http) {
        this.http = http;
    }
    enviarPergunta(pergunta) {
        const payload = { Pergunta: pergunta };
        return this.http.post(this.baseUrl, payload);
    }
};
ChatService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ChatService);
export { ChatService };
