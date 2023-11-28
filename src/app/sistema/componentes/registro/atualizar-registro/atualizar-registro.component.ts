import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Registro } from 'src/app/sistema/interfaces/registro';
import { AtualizarService } from 'src/app/sistema/services/atualizar.service';
import { RegistroService } from 'src/app/sistema/services/routes/registro.service';

@Component({
  selector: 'app-atualizar-registro',
  templateUrl: './atualizar-registro.component.html',
  styleUrls: ['./atualizar-registro.component.less']
})
export class AtualizarRegistroComponent {

  registroForm!: FormGroup;

  constructor(public atualizar: AtualizarService, private registroService: RegistroService) { }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      id: new FormControl(''),
      atividade: new FormControl(''),
      descricao: new FormControl(''),
      idUsuario: new FormControl(''),
    })
  }

  get id() {
    return this.registroForm.get('id');
  }

  get atividade() {
    return this.registroForm.get('atividade');
  }

  get descricao() {
    return this.registroForm.get('descricao')!;
  }

  get idUsuario() {
    return this.registroForm.get('idUsuario')!;
  }

  submit() {
    if (this.registroForm.invalid) {
      return;
    }
    this.atualizarRegistro(this.registroForm.value)
  }

  async atualizarRegistro(registro: Registro) {
    const formData = new FormData;
    
    formData.append('idPessoa', registro.atividade);
    formData.append('idRegistro', registro.descricao!);
    formData.append('idRegistro', registro.idusuario as any); 

    await this.registroService.atualizar(this.atualizar.registro.id!, formData).subscribe();

  }

}