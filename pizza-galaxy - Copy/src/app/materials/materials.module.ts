import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

const material = [
  MatInputModule,

  MatButtonModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
];
// Common Module Exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on.
@NgModule({
  declarations: [],
  // imports: [CommonModule, material],

  //exports makes the listed elements available to other modules.
  //exports changes the private access of modules to public
  exports: [material],
})
export class MaterialsModule {}
