import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/dataaccess/person';
import { ContactDetailsService } from 'src/app/service/contact-details.service';
import { CountryService } from 'src/app/service/country.service';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  person = new Person();
  public objForm = new UntypedFormGroup({
    firstname: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    age: new UntypedFormControl(''),
    contactDetailsId: new UntypedFormControl(''),
    nationality: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private personService: PersonService, private contactDetailsService: ContactDetailsService, private nationalityService: CountryService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.personService.getOne(id).subscribe(obj => {
        this.person = obj;
        this.objForm = this.formBuilder.group(obj);
        this.objForm.addControl('contactDetailsId', new UntypedFormControl(obj.contactDetails.id));
        this.objForm.addControl('nationality', new UntypedFormControl(obj.nationality.id));
      });
    } else {
      this.objForm = this.formBuilder.group(this.person);
      this.objForm.addControl('contactDetailsId', new UntypedFormControl(''));
      this.objForm.addControl('nationality', new UntypedFormControl(''));
    }
  }

  async back() {
    await this.router.navigate(['people']);
  }

  async save(formData: any) {
    this.person = Object.assign(formData);

    this.contactDetailsService.getOne(formData.contactDetailsId).subscribe(o => {
      this.person.contactDetails = o;

      this.nationalityService.getOne(formData.nationality).subscribe(p => {
        this.person.nationality = p;
        if (this.person.id) {
          this.personService.update(this.person).subscribe({
            next: () => {
              this.snackBar.open('Person saved', 'Close', {duration: 5000});
              this.back();
            },
            error: () => {
              this.snackBar.open('Failed to save person', 'Close', {duration: 5000, politeness: 'assertive'});
            }
          });
        } else {
          this.personService.save(this.person).subscribe({
            next: () => {
              this.snackBar.open('New person saved', 'Close', {duration: 5000});
              this.back();
            },
            error: () => {
              this.snackBar.open('Failed to save new person', 'Close', {duration: 5000, politeness: 'assertive'});
            }
          });
        }
      })
    });


  }
}
