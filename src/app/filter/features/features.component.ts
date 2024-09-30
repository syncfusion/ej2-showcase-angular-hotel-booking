import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CheckBoxModule, CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  roomData: any = [];
  selectedData: any = [];
  constructor(private commonService: CommonService,private cdr: ChangeDetectorRef) {}
  
  checkboxStates = [false, false, false];
  ngOnInit(): void {
    this.roomData = this.commonService.amenities;
  }
  onCheckboxChange(event: any, item: any): void {
   // this.checkboxStates[index] = event.checked;
   if(event.checked) {
    this.selectedData.push(item?.id);
  } else { 
    const index = this.selectedData.findIndex((id: any) => id === item?.id);
    if(index >= 0) {
      this.selectedData.splice(index, 1);
    }
  }
  this.detectionRef();
  }

  detectionRef() {
    const currentValue = this.commonService.filterData.value;
    const newValue = {
      ...currentValue,
      featuresId: this.selectedData
    };
    this.commonService.filterData.next(newValue);
    this.cdr.detectChanges();
  }
}
