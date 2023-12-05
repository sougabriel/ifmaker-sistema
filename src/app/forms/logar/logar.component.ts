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

  usuario!: Usuario;

  async createHandler(usuario: Usuario) {
    const formData = new FormData();

    formData.append('nomeUsuario', usuario.nomeUsuario);
    formData.append('senha', usuario.senha!);

    await this.usuarioService.entrar(formData).subscribe((usuario) => (this.usuario = usuario));

    if (this.usuario == null) {
      this.mensagem.adicionar("Usuário ou senha incorretos!");
      return;  
    } else {
      this.localStorage.set('usuario', usuario.nomeUsuario);
      this.mensagem.adicionar(this.localStorage.get('usuario') + ' Logado com sucesso! ');
      this.app.logar();
      this.router.navigate(['sistema']);

    }

  }
}
