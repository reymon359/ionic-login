import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {
  //este es el usuario donde guardamos los datos provenientes del login
  usuario:Credenciales={};
  constructor() {}
  //esta función recibira los parametros que introduciremos en usuario
  cargarUsuario(
    nombre: string,
    email: string,
    imagen: string,
    uid: string,
    provider: string //esto es si es google o facebook
  ) {
    this.usuario.nombre = nombre;
    this.usuario.email = email;
    this.usuario.imagen = imagen;
    this.usuario.uid = uid;
    this.usuario.provider = provider;
  }
  
}

export interface Credenciales {//las ? hacen que lso parametros sean opcionales
  nombre?: string;
  email?: string;
  imagen?: string;
  uid?: string;
  provider?: string;
}