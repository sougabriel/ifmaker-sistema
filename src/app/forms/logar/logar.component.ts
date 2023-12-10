import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Usuario } from 'src/app/sistema/interfaces/usuario';
import { UsuarioService } from 'src/app/sistema/services/routes/usuario.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.less'],
})
export class LogarComponent {
  constructor(
    private usuarioService: UsuarioService,
    private mensagem: MensagensService,
    private localStorage: LocalStorageService,
    private router: Router,
    private app: AppComponent
  ) {}

  usuario: Usuario[] = [];

  async createHandler(usuario: Usuario) {
    const formData = new FormData();

    formData.append('nomeUsuario', usuario.nomeUsuario);
    formData.append('senha', usuario.senha!);

    await this.usuarioService.entrar(formData).subscribe(
      (x) => {
        this.usuario = x;
        this.testarLogin();
      }
      );

  }

  testarLogin() {
    if (this.usuario.length < 1) {
      this.mensagem.adicionar("Não foi possivel logar!");
    } else {
      this.localStorage.set('usuario', this.usuario);
      this.mensagem.adicionar("Logado com sucesso!");
      this.app.logar();
      this.router.navigate(['/sistema/pessoa']);
    }
  }

}
