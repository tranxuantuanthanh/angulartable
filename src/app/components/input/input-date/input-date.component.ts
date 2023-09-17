import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
})
export class InputDateComponent implements OnChanges {
  constructor(protected cdr: ChangeDetectorRef) {}
  @Input() ngDate: any;
  date = new FormControl(new Date());
  @Output() ngDateChange = new EventEmitter();
  serializedDate = new FormControl(new Date().toISOString());

  ngOnChanges(changes: SimpleChanges) {
    if (moment(this.ngDate, ['YYYY/MM/DD'], true).isValid()) {
      this.date = new FormControl(new Date(this.ngDate));
    } else {
      this.date = new FormControl(null);
    }
  }

  events: string[] = [];

  onChange(event: any) {
    if (event.value) {
      let obj = { ...event.value };
      if (typeof obj._i === 'object' && 'year' in obj._i) {
        let month = '' + (1 + obj._i.month),
          day = '' + obj._i.date,
          year: any = obj._i.year;
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        this.ngDateChange.emit([year, month, day].join('/'));
        return;
      } else {
        if (
          moment(
            obj._i,
            [
              'YYYY/MM/DD',
              'YYYY/M/DD',
              'YYYY/MM/D',
              'YYYY/M/D',
              'YYYYMMDD',
              'YYYY-MM-DD',
              'YYYY-M-DD',
              'YYYY-MM-D',
              'YYYY-M-D',
            ],
            true
          ).isValid()
        ) {
          this.ngDateChange.emit(this.formatDate(event.value));
        } else {
          this.date = new FormControl(null);
          this.ngDateChange.emit("Invalid date");
        }
      }
    } else if (event.targetElement.value != "") {
      this.date = new FormControl(null);
      this.ngDateChange.emit("Invalid date");
    } else {
      this.ngDateChange.emit("");
    }
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year: any = d.getFullYear();

    if (('' + year).length < 4) {
      year = ('000' + year).substring(('' + year).length - 4);
    }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('/');
  }
}
