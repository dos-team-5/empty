'use client';

import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { userSpinTableColumns } from './columns/spin-column';
import { Card, Text, Flex, Button, Box } from '@mantine/core';
import { SpinnerParticipant } from '@/schema';
import { Icon } from '@iconify/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  flattenCampaignAttemptData,
  spinCampaignAttemptColumns,
} from '@/app/(protected)/(dashboard)/admin/spin-control/excel/spinDataExcelColumn';
import { exportToExcel } from '@/lib/exportToExcel';

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

  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<SpinnerParticipant>
  >({
    columnAccessor: 'name',
    direction: 'asc',
  });

  // Sorting logic
  const sortedRecords = useMemo(() => {
    if (!data?.records) return [];

    const sorted = [...data.records].sort((a, b) => {
      const { columnAccessor, direction } = sortStatus;

      const valA = a[columnAccessor as keyof SpinnerParticipant];
      const valB = b[columnAccessor as keyof SpinnerParticipant];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });

    return sorted;
  }, [data?.records, sortStatus]);

  //export to Excel

  const handleExport = () =>
    exportToExcel({
      fileName: 'campaign_attempts.xlsx',
      sheetName: 'Attempts',
      columns: [...spinCampaignAttemptColumns],
      data: flattenCampaignAttemptData(data?.records ?? []), // use your actual data variable
    });

  return (
    <Card mx={{ base: 8, md: 0 }} p={0} withBorder>
      {hasRecords ? (
        <Box>
          <Flex
            align={'center'}
            justify="space-between"
            px={{ base: 24, xl: 32 }}
            py={20}
          >
            <Text fz={{ base: 16, md: 20 }} fw={700}>
              Spin Campaigns
            </Text>
            <Button
              onClick={handleExport}
              leftSection={<Icon icon="uiw:file-excel" width={16} />}
            >
              Export Document
            </Button>
          </Flex>
          <DataTable
            key="datatable"
            columns={userSpinTableColumns}
            records={sortedRecords}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
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
        </Box>
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
