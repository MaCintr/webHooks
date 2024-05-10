
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private hubConnection: HubConnection;
  mensagens:string[] = [];
  title = 'app-angular';
  novaMensagem?:string;

  constructor() {
    this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:7259/chat").build();

    this.hubConnection.start().then(() => console.log('SignalR Connected'))
      .catch(err => console.error('erro ao conectar', err));

    this.hubConnection.on("ReceberMensagem", (mensagem: string) => {
      console.log(`Mensagem Recebida: ${mensagem}`)
      this.mensagens.push(mensagem)
    })
  }

  enviarMesagem(){
    this.hubConnection.invoke('EnviarMensagem', this.novaMensagem).catch(err => console.error(err))
    this.novaMensagem = ""
  }
}
