'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { driverTableColumns } from './columns/driver-column';
import { Driver } from '@/schema';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Button, Card, Flex, Modal, Text } from '@mantine/core';
import { Icon } from '@iconify/react/dist/iconify.js';
import DriverInfoCard from '../Driver-Data/DriverInfoCard';
import {
  driverColumns,
  flattenDriverData,
} from '@/app/(protected)/(dashboard)/admin/driver-data/excel/excelDriverColumn';
import { exportToExcel } from '@/lib/exportToExcel';

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
  const [opened, { open, close }] = useDisclosure(false);
  const [driverData, setDriverData] = useState<Driver | null>(null);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Driver>>({
    columnAccessor: 'createdAt',
    direction: 'asc',
  });

  const hasRecords = data && data.length > 0;

  //sorting logic
  const sortedRecords = useMemo(() => {
    if (!data) return [];

    const sorted = [...data].sort((a, b) => {
      const { columnAccessor, direction } = sortStatus;

      const valA = a[columnAccessor as keyof Driver];
      const valB = b[columnAccessor as keyof Driver];

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
  }, [data, sortStatus]);

  // handle export to excel
  const handleExport = () => {
    const flatData = flattenDriverData(data); // accepts single or array
    exportToExcel({
      fileName: 'DriverInfo.xlsx',
      sheetName: 'Drivers',
      columns: [...driverColumns], // Create a new mutable array
      data: flatData,
    });
  };

  return (
    <Card mx={{ base: 8, md: 0 }} p={0} radius="md" withBorder>
      {hasRecords ? (
        <Card.Section>
          <Flex
            align={'center'}
            justify="space-between"
            px={{ base: 24, xl: 32 }}
            py={20}
          >
            <Text fz={{ base: 16, md: 20 }} fw={700}>
              Driver Information
            </Text>
            <Button
              onClick={handleExport}
              leftSection={<Icon icon="tdesign:file-pdf" width={16} />}
            >
              Export Document
            </Button>
          </Flex>
          <Card.Section p={32}>
            <DataTable
              mt={8}
              noRecordsText={''}
              noRecordsIcon={true}
              columns={driverTableColumns({
                openModal: open,
                setDriver: setDriverData,
              })}
              records={sortedRecords}
              defaultColumnProps={{
                titleStyle: {
                  backgroundColor: '#FFF5F5',
                },
              }}
              height={
                isMobile ? 'calc(100dvh - 225px)' : 'calc(100dvh - 210px)'
              }
              scrollAreaProps={{
                offsetScrollbars: false,
              }}
              sortStatus={sortStatus}
              totalRecords={pagination.totalCount}
              page={page}
              onPageChange={(page) => {
                setPage(page);
                router.push(
                  `/admin/driver-data?limit=${pageSize}&page=${page}`
                );
              }}
              recordsPerPage={pageSize}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={(pageSize) => {
                setPageSize(pageSize);
                setPage(1);
                router.push(`/admin/driver-data?page=1&limit=${pageSize}`);
              }}
              recordsPerPageLabel="Showing"
              onSortStatusChange={setSortStatus}
              withTableBorder={true}
            />
          </Card.Section>
        </Card.Section>
      ) : (
        <Card.Section>
          <Flex align="center" justify="center" gap={12} py="xl">
            <Icon icon="uiw:file-excel" width={24} height={24} />
            <Text c="dimmed" fw={500}>
              No participants found.
            </Text>
          </Flex>
        </Card.Section>
      )}
      <Modal
        size={'xl'}
        fullScreen
        opened={opened}
        onClose={close}
        title="Driver Information"
      >
        <DriverInfoCard data={driverData ?? ({} as Driver)} />
      </Modal>
    </Card>
  );
};

export default DriverDataTable;
