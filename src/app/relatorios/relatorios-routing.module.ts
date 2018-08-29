import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RelatoriosLancamentosComponent} from './relatorios-lancamentos/relatorios-lancamentos.component';

const routes: Routes = [
  {path: 'lancamentos', component: RelatoriosLancamentosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule {
}
