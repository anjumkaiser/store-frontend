import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatCheckboxModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  declarations: []
})
export class AppMaterialModule { }
