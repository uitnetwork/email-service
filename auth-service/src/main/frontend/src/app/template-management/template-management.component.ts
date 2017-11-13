import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Template } from '../models/template';
import { TemplateComponent } from '../template/template.component';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.scss']
})
export class TemplateManagementComponent implements OnInit, AfterViewInit {
  displayedColumns = ['checkbox', 'id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource(TEST_DATA);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public dialog: MatDialog) {
  }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog() {
    const dialogRef = this.dialog.open(TemplateComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('After closed hehere');
    });
  }
}

const TEST_DATA: Template[] = [
  {id: '1', name: 'name 1', description: 'description 1'},
  {id: '2', name: 'name 2', description: 'description 2'},
  {id: '3', name: 'name 3', description: 'description 3'},
  {id: '4', name: 'name 4', description: 'description 4'},
  {id: '5', name: 'name 5', description: 'description 5'},
  {id: '6', name: 'name 5', description: 'description 5'},
  {id: '7', name: 'name 5', description: 'description 5'},
  {id: '8', name: 'name 5', description: 'description 5'},
  {id: '9', name: 'name 5', description: 'description 5'},
  {id: '10', name: 'name 5', description: 'description 5'},
  {id: '11', name: 'name 5', description: 'description 5'},
  {id: '12', name: 'name 5', description: 'description 5'},
  {id: '13', name: 'name 5', description: 'description 5'},


];
