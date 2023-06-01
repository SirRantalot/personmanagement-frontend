import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from 'src/app/dataaccess/city';
import { CityService } from 'src/app/service/city.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.scss']
})
export class CityCreateComponent {

  city = new City();
  public objForm = new UntypedFormGroup({
    firstname: new UntypedFormControl(''),
    name: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private cityService: CityService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.cityService.getOne(id).subscribe(obj => {
        this.city = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.city);
    }
  }

  async back() {
    await this.router.navigate(['cities']);
  }

  async save(formData: any) {
    this.city = Object.assign(formData);

    if (this.city.id) {
      this.cityService.update(this.city).subscribe({
        next: () => {
          this.snackBar.open('City saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save city', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.cityService.save(this.city).subscribe({
        next: () => {
          this.snackBar.open('New city saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new city', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
