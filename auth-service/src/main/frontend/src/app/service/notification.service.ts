import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) {
  }

  notify(message: string) {
    this.matSnackBar.open(message);
  }
}
