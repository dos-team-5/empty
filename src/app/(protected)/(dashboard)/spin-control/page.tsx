import SpinCampaignCard from '@/components/(dashboard)/Scan-Spin/spinCampaignCard';
import SpinDataTable from '@/components/(dashboard)/Tables/SpinDataTable';
import { Box } from '@mantine/core';

const SpinControl = async () => {
  return (
    <Box>
      <SpinCampaignCard />
      <SpinDataTable />
    </Box>
  );
};

export default SpinControl;
