import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContaComponent} from './conta.component';
import {ContaRoutingModule} from './conta-routing.module';
import {ContaService} from './conta.service';
import {SharedModule} from '../shared/shared.module';
import {EmpresaService} from '../empresa/empresa.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContaRoutingModule
  ],
  declarations: [ContaComponent],
  providers: [ContaService, EmpresaService]
})
export class ContaModule { }
