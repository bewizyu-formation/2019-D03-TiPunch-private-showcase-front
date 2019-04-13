import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {FormBuilder, FormControl} from '@angular/forms';
import {GeoServicesService} from '../services/geo-services.service';

@Component({
  selector: 'app-location-chips',
  templateUrl: './location-chips.component.html',
  styleUrls: ['./location-chips.component.css']
})
export class LocationChipsComponent implements OnInit {

  @Input()
  counties: any;

  newCountyCtrl: FormControl;
  countiesList: any[] = [];

  @ViewChild('countyInput') countyInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(fb: FormBuilder, private geoService: GeoServicesService){

    this.newCountyCtrl = fb.control('');
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.counties.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.newCountyCtrl.setValue(null);
    }
  }
  remove(county: any): void {
    const index = this.counties.indexOf(county);

    if (index >= 0) {
      this.counties.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.counties.push(event.option.viewValue);
    this.countyInput.nativeElement.value = '';
    this.newCountyCtrl.setValue(null);
  }


  ngOnInit() {
    this.newCountyCtrl.valueChanges.subscribe(value => {
      this.geoService.getCounties(value).then((data: any[]) => this.countiesList = data);
    });

  }
}


