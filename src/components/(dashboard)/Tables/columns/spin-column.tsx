import { DataTableColumn } from 'mantine-datatable';
import { SpinnerParticipant } from '@/schema';

export const userSpinTableColumns: DataTableColumn<SpinnerParticipant>[] = [
  {
    accessor: 'id',
    title: 'ID',
    textAlign: 'right',
  },
  {
    accessor: 'serial',
    title: 'Serial',
    sortable: true,
  },
  {
    accessor: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    accessor: 'wins',
    title: 'Wins',
    textAlign: 'center',
    sortable: true,
  },
  {
    accessor: 'email',
    title: 'Email',
    sortable: true,
  },
  {
    accessor: 'ip',
    title: 'IP Address',
    sortable: true,
  },
];
