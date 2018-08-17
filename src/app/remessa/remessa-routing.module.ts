import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RemessaComponent} from './remessa.component';

const routes: Routes = [
  {path: '', component: RemessaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemessaRoutingModule {
}

export const routedComponents = [RemessaComponent];
