import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[updateTitle]'
})

export class UpdateTitleDirective {

  el: any;
  input: any
  
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2) { }

  private unlistenBlur!: () => void;
  private unlistenKeyUpEnter!: () => void;
  private unlistenKeyDownEsc!: () => void;
  
  @Input('updateTitle') set isOwner(condition: boolean) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    if (condition) {
      this.el = this.templateRef.elementRef.nativeElement.previousElementSibling;
      this.renderer.listen(this.el, 'click', ($event) => {
        this.onClick($event.target);
      });
    } else {
      return;
    }
  }

  onClick(el: any) {
    const value = el.innerHTML;
    this.renderer.setAttribute(el, 'hidden', '');
    this.input = this.renderer.createElement('input');
    this.renderer.setAttribute(this.input, 'value', value);
    this.renderer.appendChild(this.templateRef.elementRef.nativeElement.parentNode, this.input);
    this.input.focus();
    this.unlistenBlur = this.renderer.listen(this.input, 'blur', ($event) => {
      this.updateTitle($event);
    });
    this.unlistenKeyUpEnter = this.renderer.listen(this.input, 'keyup.enter', ($event) => {
      this.updateTitle($event);
    });
    this.unlistenKeyDownEsc = this.renderer.listen(this.input, 'keydown.esc', ($event) => {
      this.updateTitle($event);
    });
  }

  updateTitle(event: any) {
    console.log(event)
    const valueInput = event.target.value.trim();
    if (event.which !== 27 && valueInput.length !== 0) {
      this.renderer.setProperty(this.el, 'innerText', valueInput);
    }
    this.renderer.removeChild(this.templateRef.elementRef.nativeElement.parentNode, this.input);
    this.renderer.removeAttribute(this.el, 'hidden');
    this.unlistenBlur();
    this.unlistenKeyUpEnter();
    this.unlistenKeyDownEsc();
  }
}