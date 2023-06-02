import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactDetails } from 'src/app/dataaccess/contact-details';
import { ContactDetailsService } from 'src/app/service/contact-details.service';

@Component({
  selector: 'app-contact-details-create',
  templateUrl: './contact-details-create.component.html',
  styleUrls: ['./contact-details-create.component.scss']
})
export class ContactDetailsCreateComponent {

  contactDetails = new ContactDetails();
  public objForm = new UntypedFormGroup({
      street: new UntypedFormControl(''),
      streetNumber: new UntypedFormControl(''),
      email: new UntypedFormControl(''),
      postalNumber: new UntypedFormControl(''),
      phoneNumber: new UntypedFormControl(''),
      city: new UntypedFormControl(''),
      country: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private contactDetailsService: ContactDetailsService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.contactDetailsService.getOne(id).subscribe(obj => {
        this.contactDetails = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.contactDetails);
    }
  }

  async back() {
    await this.router.navigate(['contactdetailsList']);
  }

  async save(formData: any) {
    this.contactDetails = Object.assign(formData);

    if (this.contactDetails.id) {
      this.contactDetailsService.update(this.contactDetails).subscribe({
        next: () => {
          this.snackBar.open('ContactDetails saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save contactDetails', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.contactDetailsService.save(this.contactDetails).subscribe({
        next: () => {
          this.snackBar.open('New contactDetails saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new contactDetails', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
