import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Person } from 'src/app/dataaccess/person';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, AfterViewInit {

  personsDataSource = new MatTableDataSource<Person>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'firstname', 'name', 'age', 'contactDetails', 'nationality', 'actions'];

  public constructor(private personService: PersonService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.personsDataSource.paginator = this.paginator;
    }
  }

  reloadData() {
    this.personService.getList().subscribe(obj => {
      this.personsDataSource.data = obj;
    });
  }

  async edit(e: Person) {
    await this.router.navigate(['person', e.id]);
  }

  async add() {
    await this.router.navigate(['person']);
  }

  delete(e: Person) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Person?',
        message: 'Do you really want to delete the selected person?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.personService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Person deleted!"', 'Close', {duration: 5000});
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
