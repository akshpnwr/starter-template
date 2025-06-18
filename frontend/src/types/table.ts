import { ColumnDef, VisibilityState } from '@tanstack/react-table';
import { ReactNode } from 'react';

export interface DataTablePropsWithPagination<TData, TValue>
  extends DataTableProps<TData, TValue> {
  page: Pagination;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchField?: string;
  children?: ReactNode;
  hiddenColumns?: VisibilityState;
}

export type Pagination = {
  pageSize: number;
  pageCount: number;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  setPageSize: (index: number) => void;
};
