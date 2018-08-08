import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {LancamentoRoutingModule} from './lancamento-routing.module';
import {LancamentoComponent} from './lancamento.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LancamentoRoutingModule
  ],
  declarations: [LancamentoComponent]
})
export class LancamentoModule { }
