import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {LancamentoRoutingModule} from './lancamento-routing.module';
import {LancamentoComponent} from './lancamento.component';
import {LancamentoService} from './lancamento.service';
import {ClienteService} from '../cliente/cliente.service';
import {ConvenioService} from '../convenio/convenio.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LancamentoRoutingModule
  ],
  declarations: [LancamentoComponent],
  providers: [LancamentoService, ClienteService, ConvenioService]
})
export class LancamentoModule { }
