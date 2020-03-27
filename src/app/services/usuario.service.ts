import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { resolve } from 'url';
import { Usuario, Post } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

// constante URL que contiene por defecto desde el envioronment ''localhost:3000''
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor( private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }

  // funcion login
  // que recibe como argumento el email y el password
  login(email: string, password: string) {

    // creacion de un objeto para enviar al post con los datos del login
    const data = { email, password };


    // promesa para redireccionar en caso de que la autenticacion sea correcta
    return new Promise(resolve => {


      // localhost:3000/user/login
      this.http.post(`${URL}/user/login`, data).subscribe(resp => {
        console.log(resp);

        // condicional para saber si viene un OK: TRUE en caso que si, se llama la funcion para guardarlo
        // en caso que no se reseta el token a null y se limpia el storage
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });

    });

  }

  // funcion para manejar el registro

  registro(usuario: Usuario) {

    // promesa que retorna verdadero o falso en caso que el registro sea valido
    return new Promise( resolve => {

      // localhost:3000/user/create

    this.http.post(`${URL}/user/create`, usuario).subscribe(resp => {
      console.log(resp);

      if (resp['ok']) {
        this.guardarToken(resp['token']);
        resolve(true);
      } else {
        this.token = null;
        this.storage.clear();
        resolve(false);
      }
    });

    });

  }

  // obtener usuarios que vienen en el token
  getUsuario() {

    if (!this.usuario._id) {
      this.validaToken(); 
    }

    // {...this.usuario} con este metodo se hace la desestructuracion de los datos que vienen
    return {...this.usuario};

  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  // verificaremos el token si es valido para permitir el ingreso del mismo hacia los enlaces
  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }


    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/user/`, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });


    });

  }


  actualizarUsuario( usuario: Usuario) {

    // obtener los headers de la peticion
    const headers = new HttpHeaders ({
      'x-token': this.token
    });

    // construir la peticion para mandarla localhost:3000/user/update

    return new Promise( resolve => {

      this.http.post(`${URL}/user/update`, usuario, {headers}).subscribe( resp => {
        if( resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        }
      });


    });

  }

}
