export class Template {
  constructor(public id: string, public name: string, public description: string, public html: boolean,
              public hasParameter: boolean, public template: String, public templateParams: Array<TemplateParam>) {
  }
}

export class TemplateParam {
  constructor(public paramKey: String, public required: boolean) {
  }
}
