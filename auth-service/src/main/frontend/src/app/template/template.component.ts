import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Template, TemplateParam } from '../models/template';
import { TemplateService } from '../service/template.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {
  templateParamDisplayedColumns = ['paramKey', 'required', 'actions'];
  templateParams: TemplateParam[] = [];
  templateParamDataSource = new MatTableDataSource(this.templateParams);

  newParamKey = '';
  newParamRequired = false;

  title = '';
  action = '';
  template: Template;

  constructor(public dialogRef: MatDialogRef<TemplateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public templateService: TemplateService, public notificationService: NotificationService) {
    if (data) {
      this.template = data;
      this.title = `Editing template: ${this.template.name}`;
      this.action = 'edit';
      this.templateParams = this.template.templateParams;
      this.templateParamDataSource.data = this.templateParams;
    } else {
      this.title = 'Creating new template';
      this.action = 'create';
      this.template = new Template(null, '', '', true, false, '', []);
    }
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  addNewTemplateParam() {
    if (this.newParamKey) {
      const newTemplateParam = new TemplateParam(this.newParamKey, this.newParamRequired);
      this.templateParams.push(newTemplateParam);
      this.templateParamDataSource.data = this.templateParams;
    }
  }

  submit() {
    switch (this.action) {
      case 'create': {
        this.templateService.createTemplate(this.template)
          .then(t => {
            this.close(t);
          })
          .catch(error => this.notificationService.notify(`ERROR: ${error.message}`));
        break;
      }
      case 'edit': {
        this.templateService.updateTemplate(this.template)
          .then(t => {
            this.close(t);
          })
          .catch(error => this.notificationService.notify(`ERROR: ${error.message}`));
        break;
      }
      default: {
        this.notificationService.notify(`ERROR: Unknown action`)
        break;
      }
    }
  }

  close(dialogResult?: any) {
    this.dialogRef.disableClose = false;
    this.dialogRef.close(dialogResult);
  }
}
