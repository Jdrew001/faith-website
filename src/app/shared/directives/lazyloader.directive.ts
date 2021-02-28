import { Directive, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[deferLoad]'
})
export class LazyloaderDirective implements AfterViewInit {

  @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

  private _intersectionObserver? : IntersectionObserver;

  constructor(private _element: ElementRef) { }

  ngAfterViewInit() {
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});
    this._intersectionObserver.observe(<Element>(this._element.nativeElement));
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        if (this.checkIfIntersecting(entry)) {
            this.deferLoad.emit();
            console.log('Intersection occurring', entry);
            this._intersectionObserver.unobserve((this._element.nativeElement) as Element);
            this._intersectionObserver.disconnect();
        }
    });
}

private checkIfIntersecting (entry: IntersectionObserverEntry) {
    return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
}

}
