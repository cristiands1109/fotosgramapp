import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  habilitado = true;

  constructor( private postService: PostsService) {}

  ngOnInit() {

    this.siguiente();

    this.postService.nuevoPost.subscribe( post => {

      this.posts.unshift(post);

    });

  }

  recargar(evento) {

    this.siguiente(evento, true);
    this.habilitado = true;
    this.posts = [];

  }

  siguiente(evento?, pull: boolean= false) {

    this.postService.getPost(pull).subscribe(resp => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (evento) {
        evento.target.complete();

        if (resp.posts.length === 0) {
          evento.target.disabled = true;
          this.habilitado = false;
        }

      }

    });

  }

}
