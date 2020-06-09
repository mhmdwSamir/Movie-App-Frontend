import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent implements OnInit, OnDestroy {
  @Output() onclose = new EventEmitter();
  @Output() onOk = new EventEmitter();
  constructor(private _el: ElementRef) {
    console.log(this._el.nativeElement);
  }

  ngOnInit(): void {
    document.body.appendChild(this._el.nativeElement);
    document.body.classList.add('overflow-hidden');
  }
  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
    this._el.nativeElement.remove();
  }
}
