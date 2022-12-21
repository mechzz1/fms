import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, ViewChild, Output, SimpleChanges } from '@angular/core';
// import { CustomValidatorsInfo } from '../../componentModel/custom-validators-info';
import { InputInfo } from '../../componentModel/input-info';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { UntypedFormControl } from '@angular/forms';


@Component({
  selector: 'app-google-map-view',
  templateUrl: './google-map-view.component.html',
  styleUrls: ['./google-map-view.component.css']
})
export class GoogleMapViewComponent implements OnInit , AfterContentChecked {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  // latitude: number;
  // longitude: number;
  zoom: number;
  address: string;
  public iconUrl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  @Input() inputInfo: InputInfo;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() changeFlag: boolean;
  @Output() updateData = new EventEmitter<string>();
  @Output() preSubmit = new EventEmitter();
  @Output() submit = new EventEmitter();

  formControl = new UntypedFormControl("", []);


  private geoCoder;


  change = false;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private changeDetector: ChangeDetectorRef,
  ) { }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     let place = autocomplete.getPlace();

      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }

      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.getAddress(this.latitude, this.longitude);
      //     this.zoom = 12;
      //   });
      // });
    });
 

    
    
  }
  onEnter(val?) {
    this.preSubmit.emit();
   
  }

  private setCurrentLocation() {

    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.updateData.emit(JSON.stringify({ latitude: this.latitude, longitude: this.longitude, address: this.address }));
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.changeFlag && !changes.changeFlag.firstChange) {
      this.formControl.markAsDirty();
      this.formControl.updateValueAndValidity();
      this.submit.emit();
    }
  }


}
