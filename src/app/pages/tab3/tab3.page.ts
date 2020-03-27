import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServicesService } from '../../services/ui-services.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
              private uiServices: UiServicesService) {}

  ngOnInit() {
      this.usuario = this. usuarioService.getUsuario();
      // console.log(this.usuario); // clg de prueba para ver si viene los datos del usuario
  }

  logout() {}

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

    console.log(actualizado); // clg de prueba
    if (actualizado) {
      this.uiServices.alertaToast('Usuario actualizado');
      // mensaje toas de que se actualizo correctamente
    } else {
      this.uiServices.alertaToast('Error al actualizar');
      // mensaje de error de que no se actualizo correctamente
    }
  }


}
