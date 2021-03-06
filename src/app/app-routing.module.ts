import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'lancamentos', loadChildren: './lancamento/lancamento.module#LancamentoModule'},
  {path: 'clientes', loadChildren: './cliente/cliente.module#ClienteModule'},
  {path: 'convenios', loadChildren: './convenio/convenio.module#ConvenioModule'},
  {path: 'contas', loadChildren: './conta/conta.module#ContaModule'},
  {path: 'remessas', loadChildren: './remessa/remessa.module#RemessaModule'},
  {path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule'},
  {path: '**', redirectTo: 'pagina-nao-encontrada'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
