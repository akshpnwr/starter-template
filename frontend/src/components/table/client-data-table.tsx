'use client';

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { DataTableProps } from '@/types/table';
import Pagination from '@/components/table/pagination';
import TableComponent from '@/components/table/table-component';
import ViewColumnFilter from '@/components/table/view-column-filter';

export function DataTable<TData, TValue>({
  columns,
  data,
  searchField,
  children,
  hiddenColumns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    hiddenColumns || {},
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2 py-4 pt-2 mobile:flex-col">
        {searchField && (
          <div className="group relative w-full flex-grow focus-within:text-gray-900">
            <Input
              placeholder={`Search...`}
              value={
                (table.getColumn(searchField)?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn(searchField)?.setFilterValue(event.target.value)
              }
              className="w-full pl-10 md:max-w-96"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 group-focus-within:text-gray-900"
              size={18}
            />
          </div>
        )}
        {children}
        <ViewColumnFilter table={table} />
      </div>
      <div className="rounded-md border">
        <TableComponent table={table} />
      </div>
      <Pagination
        pageSize={table.getState().pagination.pageSize}
        setPageSize={table.setPageSize}
        pageCount={table.getPageCount()}
        pageIndex={table.getState().pagination.pageIndex}
        setPageIndex={table.setPageIndex}
      />
    </div>
  );
}
