import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IModule, IPaper } from '../../interfaces';
import { modules } from '../../../assets/mocks';
import { DropResult } from 'ngx-smooth-dnd';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'snaprevise-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperComponent implements OnInit {

  @Input()
  public paper: IPaper | undefined;

  public modules: IModule[] = [];

  constructor() { }

  public ngOnInit(): void {
    this.modules = modules.filter((module) => module.paper.id === this.paper?.id);
  }

  public usePayload(): (index: number) => IModule {
    return (index: number): IModule => {
      return this.modules[index];
    };
  }

  public useDrop = (event: DropResult): void => {
    console.log('paper - ' + this.paper?.title, event);
    if (event.removedIndex != null && event.addedIndex != null) {
      moveItemInArray(this.modules, event.removedIndex, event.addedIndex);
    } else {
      if (event.addedIndex != null) {
        this.modules.push(event.payload);
      }
      if (event.removedIndex != null) {
        this.modules = this.modules.filter((module) => module.id !== event.payload.id);
      }
    }
  }
}
