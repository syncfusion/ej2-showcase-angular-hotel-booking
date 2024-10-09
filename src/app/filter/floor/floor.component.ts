import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons'
import { CommonService } from '../../common.service';
import { AvailabilityComponent } from '../availability/availability.component';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CheckBoxModule, CommonModule, AvailabilityComponent],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css',
})
export class FloorComponent {
  checkboxAllState: boolean = false;
  selectedData: any = [];
  constructor(private commonService: CommonService) { }

  floorData!: Array<Record<string, any>>;
  checkboxStates: boolean[] = [];

  ngOnInit(): void {
    this.floorData = this.commonService.floorData;
    this.checkboxStates[0] = true;
    this.checkboxStates[1] = true;
    this.selectedData.push(this.floorData[0]['id']);
    this.selectedData.push(this.floorData[1]['id']);
  }


  onCheckboxChangeAll(event: any): void {

    if (event.checked === true) {
      this.checkboxStates = this.floorData.map(() => true);
      this.selectedData = this.floorData.map((item: any) => item.id);
      this.checkboxAllState = true;
    } else {
      this.checkboxStates = this.floorData.map(() => false);
      this.selectedData = [];
      this.checkboxAllState = false;
    }
    console.log(this.checkboxStates);
    this.detectionRef();

    // Your logic for handling "Select All" checkbox change
  }

  onCheckboxChange(event: any, item: any, index: number): void {
    if (event.checked) {
      this.selectedData.push(item?.id);
      this.checkboxStates[index] = true;
    } else {
      const selectedIndex = this.selectedData.findIndex((id: any) => id === item?.id);
      if (selectedIndex >= 0) {
        this.selectedData.splice(selectedIndex, 1);
      }
      this.checkboxStates[index] = false;
    }
    if (this.selectedData.length === this.floorData.length) {
      this.checkboxAllState = true;
    } else {
      this.checkboxAllState = false;
    }
    console.log(this.checkboxAllState);
    this.detectionRef();

    // Your logic for handling individual checkbox change
  }

  detectionRef() {
    const currentValue = this.commonService.filterData.value;
    const newValue = {
      ...currentValue,
      floorId: this.selectedData
    };
    this.commonService.filterData.next(newValue);
  }
}
