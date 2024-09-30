import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { addDays, EJ2Instance, resetTime, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { Browser, Internationalization } from '@syncfusion/ej2-base'; // Make sure to import the necessary service
import { SchedulerComponent } from '../schedule/schedule.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TextBoxModule, ButtonModule, CommonModule, SchedulerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit {
  @ViewChild('scheduleObj') scheduleObj!: SchedulerComponent;
  browser = Browser.isDevice;
  intl: Internationalization = new Internationalization();
  currentDate: Date = new Date();

  dateFormat: any
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private commonService: CommonService) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Now you can safely access the document
      this.dateFormat = this.intl.formatDate(this.currentDate, { format: 'MMMM y' })
      // Your logic here
    }
  }
  onSearchChange(event: any): void {
    // Your logic for handling search change
    console.log(event);
  }

  onMonthChange(direction: string): void {
    // Your logic to change the month
    if (direction === 'prev') {
      // Decrease month logic
    } else {
      // Increase month logic
    }
  }

  handleOpenEditor(): void {
    this.commonService.emittedData.next(true)

  }

  // Ensure that ViewChild is initialized before usage
  ngAfterViewInit(): void {
    // scheduleObj will now be available for use here
    if (!this.scheduleObj) {
      console.error('ScheduleComponent is not available.');
    }
  }
}
