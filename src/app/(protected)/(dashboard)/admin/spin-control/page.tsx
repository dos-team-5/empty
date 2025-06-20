import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { Box } from '@mantine/core';
import { getAllCampaigns } from './action/getAllCampaign';
import SpinCampaignCard from '@/components/(dashboard)/Scan-Spin/spinCampaignCard';
import { SpinnerCampaign } from '@/schema';
import { getParticipants } from './action/getParticipants';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SpinControl = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page;
  const limit = searchParams.limit;
  const response = await getAllCampaigns(
    Number(page) || 1,
    Number(limit) || 10
  );
  const campaign = response.data?.records[0];
  const participantResponse = await getParticipants(
    1,
    Number(page) || 1,
    Number(limit) || 10
  );

  return (
    <Box>
      <SpinCampaignCard data={response.data?.records[0] as SpinnerCampaign} />
      <SpinDataTable data={participantResponse.data} />
    </Box>
  );
};

export default SpinControl;
