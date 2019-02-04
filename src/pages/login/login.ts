import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { HomePage } from "../home/home";

import { Platform } from "ionic-angular";
import { Facebook } from "@ionic-native/facebook";

import { GooglePlus } from '@ionic-native/google-plus';
// import firebase from 'firebase';

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public usuarioProv: UsuarioProvider,
    private fb: Facebook,
    private platform: Platform,
    private googlePlus: GooglePlus
  ) {}
  signInGoogle(){
      this.googlePlus.login({
        'webClientId': '928925483768-d6b72ou2i22u8n7fngr7pseale1nsqpi.apps.googleusercontent.com',
        'offline': true
      }).then( res => {
        //despues de iniciar con google enviamos el token a firebase y nos devuelve el user
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then( user => {
            console.log(JSON.stringify(user));
            this.usuarioProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              "Google"
            );
            this.navCtrl.setRoot(HomePage);

          })
          .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
        }).catch(err => console.error("Error: " + JSON.stringify(err)));
  }
  signInWithFacebook() {
    //hemos instalado el pluguin nativo y ahora vamos a diferenciar
    if (this.platform.is("cordova")) {
      //celular
      this.fb.login(["email", "public_profile"]).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          res.authResponse.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then(user => {
            console.log(user);
            this.usuarioProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              "facebook"
            );
            this.navCtrl.setRoot(HomePage);
          }).catch(e=> console.log('Error con el login'+ JSON.stringify(e)));
      });
    } else {
      //escritorio
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          let user = res.user;
          this.usuarioProv.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            "facebook"
          );
          this.navCtrl.setRoot(HomePage);
        });
    }
  }
}
