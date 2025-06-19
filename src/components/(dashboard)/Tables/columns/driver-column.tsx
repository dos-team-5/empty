import { Driver } from '@/schema';
import { Button } from '@mantine/core';
import { DataTableColumn } from 'mantine-datatable';
import Link from 'next/link';

export const driverTableColumns: DataTableColumn<Driver>[] = [
  {
    accessor: 'fullName',
    title: 'Full Name',
  },
  {
    accessor: 'email',
    title: 'Email Address',
  },
  {
    accessor: 'phone',
    title: 'Phone Number',
  },
  {
    accessor: 'vehiclePhotos',
    title: 'Vehicle Photos (Front & Back)',
    render: ({ vehiclePhotos }) => {
      if (!Array.isArray(vehiclePhotos) || vehiclePhotos.length === 0) {
        return <span className="text-gray-400 italic">No images</span>;
      }

      return vehiclePhotos.map((photo, i) => (
        <Link
          key={i}
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 4 }}
        >
          image {i + 1} ×
        </Link>
      ));
    },
  },
  {
    accessor: ' driversLicense',
    title: "Picture of Driver's License",
    render: ({ driversLicense }) => {
      if (!Array.isArray(driversLicense) || driversLicense.length === 0) {
        return <span className="text-gray-400 italic">No image</span>;
      }

      return driversLicense.map((photo, i) => (
        <Link
          key={i}
          href={photo}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 4 }}
        >
          image {i + 1} ×
        </Link>
      ));
    },
  },

  {
    accessor: 'actions',
    title: '',
    textAlign: 'right',
    render: () => <Button size="sm">View All</Button>,
  },
];
