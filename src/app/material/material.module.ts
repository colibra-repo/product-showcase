import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
