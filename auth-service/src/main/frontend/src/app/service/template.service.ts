import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Template } from '../models/template';
import { environment } from '../../environments/environment';

// TODO Remove deprecated API (Http, Headers)
@Injectable()
export class TemplateService {

  constructor(private http: Http) {
  }

  getTemplates(): Promise<Array<Template>> {
    const url = `${environment.templateServiceUrl}/api/templates`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Array<Template>;
      }).catch(error => Promise.reject(error));
  }

  createTemplate(template: Template): Promise<Template> {
    const url = `${environment.templateServiceUrl}/api/templates`;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, JSON.stringify(template), {headers: headers})
      .toPromise()
      .then(response => {
        return response.json() as Template;
      }).catch(error => Promise.reject(error));
  }

  updateTemplate(template: Template): Promise<Template> {
    const url = `${environment.templateServiceUrl}/api/templates/${template.id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, JSON.stringify(template), {headers: headers})
      .toPromise()
      .then(response => {
        return response.json() as Template;
      }).catch(error => Promise.reject(error));
  }

  deleteTemplate(template: Template): Promise<boolean> {
    const url = `${environment.templateServiceUrl}/api/templates/${template.id}`;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.delete(url, {headers: headers})
      .toPromise()
      .then(response => {
        return true;
      }).catch(error => Promise.reject(error));
  }
}
