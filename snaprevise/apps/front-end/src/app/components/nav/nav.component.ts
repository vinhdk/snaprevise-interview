import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'snaprevise-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
