import type { OptionalKeyOf } from '@dua-upd/utils-common';

export type ColumnConfigPipe = 'percent' | 'number' | 'date';

export interface ColumnConfig<T = any> {
  field: OptionalKeyOf<T>;
  header: string;
  type?: string;
  typeParam?: string;
  typeParams?: typeParams;
  pipe?: ColumnConfigPipe;
  pipeParam?: string;
  tooltip?: string;
  translate?: boolean;
  filterConfig?: FilterConfig<T>;
}

export interface typeParams {
  link: string;
  preLink?: string;
  postLink?: string;
  external?: boolean;
}

export interface FilterConfig<T = any> {
  type: 'category' | 'text' | 'boolean' | 'date' | 'number' | 'percent';
  categories?: { name: string; value: T[keyof T] | null }[];
}
