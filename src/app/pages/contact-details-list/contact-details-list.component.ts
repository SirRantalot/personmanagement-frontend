import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ContactDetails } from 'src/app/dataaccess/contact-details';
import { ContactDetailsService } from 'src/app/service/contact-details.service';

@Component({
  selector: 'app-contact-details-list',
  templateUrl: './contact-details-list.component.html',
  styleUrls: ['./contact-details-list.component.scss']
})
export class ContactDetailsListComponent {

  contactDetailsDataSource = new MatTableDataSource<ContactDetails>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'street', 'streetNumber', 'email', 'postalNumber', 'phoneNumber', 'city', 'country' , 'actions'];

  public constructor(private contactDetailsService: ContactDetailsService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.contactDetailsDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.contactDetailsService.getList().subscribe(obj => {
      this.contactDetailsDataSource.data = obj;
    });
  }

  async edit(e: ContactDetails) {
    await this.router.navigate(['contactdetails', e.id]);
  }

  async add() {
    await this.router.navigate(['contactdetails']);
  }

  delete(e: ContactDetails) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete ContactDetails?',
        message: 'Do you really want to delete the selected ContactDetails?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.contactDetailsService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('ContactDetails deleted!"', 'Close', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000})
        });
      }
    });
  }
}
