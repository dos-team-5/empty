'use client';
import { DataTable } from 'mantine-datatable';
import { driverTableColumns } from './columns/driver-column';
import { Driver } from '@/schema';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMediaQuery } from '@mantine/hooks';
import { Card } from '@mantine/core';

const DriverDataTable = ({
  data,
  pagination,
}: {
  data: Driver[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}) => {
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const PAGE_SIZES = [10, 15, 20];
  const pramPageNumber = searchParams.get('page');
  const [page, setPage] = useState(pramPageNumber ? Number(pramPageNumber) : 1);
  const router = useRouter();
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  return (
    <Card p={0} radius="md" withBorder>
      <DataTable
        noRecordsText={''}
        noRecordsIcon={true}
        columns={driverTableColumns}
        records={data}
        defaultColumnProps={{
          titleStyle: {
            backgroundColor: '#FFF5F5',
          },
        }}
        height={isMobile ? 'calc(100dvh - 225px)' : 'calc(100dvh - 210px)'}
        pinLastColumn
        scrollAreaProps={{
          offsetScrollbars: false,
        }}
        totalRecords={pagination.totalCount}
        page={page}
        onPageChange={(page) => {
          setPage(page);
          router.push(`/admin/driver-data?limit=${pageSize}&page=${page}`);
        }}
        recordsPerPage={pageSize}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={(pageSize) => {
          setPageSize(pageSize);
          setPage(1);
          router.push(`/admin/driver-data?page=1&limit=${pageSize}`);
        }}
        recordsPerPageLabel="Showing"

        // onCellClick={({ event, record, index, column, columnIndex }) => {
        //   openModal({
        //     title: 'Cell click information',
        //     children: <DriverInformationCard />,
        //   });
        // }}
      />
    </Card>
  );
};

export default DriverDataTable;
