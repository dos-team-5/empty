import { SpinnerParticipant } from '@/schema';

export const flattenCampaignAttemptData = (data: SpinnerParticipant[]) => {
  return data.map((item, index) => ({
    serial: index + 1,
    name: item.name,
    email: item.email,
    phone: item.phone,
    ipAddress: item.ipAddress,
    campaignId: item.campaignId,
    totalAttempts: item.totalAttempts,
    periodAttempts: item.periodAttempts,
    periodStart: item.periodStart
      ? new Date(item.periodStart).toLocaleString()
      : null,
    lastAttemptAt: item.lastAttemptAt
      ? new Date(item.lastAttemptAt).toLocaleString()
      : null,
    wonPrizes: (item.wonPrizes ?? []).length
      ? (item.wonPrizes as NonNullable<typeof item.wonPrizes>)
          .map((p) => ` ${p.label} (Coupon: ${p.coupon}, Ratio: ${p.ratio}%)`)
          .join('; ')
      : '—',
  }));
};

export const spinCampaignAttemptColumns = [
  { header: 'S/N', key: 'serial', width: 10 },
  { header: 'Name', key: 'name', width: 25 },
  { header: 'Email', key: 'email', width: 30 },
  { header: 'Phone', key: 'phone', width: 20 },
  { header: 'IP Address', key: 'ipAddress', width: 30 },
  { header: 'Campaign ID', key: 'campaignId', width: 15 },
  { header: 'Total Attempts', key: 'totalAttempts', width: 15 },
  { header: 'Period Attempts', key: 'periodAttempts', width: 15 },
  { header: 'Period Start', key: 'periodStart', width: 20 },
  { header: 'Last Attempt At', key: 'lastAttemptAt', width: 20 },
  { header: 'Won Prizes', key: 'wonPrizes', width: 50 },
] as const;
