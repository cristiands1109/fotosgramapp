import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPost, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor( private http: HttpClient, private usuarioService: UsuarioService) { }

  getPost( pull: boolean = false) {

    // incrementa en 1 las veces que se hacen las peticiones

    if (pull) {
      this.paginaPost = 0;
    }
    this.paginaPost ++;

    // retona la peticion
    return this.http.get<RespuestaPost>(`${URL}/post?pagina=${this.paginaPost}`);
  }

  crearPost( post) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      // recontruir el url para realizar la peticion post localhost:3000/post
      this.http.post(`${URL}/post`, post, {headers}).subscribe( resp => {

        this.nuevoPost.emit(resp['post']);
        // console.log(resp); // console log de prueba
        resolve(true) ;
      });

    });


  }


}
