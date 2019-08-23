import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'favr-datetime',
  templateUrl: './favr-datetime.component.html',
  styleUrls: ['./favr-datetime.component.scss'],
})
export class FavrDatetimeComponent implements OnInit {

  @Input() dateTimeName: string;
  @Input() dateTimeLabel: string;
  @Input() dateTimeDisplayFormat = 'MMM DD, YYYY HH:mm';
  @Input() max: string;
  @Input() min: string;

  @Output() value: EventEmitter<any> = new EventEmitter();
  dateTimeValue: any;

  constructor() { }

  ngOnInit() {}


  onDateTimeFocus(dateTime: any) {
    dateTime.el.classList.add('active');
  }

  onDateTimeBlur(dateTime: any) {
    dateTime.el.classList.remove('active');
  }

  setValue(val: any) {
    this.value.emit(val);
  }
}
