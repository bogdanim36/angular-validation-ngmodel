export class FieldValidation {
  isError = false;
  isWarning = false;
  isTransformation = false;
  message: string | Function;
  messageFn?: Function;
  valid ? = true;
  data: any;
  path: string;

  constructor(initial: Partial<FieldValidation>) {
    Object.assign(this, initial);
    if (initial.rule) {
      this.rule = initial.rule.bind(this);
    }
    if (initial.ruleCondition) {
      this.ruleCondition = initial.ruleCondition.bind(this);
    }
    if (!this.isError && !this.isWarning && !this.isTransformation) {
      console.error('FieldValidation must has set isError or isWarning or isTransformation to true!');
    }
  }

  validate(source) {
    if (this.ruleCondition(source)) {
      this.valid = this.rule(source);
    } else {
      this.valid = true;
    }
    if (!this.valid && typeof this.messageFn === 'function') {
      this.message = this.messageFn.call(this, source);
    }
    return this.valid;
  }

  ruleCondition(data: any): boolean {
    return true;
  }

  rule(value: any): boolean {
    return true;
  }

  getObjectInScope(path: string, source: any) {
    if (typeof path !== 'string') {
      return source[path];
    }
    const newObjectName = path.substring(path.indexOf('.') + 1);
    const isNestedObject = path.split('.').length > 1;
    if (isNestedObject) {
      return this.getObjectInScope(newObjectName, source[path.split('.')[0]]);
    } else {
      if (!source) {
        return null;
      } else {
        return source[newObjectName];
      }
    }
  }

  getReference(path: string, source: any): { source: any, path: string } {
    let pathParts = path.split('.');
    if (pathParts.length === 1) {
      return {source: source, path: path};
    } else {
      let property = pathParts[pathParts.length - 1];
      pathParts.splice(pathParts.length - 1, 1);
      let parentPath = pathParts.join('.');
      let value = this.getObjectInScope(parentPath, source);
      return {path: property, source: value};
    }

  }
}
