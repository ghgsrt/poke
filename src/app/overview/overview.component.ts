import { Component, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Monster } from '../monster';
import { Attack } from '../attack';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnChanges {
  @Input() monster?: Monster;
  backgroundColor: string = 'white';
  borderColor: string = 'black'

  ngOnChanges(changes: SimpleChanges) {
    this.backgroundColor = 'hsl(' + (this.monster?.dexColor || 0) + ', 15%, 98%)';
    this.borderColor = 'hsl(' + (this.monster?.dexColor || 0) + ', 80%, 35%)';
  }

  getName(setValue: Attack | Attack[]): string {
    let name = '';
    if (Array.isArray(setValue)) {
      setValue.forEach((attack) => {
        name += attack.name + ', ';
      });
      name.slice(0, name.length - 2);
    } else name = setValue.name;

    return name;
  }

  getGenderInfo(): string {
    let info = '';
    this.monster?.gender.forEach((gender) => {
      info +=
        gender +
        ' (' +
        (gender === 'Male'
          ? this.monster?.genderRatio
          : 100 - (this.monster?.genderRatio ?? 0)) +
        ')  ';
    });

    return info;
  }

  isArray(obj: Object) {
    return Array.isArray(obj);
  }
}
