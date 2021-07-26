export interface IPath {
 [key: string]: IMethod;
}

export type IMethod = {
  [key: string]: IMethodProperty;
}

export interface IMethodProperty {
  tags?: string[];
  operationId?: string;
  consumes?: string[];
  responses?: IResponse;
  parameters?: IParameter[];
}

export interface IResponse {
  [key: number]: {
    'x-nullable'?: boolean;
    description?: string
  }
}

export interface IParameter {
  name: string;
  in: string;
  required: boolean;
  type?: string;
  format?: string;
  'x-nullable'?: boolean;
  schema?: {
    $ref: string;
  }
}
