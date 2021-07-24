import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { TYPE } from '../../constants';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { papers } from '../../../assets/mocks';
import { IPaper } from '../../interfaces';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'snaprevise-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {

  protected readonly destroy$ = new Subject();

  public readonly papers = papers;
  public type = TYPE.SELECTION;
  public readonly types = [TYPE.BUTTON, TYPE.EMAIL, TYPE.SELECTION, TYPE.PAST_PAPER];

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(({ type }) => {
          if (!this.types.includes(type)) {
            this.goto(TYPE.SELECTION);
            return;
          }
          this.type = type;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected goto(type: TYPE): void {
    this.router.navigate([''], {
      queryParams: {
        type
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public usePayload(): (index: number) => IPaper {
    return (index: number): IPaper => {
      return this.papers[index];
    };
  }

  public useDrop = (event: DropResult): void => {
    if (event.removedIndex != null && event.addedIndex != null) {
      moveItemInArray(this.papers, event.removedIndex, event.addedIndex);
    } else {
      if (event.addedIndex != null) {
        this.papers.push(event.payload);
      }
    }
  }
}
