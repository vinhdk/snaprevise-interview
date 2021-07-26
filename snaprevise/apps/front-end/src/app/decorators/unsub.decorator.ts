import { Subject } from 'rxjs';

export function useUnsubscribable(): ClassDecorator {
  return (constructor: any) => {
    const originNgOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.complete$ = new Subject<unknown>();
    constructor.prototype.ngOnDestroy = function(...args: any[]) {
      this.complete$.next();
      this.complete$.complete();

      if (originNgOnDestroy) {
        originNgOnDestroy.apply(this, args);
      }
    };
  };
}
