import { Component, Input } from '@angular/core';
import { Matchup } from '../types';

@Component({
  selector: 'app-square',
  template: `
      <button>{{ monster }}</button>
  `,
  styles: [
    'button { height: 200px; width: 200px; font-size: 24px;}'
  ]
})
export class SquareComponent {
  @Input() monster?: string;
}
