import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
export const firebaseConfig = {
  apiKey: "AIzaSyAs1VCYrQRh0fNp2YG0-UbA-DcxVPdSKvs",
  authDomain: "loginapp-3b894.firebaseapp.com",
  databaseURL: "https://loginapp-3b894.firebaseio.com",
  projectId: "loginapp-3b894",
  storageBucket: "loginapp-3b894.appspot.com",
  messagingSenderId: "928925483768"
};  
//providers
import { UsuarioProvider } from '../providers/usuario/usuario';
//pluguins
import { Facebook } from "@ionic-native/facebook";
import { GooglePlus } from '@ionic-native/google-plus';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Facebook,
    GooglePlus 
  ]
})
export class AppModule {}
