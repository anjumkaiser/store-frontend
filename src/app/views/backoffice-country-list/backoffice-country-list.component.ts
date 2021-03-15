import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { ICountry } from 'src/app/interfaces/icountry';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';


import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-backoffice-country-list',
  templateUrl: './backoffice-country-list.component.html',
  styleUrls: ['./backoffice-country-list.component.css']
})
export class BackofficeCountryListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'code', 'name', 'buttons'];
  private resultsLength = 0;
  private isLoadingResults = false;
  private isRateLimitReached = false;
  private selection = new SelectionModel<ICountry>(true, []);

  countries: MatTableDataSource<ICountry>;

  @ViewChild(MatTable) countryTable: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private countryService: CountryService,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit() {
    this.countryService.getCountries().subscribe((e) => {
      this.countries = new MatTableDataSource(e);
      this.resultsLength = e.length;
    });

    this.sort.sortChange.subscribe(e => {
      console.log(e);
    });


    this.paginator.page.subscribe(e => {
      console.log(e);
    });
  }


  applyFilter(filterValue: string) {
    this.countries.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.countries.data.length;
    return numSelected === numRows;
  }

  removeCountry(country) {
    this.countryService.deleteCountry(country).toPromise().then(x => {
      this.countries.data.splice(this.countries.data.indexOf(country));
      this.countryTable.renderRows();
    }).catch(e => {
      //console.log('error caught ['+ JSON.stringify(e) + ']');
      // e.status => 403
      // e.statusText => 'Forbidden'
      // e.message = 'Http failure response for <url>: 403 Frobidden'
      // e.error = <flash error returned from api>
      if (e.status == 504) {
        this.snackBar.open('Unable to access server.', 'Ok', {duration: 1000});
      } else {
        this.snackBar.open(e.error, 'Ok', {duration: 1000});
      }
    });
  }

}
