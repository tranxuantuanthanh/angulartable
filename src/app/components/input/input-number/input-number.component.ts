import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnChanges {
  input: any = "";
  @Input() ngInput: any
  @Output() ngInputChange = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
    if(!isNaN(Number(this.ngInput))){
      this.input = Number(this.ngInput);
    } else {
      this.input = "";
    }
  }
  
  onChange(){
    this.ngInputChange.emit(this.input);
  }
}
