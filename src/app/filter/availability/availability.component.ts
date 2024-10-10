import { Component, Input } from '@angular/core';
import { CommonService } from '../../common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css',
})
export class AvailabilityComponent {
  @Input() item: any;
  constructor(private commonService: CommonService) { }
  currentDate!: Date
  bookedStatus: Record<string, any> = {
    status: "avail",
    count: null
  };

  ngOnChanges() {
    this.commonService.currentDate.subscribe((res) => {
      this.currentDate = res;
    });
    this.commonService.emittedSavedData.subscribe((res) => {
      if (res) {
        this.bookedStatus = this.getRoomBookedStatus(this.item?.id);
      }
    })
  }

  getRoomBookedStatus(id: number): Record<string, any> {
    const currentDateBookings = this.commonService.bookingData.filter(
      (item: Record<string, any>) => {
        const checkInDateString = new Date(item['CheckIn']).toLocaleDateString(); // Check-in date without time
        const checkOutDateString = new Date(item['CheckOut']).toLocaleDateString(); // Check-out date without time

        // Check if the check-in or check-out date is the same as the current date
        const isCheckInToday = checkInDateString === new Date(this.currentDate).toLocaleDateString();
        const isCheckOutToday = checkOutDateString === new Date(this.currentDate).toLocaleDateString();

        // Check if the booking overlaps with the current date
        const isOverlapping = (new Date(item['CheckIn']) <= new Date(this.currentDate) && new Date(item['CheckOut']) >= new Date(this.currentDate));
        return isCheckInToday || isCheckOutToday || isOverlapping;
      }
    );
    const bookedRoomsInFloor: Array<Record<string, any>> = currentDateBookings.filter(
      (item: Record<string, any>) => item['Floor'] === id
    );

    const numberOfRoomInFloor: Array<Record<string, any>> = this.commonService.roomData.filter(
      (item: Record<string, any>) => item['groupId'] === id
    );

    let count: number = 0;

    for (const bookedRoom of bookedRoomsInFloor) {
      for (const roomNumber of numberOfRoomInFloor) {
        if (bookedRoom['Room'] === roomNumber['id']) {
          count++;
        }
      }
    }

    const availableRooms: number = numberOfRoomInFloor.length - count;

    return {
      status: availableRooms > 0 ? 'avail' : 'full',
      count: availableRooms > 0 ? availableRooms : '',
    };
  }
}
