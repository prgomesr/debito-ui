import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';
import {SidebarModule} from 'primeng/sidebar';
import {ErrorHandlerService} from './error-handler.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SidebarModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}, ErrorHandlerService]
})
export class CoreModule { }
