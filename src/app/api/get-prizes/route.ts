export async function GET() {
  try {
    // Here you would fetch prizes from your backend/database
    // Example with your backend API:
    /*
    const response = await fetch('YOUR_BACKEND_URL/api/prizes', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    })
    const prizes = await response.json()
    */

    // Mock data - replace with your backend call
    const prizes = [
      {
        id: '1',
        name: 'Free Coffee',
        couponCode: 'COFFEE2024',
        isWinning: true,
      },
      { id: '2', name: '10% Off', couponCode: 'SAVE10', isWinning: true },
      {
        id: '3',
        name: 'Free Pastry',
        couponCode: 'PASTRY2024',
        isWinning: true,
      },
      { id: '4', name: 'Try Again', couponCode: '', isWinning: false },
      { id: '5', name: 'Free Drink', couponCode: 'DRINK2024', isWinning: true },
      { id: '6', name: 'Better Luck', couponCode: '', isWinning: false },
      { id: '7', name: '20% Off', couponCode: 'SAVE20', isWinning: true },
      { id: '8', name: 'Free Meal', couponCode: 'MEAL2024', isWinning: true },
      { id: '9', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '10', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '11', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '12', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '13', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '14', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '15', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '16', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
      { id: '17', name: 'Free Milk', couponCode: 'MILK2024', isWinning: true },
    ];

    return Response.json(prizes);
  } catch (error) {
    console.error('Failed to get prizes:', error);
    return Response.json({ error: 'Failed to get prizes' }, { status: 500 });
  }
}
