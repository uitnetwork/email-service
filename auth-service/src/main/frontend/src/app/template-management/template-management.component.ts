import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Template } from '../models/template';
import { TemplateComponent } from '../template/template.component';
import { TemplateService } from '../service/template.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.scss']
})
export class TemplateManagementComponent implements OnInit, AfterViewInit {
  displayedColumns = ['checkbox', 'id', 'name', 'description', 'actions'];
  templates: Template[] = [];
  dataSource = new MatTableDataSource(this.templates);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private dialog: MatDialog, private templateService: TemplateService) {
  }

  ngOnInit() {
    this.templateService.getTemplates()
      .then(templates => this.setTemplates(templates))
      .catch(error => console.error(error));
  }

  private setTemplates(templates: Array<Template>) {
    this.templates = templates;
    this.dataSource.data = this.templates;
  }

  private addTemplate(template: Template) {
    this.templates.push(template);
    this.dataSource.data = this.templates;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  delete(template: Template) {
    console.log(`Deleting ${JSON.stringify(template)}`);

    this.templateService.deleteTemplate(template)
      .then(result => {
        _.remove(this.templates, currentTemplate => {
          return currentTemplate.id === template.id;
        });
        this.setTemplates(this.templates);
      }).catch(error => Promise.reject(error));
  }

  openDialog() {
    const dialogRef = this.dialog.open(TemplateComponent, {
      width: '500px',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`After closed hehere ${JSON.stringify(result)}`);
      if (result) {
        this.addTemplate(result);
      }
    });
  }
}
