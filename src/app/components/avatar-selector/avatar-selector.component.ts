import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  // se crea un output de tipo event emitter para emitir el resultado al componente padre
  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit() {

    this.avatars.forEach(avatar => avatar.seleccionado = false);

    for ( const avatar of this.avatars) {
      if (avatar.img === this.avatarActual) {
        avatar.seleccionado = true;
        break;
      }
    }


  }

  seleccionarAvatar(avatar) {
    // se recore todo los avatars para cambiar su seleccion a falso
    this.avatars.forEach(av => av.seleccionado = false);
    // al seleccionado se coloca true
    avatar.seleccionado = true;

    console.log(avatar.img); // console log de prueba
    this.avatarSel.emit(avatar.img); // se emite el evento del avatar seleccionado
  }

}
