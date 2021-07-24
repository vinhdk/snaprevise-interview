import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBase } from '../../interfaces';

@Component({
  selector: 'snaprevise-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input()
  public item: IBase | undefined;

  @Input()
  public hideLine: boolean = false;

  @Input()
  public color: string = 'transparent';

  @Input()
  public lineColor: string = 'transparent';

  @Input()
  public category: string = '';

  @Input()
  public addText: string | undefined;

  @Input()
  public level: number = 0;
}
