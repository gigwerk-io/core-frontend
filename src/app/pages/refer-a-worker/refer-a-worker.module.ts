import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReferAWorkerPage } from './refer-a-worker.page';

const routes: Routes = [
  {
    path: '',
    component: ReferAWorkerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReferAWorkerPage]
})
export class ReferAWorkerPageModule {}
