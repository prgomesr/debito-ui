import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelatoriosRoutingModule} from './relatorios-routing.module';
import {RelatoriosLancamentosComponent} from './relatorios-lancamentos/relatorios-lancamentos.component';
import {ConvenioService} from '../convenio/convenio.service';
import {SharedModule} from '../shared/shared.module';
import {LancamentoService} from '../lancamento/lancamento.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatoriosLancamentosComponent],
  providers: [ConvenioService, LancamentoService]
})
export class RelatoriosModule {
}
