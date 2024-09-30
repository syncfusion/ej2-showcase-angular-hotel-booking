import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.css'
})
export class SvgIconComponent {
  @Input() color: string = '#343A40'; // Default color
  @Input() subject: string = '';
  @Input() child: number = 0;
  @Input() adult: number = 0;
  @Input() night: number = 0;
}
