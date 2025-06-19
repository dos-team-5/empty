import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { Box } from '@mantine/core';
import { getAllCampaigns } from './action/getAllCampaign';
import SpinCampaignCard from '@/components/(dashboard)/Scan-Spin/spinCampaignCard';
import { SpinnerCampaign } from '@/schema';
import { getParticipants } from './action/getParticipants';

const SpinControl = async () => {
  const response = await getAllCampaigns(1, 10);
  const campaign = response.data?.records[0];
  const participantResponse = await getParticipants(campaign?.id as number);

  console.log('All Campaigns ==>', response.data?.records);

  console.log('Participant Response ==>', participantResponse);

  return (
    <Box>
      <SpinCampaignCard data={response.data?.records[0] as SpinnerCampaign} />
      <SpinDataTable />
    </Box>
  );
};

export default SpinControl;
