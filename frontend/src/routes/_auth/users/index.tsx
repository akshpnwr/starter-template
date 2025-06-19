import { createFileRoute } from '@tanstack/react-router';
import { columns } from './-components/columns';
import { User, useUserStore } from '@/stores/useUserStore';
import UnauthorizedError from '@/components/unauthorized-error';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { authClient } from '@/lib/auth-client';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { DataTable } from './-components/data-table';

export const Route = createFileRoute('/_auth/users/')({
  component: RouteComponent,
  beforeLoad: () => {
    const state = useUserStore.getState();
    console.log(state);
    // if (!isAdmin()) {
    // throw new Error('Unauthorized');
    // }
  },
  errorComponent: () => <UnauthorizedError />,
});

function RouteComponent() {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, error } = useQuery({
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: pageSize,
          offset: pageIndex * pageSize,
          searchField: 'email',
          searchValue: debouncedSearchTerm, //
        },
      });

      if (error) {
        console.log(error?.message);
        throw new Error(error.message);
      }

      return data;
    },
    queryKey: ['users', pageSize, pageIndex, debouncedSearchTerm],
    placeholderData: keepPreviousData,
  });

  if (error && !data) {
    return <UnauthorizedError />;
  }

  const { users = [], total = 0 } = data || {};
  const pageCount = Math.ceil(total / pageSize);
  return (
    <div>
      <DataTable
        columns={columns}
        data={users as User[]}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        page={{
          pageCount,
          pageIndex,
          setPageIndex,
          pageSize,
          setPageSize,
        }}
      />
    </div>
  );
}
