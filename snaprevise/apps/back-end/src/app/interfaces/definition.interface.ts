export interface IDefinitionProperty {
  additionalProperties?: boolean;
  required?: string[];
  type?: string;
  properties?: IProperty;
}

export interface IDefinition {
  [key: string]: IDefinitionProperty
}

export interface IProperty {
  [key: string]: IPropertyAttribute
}

export interface IPropertyAttribute {
  minLength?: number;
  maxLength?: number;
  title?: string;
  format?: string;
  type?: string;
}
