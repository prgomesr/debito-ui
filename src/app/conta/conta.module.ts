import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContaComponent} from './conta.component';
import {ContaRoutingModule} from './conta-routing.module';
import {ContaService} from './conta.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContaRoutingModule
  ],
  declarations: [ContaComponent],
  providers: [ContaService]
})
export class ContaModule { }
