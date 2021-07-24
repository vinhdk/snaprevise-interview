import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TYPE } from '../../constants';
import { IItem } from '../../interfaces';

@Component({
  selector: 'snaprevise-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input()
  public type = TYPE.SELECTION;

  public readonly items: IItem[] = [
    {
      value: TYPE.SELECTION,
      title: 'Selection Page'
    },
    {
      value: TYPE.EMAIL,
      title: 'Email Page'
    },
    {
      value: TYPE.BUTTON,
      title: 'Button Page'
    },
    {
      value: TYPE.PAST_PAPER,
      title: 'Past Papers by Topic'
    }
  ];

}
