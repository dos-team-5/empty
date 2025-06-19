import { getDrivers } from './action/getDriversData';
import DriverDataTable from '@/components/(dashboard)/Tables/DriverDataTable';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const DriverData = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page;
  const limit = searchParams.limit;
  const result = await getDrivers({
    page: Number(page),
    limit: limit ? Number(limit) : 10,
  });
  console.log('Driver Data ==>', result);
  return (
    <div>
      {/* <DriverInformationCard /> */}
      <DriverDataTable
        data={result.records}
        pagination={
          result.pagination ?? { totalCount: 0, totalPages: 0, currentPage: 0 }
        }
      />
    </div>
  );
};

export default DriverData;
