import { DataTableColumn } from 'mantine-datatable';
import { SpinnerParticipant } from '@/schema';
import { Badge } from '@mantine/core';

export const userSpinTableColumns: DataTableColumn<SpinnerParticipant>[] = [
  {
    accessor: 'name',
    title: 'Participants',
    textAlign: 'left',
  },
  {
    accessor: 'email',
    title: 'Email',
    sortable: true,
    textAlign: 'center',
  },
  {
    accessor: 'phone',
    title: 'Phone',
    sortable: true,
    textAlign: 'center',
  },
  {
    accessor: 'wins',
    title: 'Wins',
    textAlign: 'center',
    sortable: true,
    render: (data) => <span>{data.wonPrizes?.length ?? 0}</span>,
  },
  {
    accessor: 'wonPrizes',
    title: 'Coupons',
    textAlign: 'center',
    sortable: true,
    render: (data) => (
      <>
        {data.wonPrizes?.map((prize, i) => (
          <Badge variant="outline" key={i}>
            {prize.coupon}
          </Badge>
        ))}
      </>
    ),
  },
];
