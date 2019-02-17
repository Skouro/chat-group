import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Mensaje} from "../interfaces/mensaje";
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Mensaje[]>;
  public chast: any = [];
  public  usuario: any={};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user=> {
      console.log("estado del usuario ",user);
      if(user == null ) {
        return;
      }
      this.usuario.nombre=user.displayName;
      this.usuario.uid=user.uid;
    });
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref => ref.orderBy('fecha','desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map ( (mensajes: Mensaje[])=> {
      console.log(mensajes[1]);
      this.chast=mensajes.reverse();
    }));
  }
  addMensaje(text: string) {
    const men: Mensaje = {
      nombre:this.usuario.nombre,
      mensaje:text,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
     return this.itemsCollection.add(men);
  }
  login(proveedor:string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario= {};
    this.afAuth.auth.signOut();
  }
}
