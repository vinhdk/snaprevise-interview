import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IQuestion } from '../../interfaces';

@Component({
  selector: 'snaprevise-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {

  @Input()
  public question: IQuestion | undefined;

}
