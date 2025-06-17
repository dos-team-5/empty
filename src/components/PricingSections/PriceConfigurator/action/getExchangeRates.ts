// app/actions/getExchangeRates.ts
'use server';

export async function getExchangeRates(date: string = 'latest') {
  const version = 'v1'; // you can make this dynamic if needed
  const endpoint = `currencies/usd.json`;

  const primaryUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${version}/${endpoint}`;
  const fallbackUrl = `https://${date}.currency-api.pages.dev/${version}/${endpoint}`;

  try {
    const res = await fetch(primaryUrl, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) throw new Error('Primary source failed');

    const data = await res.json();
    return {
      usdToCad: data?.usd?.cad ?? null,
      date: data?.date ?? date,
      source: 'jsdelivr',
    };
  } catch (primaryError) {
    console.warn('Primary source failed, trying fallback…', primaryError);

    try {
      const resFallback = await fetch(fallbackUrl, {
        next: { revalidate: 3600 },
      });

      if (!resFallback.ok) throw new Error('Fallback also failed');

      const dataFallback = await resFallback.json();

      return {
        usdToCad: dataFallback?.usd?.cad ?? null,
        date: dataFallback?.date ?? date,
        source: 'cloudflare',
      };
    } catch (fallbackError) {
      console.error('Both primary and fallback failed:', fallbackError);

      return {
        usdToCad: null,
        date: null,
        error: true,
        source: null,
      };
    }
  }
}
