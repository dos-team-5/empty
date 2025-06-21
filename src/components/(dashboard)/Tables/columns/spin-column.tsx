import { DataTableColumn } from 'mantine-datatable';
import { SpinnerParticipant } from '@/schema';
import { Badge, Flex, Text } from '@mantine/core';
import React from 'react';

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
    accessor: 'ipAddress',
    title: 'IP Address',
    sortable: true,
    textAlign: 'center',
    render: (data) => <span>{data.ipAddress ?? 'N/A'}</span>,
  },
  {
    accessor: 'lastAttemptAt',
    title: 'Last Attempt',
    textAlign: 'center',
    render: (data) =>
      data.lastAttemptAt
        ? new Date(data.lastAttemptAt).toLocaleDateString()
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
    width: 200,
    sortable: true,
    render: (data) => (
      <Flex justify={'center'} gap={8} wrap={'wrap'}>
        {data.wonPrizes?.length === 0 ? (
          <Text>-</Text>
        ) : (
          data.wonPrizes?.map((prize, i) => (
            <React.Fragment key={i}>
              {prize.coupon === '' ? (
                <Text>-</Text>
              ) : (
                <Badge variant="outline">{prize.coupon}</Badge>
              )}
            </React.Fragment>
          ))
        )}
      </Flex>
    ),
  },
];
