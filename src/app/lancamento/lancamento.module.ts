import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {LancamentoComponent} from './lancamento.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: []
})
export class LancamentoModule { }
