import SpinCampaignCard from '@/components/(dashboard)/Scan-Spin/spinCampaignCard';
import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { Box } from '@mantine/core';
import { getCampaigns } from './action/getAllCampaign';

const SpinControl = async () => {
  const { success, records, message } = await getCampaigns(1, 10);

  if (
    !success ||
    records === undefined ||
    records === null ||
    records?.length
  ) {
    return <p>Error: {message ?? 'No campaigns found.'}</p>;
  }

  const firstRecord = records[0];

  const transformedRecord = {
    id: firstRecord.id,
    title: firstRecord.title,
    companyName: firstRecord.companyName,
    companyLogo: firstRecord.companyLogo
      ? {
          url: firstRecord.companyLogo.url,
          name: firstRecord.companyLogo.name,
        }
      : {
          url: '/placeholder.svg',
          name: 'Placeholder Logo',
        },
    deadline: firstRecord.deadline.toISOString(),
    options: firstRecord.options ?? [],
    userLimit: firstRecord.userLimit ?? 0,
    attemptConfiguration: {
      timePeriod: firstRecord.attemptConfiguration?.timePeriod ?? 'daily',
      totalAttempts: firstRecord.attemptConfiguration?.totalAttempts ?? 0,
      attemptsPerPeriod:
        firstRecord.attemptConfiguration?.attemptsPerPeriod || 0,
    },
    createdAt: (firstRecord.createdAt || new Date()).toISOString(),
  };

  return (
    <Box>
      <SpinCampaignCard data={transformedRecord} />
      <SpinDataTable />
    </Box>
  );
};

export default SpinControl;
