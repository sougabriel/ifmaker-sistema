import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { Usuario } from 'src/app/sistema/interfaces/usuario';
import { AtualizarService } from 'src/app/sistema/services/atualizar.service';
import { UsuarioService } from 'src/app/sistema/services/routes/usuario.service';

@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.less'],
})
export class AtualizarUsuarioComponent {
  usuarioForm!: FormGroup;
  usuarioLogado: Usuario = this.localStorage.get('usuario')[0];

  constructor(
    public atualizar: AtualizarService,
    private usuarioService: UsuarioService,
    private localStorage: LocalStorageService,
    private mensagem: MensagensService
  ) {}

  verificaNivel(): boolean {
    if (this.usuarioLogado.nivel == 1) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      id: new FormControl(),
      nomeUsuario: new FormControl(),
      senha: new FormControl(),
      nivel: new FormControl({ value: null, disabled: true }),
      pessoaId: new FormControl({ value: null, disabled: true }),
    });
  }

  get id() {
    return this.usuarioForm.get('id');
  }

  get nomeUsuario() {
    return this.usuarioForm.get('nomeUsuario');
  }

  get senha() {
    return this.usuarioForm.get('senha')!;
  }

  get nivel() {
    return this.usuarioForm.get('nivel')!;
  }

  get pessoaId() {
    return this.usuarioForm.get('pessoaId')!;
  }

  submit() {
    if (this.usuarioForm.invalid) {
      return;
    }
    this.atualizarUsuario(this.usuarioForm.value);
  }

  async atualizarUsuario(usuario: Usuario) {
    const formData = new FormData();

    if (usuario.nomeUsuario == null) {
      formData.append('nomeUsuario', this.atualizar.usuario.nomeUsuario);
    } else {
      formData.append('nomeUsuario', usuario.nomeUsuario);
    }
    if (usuario.senha == null) {
      formData.append('senha', this.atualizar.usuario.senha!);
    } else {
      formData.append('senha', usuario.senha!);
    }
    if (usuario.nivel == null) {
      formData.append('nivel', this.atualizar.usuario.nivel as any);
    } else {
      formData.append('nivel', usuario.nivel as any);
    }
    if (usuario.pessoaId == null) {
      formData.append('pessoaId', this.atualizar.usuario.pessoaId as any);
    } else {
      formData.append('pessoaId', usuario.pessoaId as any);
    }

    await this.usuarioService
      .atualizar(this.atualizar.usuario.id!, formData)
      .subscribe();

    this.atualizar.limpar();
  }

  transform(value: string): string {
    let transformedValue = '';
    if (value && typeof value === 'string') {
      transformedValue = '*'.repeat(value.length);
    }
    return transformedValue;
  }

  async removeUsuario(id: number) {
    if (confirm('Tenha cuidado ao remover e certeza do que está fazendo!')) {
      await this.usuarioService
        .removerPorId(id)
        .subscribe((x) => this.testarRemoção(x));
    } else {
      return;
    }
  }

  testarRemoção(usuario: Usuario) {
    if (usuario == null) {
      this.mensagem.adicionar('Não foi possível excluir usuário!');
    } else {
      this.mensagem.adicionar('Usuário excluído com sucesso!');
    }
  }
}
