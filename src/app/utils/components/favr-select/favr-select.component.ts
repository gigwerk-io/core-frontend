import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'favr-select',
  templateUrl: './favr-select.component.html',
  styleUrls: ['./favr-select.component.scss'],
})
export class FavrSelectComponent implements OnInit {
  @Input() selectName: string;
  @Input() selectLabel: string;

  @Output() value: EventEmitter<any> = new EventEmitter();
  selectValue: any;

  constructor() { }

  ngOnInit() {}


  onSelectFocus(select: any) {
    select.el.classList.add('active');
  }

  onSelectBlur(select: any) {
    select.el.classList.remove('active');
  }

  setValue(val: any) {
    this.value.emit(val);
  }

}
