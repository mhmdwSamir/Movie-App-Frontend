import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from '../sharing/sharing.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],

  imports: [
    CommonModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    SharingModule,
  ],
})
export class ModulesModule {}
