import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RequestPage } from './request.page';
import {CommonComponentsModule} from '../../utils/components/common-components.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  {
    path: '',
    component: RequestPage
  }
];

const MODULES = [
  CommonModule,
  CommonComponentsModule,
  CKEditorModule,
  FormsModule,
  IonicModule,
  RouterModule.forChild(routes)
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [RequestPage]
})
export class RequestPageModule {}
