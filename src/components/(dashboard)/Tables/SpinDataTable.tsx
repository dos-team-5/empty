'use client';

import { DataTable } from 'mantine-datatable';
import { userSpinTableColumns } from './columns/spin-column';
import { Card, Text, Flex } from '@mantine/core';
import { SpinnerParticipant } from '@/schema';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

interface SpinDataTableProps {
  data?: {
    records: SpinnerParticipant[];
    pagination: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

const SpinDataTable = ({ data }: SpinDataTableProps) => {
  const hasRecords = data?.records && data.records.length > 0;
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const PAGE_SIZES = [10, 15, 20];
  const pramPageNumber = searchParams.get('page');
  const [page, setPage] = useState(pramPageNumber ? Number(pramPageNumber) : 1);
  const router = useRouter();
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  return (
    <Card mx={{ base: 8, md: 0 }} p={0} withBorder>
      {hasRecords ? (
        <DataTable
          key={'id'}
          columns={userSpinTableColumns}
          records={data.records}
          defaultColumnProps={{
            titleStyle: {
              backgroundColor: '#FFF5F5',
            },
          }}
          height={isMobile ? 'calc(100dvh - 225px)' : 'calc(100dvh - 210px)'}
          scrollAreaProps={{
            offsetScrollbars: false,
          }}
          totalRecords={data.pagination.totalCount}
          page={page}
          onPageChange={(page) => {
            setPage(page);
            router.push(`/admin/spin-control?limit=${pageSize}&page=${page}`);
          }}
          recordsPerPage={pageSize}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={(pageSize) => {
            setPageSize(pageSize);
            setPage(1);
            router.push(`/admin/spin-control?page=1&limit=${pageSize}`);
          }}
          recordsPerPageLabel="Showing"
        />
      ) : (
        <Flex align="center" justify="center" gap={12} py="xl">
          <Icon icon="material-symbols:info-rounded" width={24} height={24} />
          <Text c="dimmed" fw={500}>
            No participants found.
          </Text>
        </Flex>
      )}
    </Card>
  );
};

export default SpinDataTable;
