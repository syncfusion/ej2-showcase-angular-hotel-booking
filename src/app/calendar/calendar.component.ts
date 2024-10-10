import { Component, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarModule } from '@syncfusion/ej2-angular-calendars'
import { CommonService } from '../common.service';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',

})
export class CalendarControl {
  constructor(private commonService: CommonService) {
  }
  currentDate!: Date
  @ViewChild('calendarRef') calendar: CalendarComponent | undefined;

  ngOnInit() {
    this.commonService.currentDate.subscribe((res) => {
      this.currentDate = res;
    });
  }

  onCellRendered(args: any): void {
    const target: HTMLElement = args.element as HTMLElement;

    if (!target.classList.contains('e-other-month')) {
      const roomsBooked = this.commonService.bookingData.filter((item: any) => {
        let checkIn = new Date(item.CheckIn);
        let checkOut = new Date(item.CheckOut);
        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(0, 0, 0, 0);
        const targetDate = new Date(args?.date);
        targetDate.setHours(0, 0, 0, 0);

        // Check if targetDate is within the range
        return targetDate >= checkIn && targetDate <= checkOut
      });

      if (target) {
        target.classList.remove('available', 'not-available', 'almost-full');
      }
      if (roomsBooked.length < this.commonService.roomData.length / 2) {
        target.classList.add('available');
      }
      else if (roomsBooked.length === this.commonService.roomData.length) {
        target.classList.add('not-available');
      }
      else if (roomsBooked.length >= this.commonService.roomData.length / 2) {
        target.classList.add('almost-full');
      }
    }
    if (args.date.getMonth() < new Date().getMonth()) {
      target.classList.remove('available', 'not-available', 'almost-full');
    }

  }

  onDateChange(event: any) {
    if (event.value)
      this.commonService.currentDate.next(new Date(event.value));
    this.commonService.emittedSavedData.next(true);
  }

}
