import { Box } from '@mantine/core';
import { getDrivers } from './action/getDriversData';
import DriverDataTable from '@/components/(dashboard)/Tables/DriverDataTable';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const DriverData = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page;
  const limit = searchParams.limit;
  const result = await getDrivers(Number(page) || 1, Number(limit) || 10);

  console.log(result);
  return (
    <Box mt={{ base: 60, md: 0 }}>
      {/* <DriverInformationCard /> */}
      <DriverDataTable
        data={result.data?.records ?? []}
        pagination={
          result.data?.pagination ?? {
            totalCount: 0,
            totalPages: 0,
            currentPage: 0,
          }
        }
      />
    </Box>
  );
};

export default DriverData;
