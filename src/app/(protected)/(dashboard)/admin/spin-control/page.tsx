import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { Box } from '@mantine/core';
import { getAllCampaigns } from './action/getAllCampaign';
import SpinCampaignCard from '@/components/(dashboard)/Scan-Spin/spinCampaignCard';
import { getParticipants } from './action/getParticipants';
import { SpinnerCampaign } from '@/schema';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SpinControl = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const [campaignResponse, participantResponse] = await Promise.all([
    getAllCampaigns(),
    getParticipants(1, page, limit),
  ]);

  const campaign = campaignResponse?.data?.records?.[0];

  return (
    <Box>
      <SpinCampaignCard data={campaign as SpinnerCampaign} />
      <SpinDataTable data={participantResponse.data} id={1} />
    </Box>
  );
};

export default SpinControl;
