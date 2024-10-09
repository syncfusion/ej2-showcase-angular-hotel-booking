import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppBarModule, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { SidebarControl } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SchedulerComponent } from './schedule/schedule.component';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, RecurrenceEditorModule, CommonModule, RouterOutlet, AppBarModule, SidebarControl, HeaderComponent, SchedulerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  startDate: Date = new Date()
  id: number = 1;
  @ViewChild('sideBar') sideBar!: SidebarComponent;

  constructor(public commonService: CommonService) { }

  ngOnInit() {

    for (let i: number = 0, f: number = 5; i < 20; i++, f++) {
      const randomCollection: number[] = [];
      let random: number = 0;
      for (let j: number = 0; j < 30; j++) {
        random = Math.floor(Math.random() * 30);
        random = random === 0 ? 1 : random;
        if (
          randomCollection.includes(random) ||
          randomCollection.includes(random + 2) ||
          randomCollection.includes(random - 2)
        ) {
          random += Math.max.apply(null, randomCollection) + 10;
        }
        for (let k: number = 1; k <= 2; k++) {
          randomCollection.push(random + k);
        }
        const startDate: Date = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          random,
        );
        const endDate: Date = new Date(
          startDate.getTime() + (1440 + 30) * (1000 * 60),
        );
        let dateDifference: number = 0;
        const timeDifference: number = endDate.getTime() - startDate.getTime();
        const differenceInDays: number = timeDifference / (1000 * 60 * 60 * 24);
        dateDifference = differenceInDays;
        const nights: number = Math.floor(dateDifference);
        const adult: number = Math.floor(Math.random() * 4) + 1;
        const child: number = Math.floor(Math.random() * 5);
        let floor = 0;
        const roomsInFloor = 4;
        if (i >= 1 * roomsInFloor) {
          floor += 1;
        }
        if (i >= 2 * roomsInFloor) {
          floor += 1;
        }
        if (i >= 3 * roomsInFloor) {
          floor += 1;
        }
        if (i >= 4 * roomsInFloor) {
          floor += 1;
        }
        let color = this.getBorderColor(i + 1, floor + 1)
        this.commonService.bookingData.push({
          Id: this.id,
          GuestName: 'Steve Smith',
          CheckIn: startDate.toISOString(),
          CheckOut: endDate.toISOString(),
          IsAllDay: !(this.id % 10),
          Floor: floor + 1,
          Room: i + 1,
          Nights: nights,
          Adults: adult,
          Child: child,
          Purpose: 'Vacation',
          ContactNumber: '',
          Email: '',
          Price: 500,
          Proof: '',
          ProofNumber: '',
          EndTimezone: null,
          RecurrenceException: null,
          RecurrenceID: null,
          RecurrenceRule: null,
          StartTimezone: null,
          Color: color
        });
        this.id++;
      }
    }
  }

  getBorderColor(roomId: number, floorId: number) {
    const key: any = `${roomId}_${floorId}`;
    return this.commonService.borderColor[key] || '#000';
  };
}
