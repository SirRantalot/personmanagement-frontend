import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { City } from 'src/app/dataaccess/city';
import { CityService } from 'src/app/service/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit, AfterViewInit {

  citysDataSource = new MatTableDataSource<City>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'city', 'actions'];

  public constructor(private cityService: CityService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.citysDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.cityService.getList().subscribe(obj => {
      this.citysDataSource.data = obj;
    });
  }

  async edit(e: City) {
    await this.router.navigate(['city', e.id]);
  }

  async add() {
    await this.router.navigate(['city']);
  }

  delete(e: City) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete City?',
        message: 'Do you really want to delete the selected city?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.cityService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('City deleted!"', 'Close', {duration: 5000});
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
