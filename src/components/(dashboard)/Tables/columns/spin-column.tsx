import { DataTableColumn } from 'mantine-datatable';
import { SpinnerParticipant } from '@/schema';
import { Badge, Text } from '@mantine/core';

export const userSpinTableColumns: DataTableColumn<SpinnerParticipant>[] = [
  {
    accessor: '',
    title: 'Serial',
    render: (_, index) => <span>{index + 1}</span>,
    textAlign: 'center',
    sortable: true,
  },
  {
    accessor: 'name',
    title: 'Participants',
    textAlign: 'left',
    sortable: true,
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
    accessor: 'periodStart',
    title: 'Period Start',
    textAlign: 'center',
    render: (data) =>
      data.periodStart
        ? new Date(data.periodStart).toLocaleDateString()
        : 'N/A',
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
        {data.wonPrizes?.length === 0 ? (
          <Text>-</Text>
        ) : (
          data.wonPrizes?.map((prize, i) => (
            <Badge variant="outline" key={i}>
              {prize.coupon}
            </Badge>
          ))
        )}
      </>
    ),
  },
];
