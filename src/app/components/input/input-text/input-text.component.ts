import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent {
  input: any = "";
  @Input() ngInput: any
  @Output() ngInputChange = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
      this.input = this.ngInput;
  }
  
  onChange(){
    this.ngInputChange.emit(this.input);
  }
}
