import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IQuestion, IQuestionUM, ITopic } from '../../interfaces';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { tap } from 'rxjs/operators';
import { QuestionService, TopicService } from '../../services';
import { useUnsubscribable } from '../../decorators';
import { untilDestroyed } from '../../operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'snaprevise-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@useUnsubscribable()
export class TopicComponent implements OnInit {

  @Input()
  public topic!: ITopic;
  public questions: IQuestion[] = [];

  constructor(
    protected readonly topicService: TopicService,
    protected readonly questionService: QuestionService,
    protected readonly cdr: ChangeDetectorRef
  ) {
  }

  /**
   * Call api by topic.id to get list question for display
   * @return void
   */
  public ngOnInit(): void {
    this.topicService.findById(this.topic.id)
      .pipe(
        tap((data) => {
          this.questions = data.questions;
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  /**
   * get data of each question
   * @param index: number - position of each question
   * @return IQuestion - data of each question
   */
  public usePayload(): (index: number) => IQuestion {
    return (index: number): IQuestion => {
      return this.questions[index];
    };
  }

  /**
   * change position and call api after drop item to another place
   * @param event: DropResult - output event drop
   * @return void
   */
  public useDrop = (event: DropResult): void => {
    if (event.removedIndex != null && event.addedIndex != null) {
      const add = this.questions[event.addedIndex];
      const remove = this.questions[event.removedIndex];
      forkJoin([
        this.questionService.update({ id: add?.id, position: remove.position } as IQuestionUM),
        this.questionService.update({ id: remove?.id, position: add.position } as IQuestionUM)
      ]).pipe(
        tap(() => {
          moveItemInArray(this.questions, event.removedIndex as number, event.addedIndex as number);
          this.cdr.detectChanges();
        }),
        untilDestroyed(this)
      ).subscribe();
    } else {
      if (event.addedIndex != null) {
        const data = { ...event.payload, topicId: this.topic.id, position: event.addedIndex } as IQuestionUM;
        (data as any)['updateAll'] = true;
        this.questionService.update(data as IQuestionUM)
          .pipe(
            tap((data) => {
              this.questions = (data as IQuestion[]).filter((e: any) => e['topicId'] === this.topic.id);
              this.cdr.detectChanges();
            })
          )
          .subscribe();
      }
      if (event.removedIndex != null) {
        this.questions = this.questions.filter((question) => question.id !== event.payload.id);
        this.cdr.detectChanges();
      }
    }
  };

}
