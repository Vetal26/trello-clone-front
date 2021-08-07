import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewChecked() {
    this.elementRef.nativeElement.focus();
  }
}
