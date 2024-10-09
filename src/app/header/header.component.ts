import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
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
  currentDate!: Date
  dateFormat: any
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private commonService: CommonService) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.commonService.currentDate.subscribe((res) => {
        this.currentDate = res;
        this.dateFormat = this.intl.formatDate(this.currentDate, { format: 'MMMM y' })
      })
      // Now you can safely access the document
      // Your logic here
    }
  }
  onSearchChange(event: KeyboardEvent): void {
    let searchValue = (event.target as HTMLInputElement).value;
    searchValue = searchValue?.trim(); // Get the trimmed search value
    const currentValue = this.commonService.filterData.value; // Get the current filter data
    this.commonService.currentDate.next(this.commonService.currentDate.value);
    const newValue = {
      ...currentValue,
      search: searchValue // Set the new search value
    }
    this.commonService.filterData.next(newValue);
  }

  onMonthChange(direction: string): void {
    // Get current year, month, and day
    let year = this.currentDate.getFullYear();
    let month = this.currentDate.getMonth() + 1; // Months are 0-based in JavaScript (Jan = 0, Dec = 11)
    let day = this.currentDate.getDate();

    // Check the direction and adjust month and year
    if (direction === 'next') {
      month += 1;
      if (month > 12) {
        month = 1;  // Reset to January
        year += 1;  // Move to the next year
      }
    } else if (direction === 'prev') {
      month -= 1;
      if (month < 1) {
        month = 12;  // Reset to December
        year -= 1;   // Move to the previous year
      }
    }

    // Create the new date object
    const newDate = new Date(year, month - 1, day); // month is 0-based in Date constructor
    this.commonService.currentDate.next(newDate);
  }

  handleOpenEditor(): void {
    this.commonService.emittedData.next(true)

  }

  // Ensure that ViewChild is initialized before usage
  ngAfterViewInit(): void {
    // scheduleObj will now be available for use here
    if (!this.scheduleObj) {

    }
  }
}
