import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Acesso } from 'src/app/sistema/interfaces/acesso';
import { AtualizarService } from 'src/app/sistema/services/atualizar.service';
import { AcessoService } from 'src/app/sistema/services/routes/acesso.service';

@Component({
  selector: 'app-atualizar-acesso',
  templateUrl: './atualizar-acesso.component.html',
  styleUrls: ['./atualizar-acesso.component.less'],
})
export class AtualizarAcessoComponent {
  acessoForm!: FormGroup;
  
  constructor(
    public atualizar: AtualizarService,
    private acessoService: AcessoService
  ) {}

  ngOnInit(): void {
    this.acessoForm = new FormGroup({
      id: new FormControl(),
      finalidade: new FormControl(),
      pessoaId: new FormControl({value: null, disabled: true}),
    });
  }

  get id() {
    return this.acessoForm.get('id');
  }

  get finalidade() {
    return this.acessoForm.get('finalidade')!;
  }

  get pessoaId() {
    return this.acessoForm.get('pessoaId')!;
  }

  submit() {
    if (this.acessoForm.invalid) {
      return;
    }
    this.atualizarAcesso(this.acessoForm.value);
  }

  async atualizarAcesso(acesso: Acesso) {
    const formData = new FormData();

    if (acesso.finalidade == null) {
      formData.append('finalidade', this.atualizar.acesso.finalidade!);
    } else {
      formData.append('finalidade', acesso.finalidade!);
    }
    if (acesso.pessoaId == null) {
      formData.append('pessoaId', this.atualizar.acesso.pessoaId as any);
    } else {
      formData.append('pessoaId', acesso.pessoaId as any);
    }

    await this.acessoService
      .atualizar(this.atualizar.acesso.id!, formData)
      .subscribe();
    this.atualizar.limpar();
  }

  removeAcesso(id: number) {
    this.acessoService.removerPorId(id).subscribe();
  }

}
