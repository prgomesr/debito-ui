import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ConvenioComponent} from './convenio.component';

const routes: Routes = [
  {path: '', component: ConvenioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvenioRoutingModule {
}

export const routedComponents = [ConvenioComponent];
