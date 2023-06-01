import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Country } from 'src/app/dataaccess/country';
import { CountryService } from 'src/app/service/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent {

  countrysDataSource = new MatTableDataSource<Country>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'country', 'nationality', 'actions'];

  public constructor(private countryService: CountryService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.countrysDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.countryService.getList().subscribe(obj => {
      this.countrysDataSource.data = obj;
    });
  }

  async edit(e: Country) {
    await this.router.navigate(['country', e.id]);
  }

  async add() {
    await this.router.navigate(['country']);
  }

  delete(e: Country) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Country?',
        message: 'Do you really want to delete the selected country?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.countryService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Country deleted!"', 'Close', {duration: 5000});
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
