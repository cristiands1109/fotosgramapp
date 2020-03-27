import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { Usuario } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment.prod';


const URL = environment.url;
const URL2 = environment.url;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  // utilizamos un viewChild para hacer referencia a una variable local en el HTML 
  // el componente seria el ionslides principal para bloquear el movimiento del mismo

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

loginUser = {
  email: 'prueba1@prueba.com',
  password: '123456'
};

registerUser: Usuario = {
    email: 'prueba2@prueba.com',
    password: '123456',
    nombre: 'prueba2',
    avatar: 'av-1.png'
}

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiServicesService) { }

  ngOnInit() {
    console.log('prod', URL);
    console.log('2', URL2);
    // bloque slides
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; } // si el formulario es invalido no hace nada

    // esto regresa un true o un false porque trabaja con async y await 
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    // console.log(fLogin.valid); // console log para ver si el formulario es valido
    console.log(this.loginUser); // console log para ver los datos ingresados

    // condicional para redirigir o mostrar alerta

    if (valido) {
      // redirigir a tabs

      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});

    } else {
      // mostrar alerta de ingreso erroneo de usuario / contrasena
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos');
    }

  }

  async registro(fRegistro: NgForm) {

    if (fRegistro.invalid) { return; }
    // console.log(fRegistro.valid); // console log para ver si el formulario es valido

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformativa('El correo electronico ya existe');
    }
  }

  mostarRegistro() {
    // para realizar cualquier accion primero hay que desbloquear el slide
    this.slides.lockSwipes(false);
    // codigo para moverte de slide a slide segun las posiciones el primero seria 0
    this.slides.slideTo(0);
    // bloquear de vuelta el slides
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    // para realizar cualquier accion primero hay que desbloquear el slide
    this.slides.lockSwipes(false);
    // codigo para moverte de slide a slide segun las posiciones el primero seria 0
    this.slides.slideTo(1);
    // bloquear de vuelta el slides
    this.slides.lockSwipes(true);
  }

}
