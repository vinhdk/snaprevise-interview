import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TYPE } from '../../constants';
import { IPaper, IPaperUM } from '../../interfaces';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { PaperService } from '../../services';
import { useUnsubscribable } from '../../decorators';
import { untilDestroyed } from '../../operators';

@Component({
  selector: 'snaprevise-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@useUnsubscribable()
export class MainComponent implements OnInit {

  public papers: IPaper[] = [];
  public type = TYPE.SELECTION;
  public readonly types = [TYPE.BUTTON, TYPE.EMAIL, TYPE.SELECTION, TYPE.PAST_PAPER];

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly router: Router,
    protected readonly paperService: PaperService,
    protected readonly cdr: ChangeDetectorRef
  ) {
  }

  /**
   * check if queryParams type is existed and not
   * exist: call api get all papers
   * not exist: cal goto function
   * @return void
   */
  public ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap(({ type }) => {
          if (!this.types.includes(type)) {
            this.goto(TYPE.SELECTION);
            return of([]);
          }
          this.type = type;
          return this.paperService.findAll();
        }),
        tap((data) => {
          this.papers = data;
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  /**
   * set queryParams type by navigate
   * @param type: TYPE - type is queryParams in url
   * @return void
   */
  protected goto(type: TYPE): void {
    this.router.navigate([''], {
      queryParams: {
        type
      }
    });
  }

  /**
   * get data of each paper
   * @param index: number - position of each paper
   * @return IPaper - data of each paper
   */
  public usePayload(): (index: number) => IPaper {
    return (index: number): IPaper => {
      return this.papers[index];
    };
  }

  /**
   * change position and call api after drop item to another place
   * @param event: DropResult - output event drop
   * @return void
   */
  public useDrop = (event: DropResult): void => {
    if (event.removedIndex != null && event.addedIndex != null) {
      const add = this.papers.find((e) => e.position === event.addedIndex);
      const remove = this.papers.find((e) => e.position === event.removedIndex);
      forkJoin([
        this.paperService.update({ id: add?.id, position: event.removedIndex } as IPaperUM),
        this.paperService.update({ id: remove?.id, position: event.addedIndex } as IPaperUM)
      ]).pipe(
        tap(() => {
          moveItemInArray(this.papers, event.removedIndex as number, event.addedIndex as number);
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      ).subscribe();
    }
  };
}
