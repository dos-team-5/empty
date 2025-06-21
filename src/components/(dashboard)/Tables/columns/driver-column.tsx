// driver-column.ts
import { Driver } from '@/schema';
import { Button } from '@mantine/core';
import { DataTableColumn } from 'mantine-datatable';

export const driverTableColumns = ({
  openModal,
  setDriver,
}: {
  openModal: () => void;
  setDriver: (driver: Driver) => void;
}): DataTableColumn<Driver>[] => [
  {
    accessor: 'id',
    title: 'User Id',
    textAlign: 'center',
    sortable: true,
  },
  {
    accessor: 'fullName',
    title: 'Name',
    sortable: true,
  },
  {
    accessor: 'email',
    title: 'Email Address',
    sortable: true,
  },
  {
    accessor: 'cityProvince',
    title: 'City',
    textAlign: 'center',
    sortable: true,
  },
  {
    accessor: 'phone',
    title: 'Phone Number',
    sortable: true,
  },
  {
    accessor: 'vehicleMake',
    title: 'Vehicle Make',
    textAlign: 'center',
    sortable: true,
  },
  {
    accessor: 'vehicleModel',
    title: 'Vehicle Model',
    textAlign: 'center',
    sortable: true,
  },
  {
    accessor: 'createdAt',
    title: 'Create Date',
    textAlign: 'center',
    render: (driver) => new Date(driver.createdAt).toLocaleDateString(),
  },
  {
    accessor: 'actions',
    title: 'Actions',
    textAlign: 'center',
    render: (driver) => (
      <Button
        size="sm"
        onClick={() => {
          setDriver(driver);
          openModal();
        }}
      >
        View
      </Button>
    ),
  },
];
