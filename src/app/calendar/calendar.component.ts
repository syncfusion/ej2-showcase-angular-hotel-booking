import { Component } from '@angular/core';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars'
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',

})
export class CalendarControl {
  constructor() {
  }
}
