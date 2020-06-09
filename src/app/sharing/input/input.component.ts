import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string;
  constructor() {}

  ngOnInit(): void {}
  showError() {
    const { errors, touched, dirty } = this.control;
    return errors && touched && dirty;
  }
  AddingErrorStyling() {
    return { errorRedClass: this.control.invalid };
  }
}
