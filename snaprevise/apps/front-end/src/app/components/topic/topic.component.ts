import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IQuestion, ITopic } from '../../interfaces';
import { questions } from '../../../assets/mocks';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'snaprevise-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicComponent implements OnInit {

  @Input()
  public topic: ITopic | undefined;
  public questions: IQuestion[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.questions = questions.filter((question) => question.topic.id === this.topic?.id);
  }

  public usePayload(): (index: number) => IQuestion {
    return (index: number): IQuestion => {
      return this.questions[index];
    };
  }

  public useDrop = (event: DropResult): void => {
    console.log('topic - ' + this.topic?.title, event);
    if (event.removedIndex != null && event.addedIndex != null) {
      moveItemInArray(this.questions, event.removedIndex, event.addedIndex);
    } else {
      if (event.addedIndex != null) {
        this.questions.push(event.payload);
      }
      if (event.removedIndex != null) {
        this.questions = this.questions.filter((question) => question.id !== event.payload.id);
      }
    }
  }

}
