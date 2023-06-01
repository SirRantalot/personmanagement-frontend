import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/dataaccess/country';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.scss']
})
export class CountryCreateComponent {

  country = new Country();
  public objForm = new UntypedFormGroup({
    firstname: new UntypedFormControl(''),
    name: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private countryService: CountryService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.countryService.getOne(id).subscribe(obj => {
        this.country = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.country);
    }
  }

  async back() {
    await this.router.navigate(['cities']);
  }

  async save(formData: any) {
    this.country = Object.assign(formData);

    if (this.country.id) {
      this.countryService.update(this.country).subscribe({
        next: () => {
          this.snackBar.open('Country saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save country', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.countryService.save(this.country).subscribe({
        next: () => {
          this.snackBar.open('New country saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new country', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
