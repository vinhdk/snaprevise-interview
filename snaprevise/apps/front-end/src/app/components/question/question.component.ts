import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../interfaces';

@Component({
  selector: 'snaprevise-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit {

  @Input()
  public question: IQuestion | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
