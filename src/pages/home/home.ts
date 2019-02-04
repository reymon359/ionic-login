import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';

import { AngularFireAuth } from "@angular/fire/auth";
import { LoginPage } from '../login/login';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user: Credenciales={};
  constructor(
    public navCtrl: NavController,
    public usuarioProv: UsuarioProvider,
    private afAuth: AngularFireAuth
  ) {
    console.log(this.usuarioProv.usuario);
    this.user=this.usuarioProv.usuario;
    //tambien me puedo subscribir a los cambios del usuario
    this.afAuth.authState.subscribe(user=>{
      console.log('AFAUTH!!');
      console.log(JSON.stringify(user));
    });
  }
  salir(){
    this.afAuth.auth.signOut().then(res=>{
      //ahora lo borramos de todas partes. si tambien lo guardamos en local hay que borrarlo de ahi tambien
      this.usuarioProv.usuario={};
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
