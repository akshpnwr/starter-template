import { createFileRoute } from '@tanstack/react-router';
import { columns, Payment } from './-components/columns';
import { DataTable } from '@/components/table/client-data-table';

export const Route = createFileRoute('/_auth/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: 'a1b2c3d4',
      amount: 200,
      status: 'completed',
      email: 'jane.doe@example.com',
    },
    {
      id: 'e5f6g7h8',
      amount: 150,
      status: 'failed',
      email: 'john.smith@example.com',
    },
    {
      id: 'i9j0k1l2',
      amount: 300,
      status: 'pending',
      email: 'alice.wonder@example.com',
    },
    {
      id: 'm3n4o5p6',
      amount: 400,
      status: 'completed',
      email: 'bob.builder@example.com',
    },
    {
      id: 'q7r8s9t0',
      amount: 250,
      status: 'failed',
      email: 'charlie.brown@example.com',
    },
    {
      id: 'u1v2w3x4',
      amount: 350,
      status: 'pending',
      email: 'dora.explorer@example.com',
    },
    {
      id: 'y5z6a7b8',
      amount: 500,
      status: 'completed',
      email: 'elmo.red@example.com',
    },
    {
      id: 'c9d0e1f2',
      amount: 450,
      status: 'failed',
      email: 'fred.flintstone@example.com',
    },
    {
      id: 'g3h4i5j6',
      amount: 600,
      status: 'pending',
      email: 'george.jetson@example.com',
    },
    {
      id: 'k7l8m9n0',
      amount: 700,
      status: 'completed',
      email: 'harry.potter@example.com',
    },
    {
      id: 'o1p2q3r4',
      amount: 800,
      status: 'failed',
      email: 'iron.man@example.com',
    },
  ];
  return (
    <div>
      <DataTable searchField="email" columns={columns} data={data} />
    </div>
  );
}
