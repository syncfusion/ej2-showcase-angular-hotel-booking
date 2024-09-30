import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons'
import { enableRipple } from '@syncfusion/ej2-base'
import { CommonService } from '../../common.service';
import { features } from 'process';
@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CheckBoxModule, CommonModule],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent {
  checkboxAllState: boolean = false;
  selectedData: any = [] ;

  constructor(private commonService: CommonService,private cdr: ChangeDetectorRef) {}

  floorData!: Array<Record<string, any>>;
  checkboxStates: boolean[] = [];

  ngOnInit(): void {
    this.floorData = this.commonService.floorData;
    this.checkboxStates[0] = true;
    this.selectedData.push(this.floorData[0]['id']);
    this.detectionRef();
  }

  onCheckboxChangeAll(event: any): void {
    console.log(event);
    if(event.checked === true) {
      this.checkboxStates = this.floorData.map(() => true);
      this.selectedData = this.floorData.map((item: any) => item.id);
    } else {
      this.checkboxStates = this.floorData.map(() => false);
      this.selectedData = [];
    }
    this.detectionRef();
  
    // Your logic for handling "Select All" checkbox change
  }

  onCheckboxChange(event: any, item: any): void {
    console.log(event);
    if(event.checked) {
      this.selectedData.push(item?.id);
    } else { 
      const index = this.selectedData.findIndex((id: any) => id === item?.id);
      if(index >= 0) {
        this.selectedData.splice(index, 1);
      }
    }
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
    this.cdr.detectChanges();
  }
}
