import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LancamentoComponent} from './lancamento.component';

const routes: Routes = [
  {path: '', component: LancamentoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentoRoutingModule {
}

export const routedComponents = [LancamentoComponent];
