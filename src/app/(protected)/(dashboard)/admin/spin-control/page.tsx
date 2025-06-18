import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { Box } from '@mantine/core';
import { getCampaigns } from './action/getAllCampaign';
import SpinCampaignCard from '@/components/(dashboard)/Scan-Spin/spinCampaignCard';

const SpinControl = async () => {
  const { success, records, message } = await getCampaigns(1, 10);

  console.log('Campaign success ==>', success, records);
  if (!success || records?.length === 0) {
    return <p>Error: {message ?? 'No campaigns found.'}</p>;
  }

  const campaignData = records?.[0];
  console.log('Campaign ==>', campaignData);
  if (!campaignData) {
    return <p>No campaign data available.</p>;
  }

  console.log('Campaign Data:', records);

  return (
    <Box>
      <SpinCampaignCard data={campaignData} />
      <SpinDataTable />
    </Box>
  );
};

export default SpinControl;
