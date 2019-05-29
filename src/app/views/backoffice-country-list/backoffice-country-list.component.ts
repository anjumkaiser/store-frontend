import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { ICountry } from 'src/app/interfaces/icountry';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';


import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-backoffice-country-list',
  templateUrl: './backoffice-country-list.component.html',
  styleUrls: ['./backoffice-country-list.component.css']
})
export class BackofficeCountryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'code', 'name', 'buttons'];
  private resultsLength = 0;
  private isLoadingResults = false;
  private isRateLimitReached = false;
  private selection = new SelectionModel<ICountry>(true, []);

  countries: MatTableDataSource<ICountry>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit() {
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
    console.log( 'removeCountry ' + JSON.stringify(country) );
  }

}
