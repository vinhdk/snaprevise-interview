import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IModule, ITopic, ITopicUM } from '../../interfaces';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { tap } from 'rxjs/operators';
import { ModuleService, TopicService } from '../../services';
import { useUnsubscribable } from '../../decorators';
import { untilDestroyed } from '../../operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'snaprevise-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@useUnsubscribable()
export class ModuleComponent implements OnInit {

  @Input()
  public module!: IModule;

  public topics: ITopic[] = [];

  constructor(
    protected readonly moduleService: ModuleService,
    protected readonly topicService: TopicService,
    protected readonly cdr: ChangeDetectorRef
  ) { }

  /**
   * Call api by module.id to get list topic for display
   * @return void
   */
  public ngOnInit(): void {
    this.moduleService.findById(this.module.id)
      .pipe(
        tap((data) => {
          this.topics = data.topics;
          this.cdr.detectChanges();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  /**
   * get data of each topic
   * @param index: number - position of each topic
   * @return ITopic - data of each topic
   */
  public usePayload(): (index: number) => ITopic {
    return (index: number): ITopic => {
      return this.topics[index];
    };
  }

  /**
   * change position and call api after drop item to another place
   * @param event: DropResult - output event drop
   * @return void
   */
  public useDrop = (event: DropResult): void => {
    if (event.removedIndex != null && event.addedIndex != null) {
      const add = this.topics[event.addedIndex];
      const remove = this.topics[event.removedIndex];
      forkJoin([
        this.topicService.update({ id: add?.id, position: remove.position } as ITopicUM),
        this.topicService.update({ id: remove?.id, position: add.position } as ITopicUM)
      ]).pipe(
        tap(() => {
          moveItemInArray(this.topics, event.removedIndex as number, event.addedIndex as number);
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      ).subscribe();
    } else {
      if (event.addedIndex != null) {
        const data = { ...event.payload, moduleId: this.module.id, position: event.addedIndex } as ITopicUM;
        (data as any)['updateAll'] = true;
        this.topicService.update(data as ITopicUM)
          .pipe(
            tap((data) => {
              this.topics = (data as ITopic[]).filter((e: any) => e['moduleId'] === this.module.id);
              this.cdr.detectChanges();
            })
          )
          .subscribe();
      }
      if (event.removedIndex != null) {
        this.topics = this.topics.filter((topic) => topic.id !== event.payload.id);
        this.cdr.detectChanges();
      }
    }
  }

}
