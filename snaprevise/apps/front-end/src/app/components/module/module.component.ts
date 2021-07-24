import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IModule, ITopic } from '../../interfaces';
import { topics } from '../../../assets/mocks';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'snaprevise-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleComponent implements OnInit {

  @Input()
  public module: IModule | undefined;

  public topics: ITopic[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.topics = topics.filter((topic) => topic.module.id === this.module?.id);
  }

  public usePayload(): (index: number) => ITopic {
    return (index: number): ITopic => {
      return this.topics[index];
    };
  }

  public useDrop = (event: DropResult): void => {
    console.log('module - ' + this.module?.title, event);
    if (event.removedIndex != null && event.addedIndex != null) {
      moveItemInArray(this.topics, event.removedIndex, event.addedIndex);
    } else {
      if (event.addedIndex != null) {
        this.topics.splice(event.addedIndex, 0, event.payload);
      }
      if (event.removedIndex != null) {
        this.topics = this.topics.filter((topic) => topic.id !== event.payload.id);
      }
    }
  }

}
