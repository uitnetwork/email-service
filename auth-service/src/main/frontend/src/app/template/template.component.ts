import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TemplateParam } from '../models/template-param';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {
  templateParamDisplayedColumns = ['paramKey', 'required', 'actions'];
  templateParamDataSource = new MatTableDataSource((TEST_TEMPLATE_PARAMS));

  newParamKey = '';
  newParamRequired = false;

  constructor(public dialogRef: MatDialogRef<TemplateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  addNewTemplateParam() {
    console.log('Do addNewTemplateParam');
    console.log('abc: ' + this.newParamKey);
  }

}

const TEST_TEMPLATE_PARAMS: TemplateParam[] = [
  {paramKey: 'Name', required: true},
  {paramKey: 'Address', required: true},
  {paramKey: 'Email', required: true},
  {paramKey: 'Birthday', required: true},
  {paramKey: 'Age', required: true},
  {paramKey: 'Nothing', required: true},
];
