import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';

const COMPONENTS = [
  ErrorDialogComponent,
  CategoryPipe,
  ConfirmationDialogComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, AppMaterialModule],
  exports: [COMPONENTS],
})
export class SharedModule {}
