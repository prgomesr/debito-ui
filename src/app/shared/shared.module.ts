import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  exports: [TableModule]
})
export class SharedModule { }
