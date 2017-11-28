import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TemplateParam } from '../models/template-param';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Template } from '../models/template';
import { TemplateService } from '../service/template.service';

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

  template: Template;

  constructor(public dialogRef: MatDialogRef<TemplateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public templateService: TemplateService) {
    this.template = new Template(null, '', '', true, false, '', []);
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

  create() {
    console.log(`Creating ${JSON.stringify(this.template)}`);

    this.templateService.createTemplate(this.template)
      .then(t => {
        this.close(t);
      })
      .catch(error => console.error(error));
  }

  close(dialogResult?: any) {
    this.dialogRef.disableClose = false;
    this.dialogRef.close(dialogResult);
  }
}
