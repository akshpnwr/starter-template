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

import { Plus, Search } from 'lucide-react';
import { DataTablePropsWithPagination } from '@/types/table';
import Pagination from '@/components/table/pagination';
import TableComponent from '@/components/table/table-component';
import ViewColumnFilter from '@/components/table/view-column-filter';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  searchTerm,
  setSearchTerm,
}: DataTablePropsWithPagination<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    pageCount: page.pageCount,
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
      pagination: {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      },
    },
    manualPagination: true,
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-2 py-4 pt-2 mobile:flex-col">
        <div className="group relative w-full flex-grow focus-within:text-gray-900">
          <Input
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="w-full pl-10 md:max-w-96"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 group-focus-within:text-gray-900"
            size={18}
          />
        </div>
        <Button className="max-w-24" variant={'default'} asChild>
          <Link to="/add-user" className="w-full">
            <Plus className="h-4 w-4" />
            Add
          </Link>
        </Button>
        <ViewColumnFilter table={table} />
      </div>
      <TableComponent table={table} />
      <Pagination
        pageSize={page.pageSize}
        pageCount={page.pageCount}
        pageIndex={page.pageIndex}
        setPageIndex={page.setPageIndex}
        setPageSize={page.setPageSize}
      />
    </div>
  );
}
