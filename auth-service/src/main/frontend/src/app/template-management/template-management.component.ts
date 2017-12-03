import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Template } from '../models/template';
import { TemplateComponent } from '../template/template.component';
import { TemplateService } from '../service/template.service';
import { NotificationService } from '../service/notification.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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

  constructor(private dialog: MatDialog, private templateService: TemplateService, private notificationService: NotificationService) {
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

  private updateTemplate(template: Template) {
    _.remove(this.templates, currentTemplate => {
      return currentTemplate.id === template.id;
    });

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

  confirmThenDelete(template: Template) {
    console.log(`Deleting ${JSON.stringify(template)}`);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(isConfirmed => {
      console.log(`Confirmed: ${isConfirmed} to delete: ${template.name}`);

      if (isConfirmed === true) {
        this.delete(template);
      }
    });
  }

  delete(template: Template) {
    this.templateService.deleteTemplate(template)
      .then(result => {
        _.remove(this.templates, currentTemplate => {
          return currentTemplate.id === template.id;
        });
        this.setTemplates(this.templates);
        this.notificationService.notify(`Success: Template: ${template.name} was deleted.`);
      }).catch(error => {
      this.notificationService.notify(`Error: ${error.json().message}`);
    });
  }

  createTemplate() {
    const dialogRef = this.dialog.open(TemplateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Created Template: ${JSON.stringify(result)}`);
      if (result) {
        this.addTemplate(result);
      }
    });
  }

  editTemplate(template: Template) {
    const dialogRef = this.dialog.open(TemplateComponent, {
      data: template
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Updated Template: ${JSON.stringify(result)}`);
      if (result) {
        this.updateTemplate(result);
      }
    });
  }
}
