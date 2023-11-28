import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaRoutingModule } from './sistema-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { MaterialComponent } from './componentes/material/material.component';
import { EmprestimoComponent } from './componentes/emprestimo/emprestimo.component';
import { PessoaComponent } from './componentes/pessoa/pessoa.component';
import { AcessoComponent } from './componentes/acesso/acesso.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProjetoComponent } from './componentes/projeto/projeto.component';
import { PessoaProjetoComponent } from './componentes/pessoa-projeto/pessoa-projeto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtualizarPessoaComponent } from './componentes/pessoa/atualizar-pessoa/atualizar-pessoa.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    MaterialComponent,
    EmprestimoComponent,
    PessoaComponent,
    AcessoComponent,
    RegistroComponent,
    ProjetoComponent,
    PessoaProjetoComponent,
    AtualizarPessoaComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [
    DashboardComponent,
    PessoaComponent,
    UsuarioComponent,
    MaterialComponent,
    EmprestimoComponent,
    ProjetoComponent,
    PessoaProjetoComponent,
    AcessoComponent,
    RegistroComponent
  ],
  providers: [
    
  ]
})
export class SistemaModule { }
