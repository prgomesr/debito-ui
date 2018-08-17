import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  declarations: [],
  exports: [TableModule, ButtonModule, TooltipModule, DialogModule, FormsModule, DropdownModule, CurrencyMaskModule,
  CalendarModule, InputTextModule, ModalModule]
})
export class SharedModule { }
