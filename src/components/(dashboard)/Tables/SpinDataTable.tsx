'use client';

import { DataTable } from 'mantine-datatable';
import { userSpinTableColumns } from './columns/spin-column';
import { FAKE_USERS } from './data/spin-data';

const SpinDataTable = () => {
  return (
    <DataTable
      noRecordsText={''}
      noRecordsIcon={true}
      columns={userSpinTableColumns}
      records={FAKE_USERS}
      defaultColumnProps={{
        titleStyle: {
          backgroundColor: '#FFF5F5',
        },
      }}
      // onCellClick={({ event, record, index, column, columnIndex }) => {
      //   openModal({
      //     title: 'Cell click information',
      //     children: <DriverInformationCard />,
      //   });
      // }}
    />
  );
};

export default SpinDataTable;
