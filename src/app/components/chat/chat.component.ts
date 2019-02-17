import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";

// @ts-ignore
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje = "";
  elemnt:any;

  constructor(public cs: ChatService) {
    this.cs.cargarMensajes().subscribe(()=> {
      setTimeout(()=> {
        this.elemnt.scrollTop= this.elemnt.scrollHeight;
      },20);
    });
  }

  ngOnInit() {
    this.elemnt=document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this.cs.addMensaje(this.mensaje).then(()=> {
      this.mensaje="";
    }).catch(()=> {
      console.error("error  al enviar");
    });
  }
}
