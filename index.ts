import './style.css';

import {
  of,
  interval,
  startWith,
  switchMap,
  Subscription,
  timer,
takeUntil,
mergeMap
} from 'rxjs';

export class RequestPreviewComponent {
  constructor() {
    this.cancelRequest();
    // this.destroy()
  }
  tenantAccessDeletionSubs$: Subscription;
  timer$ = timer(10000);

  cancelRequest(): void {
    this.tenantAccessDeletionSubs$ = of({ status: '500' })
      .pipe(
        switchMap((err) => {
          if (err.status === '500') {
            return interval(1000).pipe(
              mergeMap((_) => {
                console.log();
                return of([{ status: 'approved' }]);
              }),
              takeUntil(this.timer$)
            );
          }
          return of(null);
        })
      )
      .subscribe((result) => {
        if (!!result && result.length > 0) {
          console.log('if case', result);
        } 
      });
  }

  destroy(): void {
    this.tenantAccessDeletionSubs$?.unsubscribe();
  }
}

const d = new RequestPreviewComponent();
