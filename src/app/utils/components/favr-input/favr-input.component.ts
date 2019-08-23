import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonInput} from '@ionic/angular';

@Component({
  selector: 'favr-input',
  templateUrl: './favr-input.component.html',
  styleUrls: ['./favr-input.component.scss'],
})
export class FavrInputComponent implements OnInit {

  @Input() inputName: string;
  @Input() inputType: string;
  @Input() inputLabel: string;
  @Input() iconName: string;
  @Input() step: number;
  @Input() max: number;
  @Input() min: number;
  @Input() pattern: string;
  @Input() autocorrect: boolean;

  @Output() value: EventEmitter<any> = new EventEmitter();
  inputValue: any;

  constructor() { }

  ngOnInit() {}


  onInputFocus(input: any) {
    input.el.classList.add('active');
  }

  onInputBlur(input: any) {
    input.el.classList.remove('active');
  }

  setValue(val: any) {
    this.value.emit(val);
  }
}
