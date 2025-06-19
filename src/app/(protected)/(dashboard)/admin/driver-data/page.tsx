import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { getDrivers } from './action/getDriversData';

const DriverData = async () => {
  const result = await getDrivers({ page: 1, limit: 20 });
  console.log('Driver Data ==>', result);
  return (
    <div>
      {/* <DriverInformationCard /> */}
      <SpinDataTable />
    </div>
  );
};

export default DriverData;
