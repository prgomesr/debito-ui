import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClienteRoutingModule} from './cliente-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ClienteComponent} from './cliente.component';
import {ClienteService} from './cliente.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ClienteRoutingModule
  ],
  declarations: [ClienteComponent],
  providers: [ClienteService]
})
export class ClienteModule { }
