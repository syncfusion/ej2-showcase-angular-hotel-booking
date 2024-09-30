import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { FloorComponent } from '../floor/floor.component';
import { PriceComponent } from '../price/price.component';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ AccordionModule, FloorComponent, PriceComponent, FeaturesComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

}
