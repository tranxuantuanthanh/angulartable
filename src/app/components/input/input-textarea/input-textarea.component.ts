import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css']
})
export class InputTextareaComponent {
  input: any = "";
  @Input() ngInput: any
  @Output() ngInputChange = new EventEmitter();
  
  ngOnChanges(changes: SimpleChanges): void {
      this.input = this.ngInput;
  }
  
  onChange(){
    this.ngInputChange.emit(this.input);
  }

  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
