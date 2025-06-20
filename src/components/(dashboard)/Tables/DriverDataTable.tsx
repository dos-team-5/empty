'use client';
import { DataTable } from 'mantine-datatable';
import { driverTableColumns } from './columns/driver-column';
import { Driver } from '@/schema';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Button, Card, Flex, Modal, Text } from '@mantine/core';
import { Icon } from '@iconify/react/dist/iconify.js';
import DriverInfoCard from '../Driver-Data/DriverInfoCard';

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

  const hasRecords = data && data.length > 0;

  console.log('Driver Data ==>', driverData);

  return (
    <Card radius="md" withBorder>
      {hasRecords ? (
        <Card.Section>
          <Flex align={'center'} justify="space-between" px={32} py={20}>
            <Text fz={20} fw={700}>
              Driver Information
            </Text>
            <Button leftSection={<Icon icon="tdesign:file-pdf" width={16} />}>
              Pdf Download
            </Button>
          </Flex>
          <DataTable
            mt={8}
            noRecordsText={''}
            noRecordsIcon={true}
            columns={driverTableColumns({
              openModal: open,
              setDriver: setDriverData,
            })}
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
          />
        </Card.Section>
      ) : (
        <Card.Section>
          <Flex align="center" justify="center" gap={12} py="xl">
            <Icon icon="material-symbols:info-rounded" width={24} height={24} />
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
