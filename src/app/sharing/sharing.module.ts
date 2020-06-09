import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessDenaiedComponent } from './components/access-denaied/access-denaied.component';
@NgModule({
  declarations: [InputComponent, AccessDenaiedComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, AccessDenaiedComponent],
})
export class SharingModule {}
