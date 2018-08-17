import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RemessaRoutingModule} from './remessa-routing.module';
import {RemessaComponent} from './remessa.component';
import {RemessaService} from './remessa.service';
import {SharedModule} from '../shared/shared.module';
import {LancamentoService} from '../lancamento/lancamento.service';
import {ConvenioService} from '../convenio/convenio.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RemessaRoutingModule
  ],
  declarations: [RemessaComponent],
  providers: [RemessaService, LancamentoService, ConvenioService]
})
export class RemessaModule { }
