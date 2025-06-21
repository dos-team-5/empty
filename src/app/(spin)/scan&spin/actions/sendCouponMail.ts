import { ClaimPrizePayload } from './claimPrize';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function couponMail({ data }: any) {
  console.log('data', data);
  try {
    const app = {
      from: 'contact@emptyad.com',
      to: data.email,
      subject: `Congratulations ${data.email}!`,
      templateName: 'coupon-email',
      templateData: {
        title: 'Your Winning Coupon!',
        description: "You're a winner!",
        couponCode: data.coupon,
        expiryDate: data.expiryDate,
      },
    };
    return app;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendCouponEmail(
  payload: ClaimPrizePayload,
  coupon: string
): Promise<{
  success: boolean;
  message: string;
}> {
  const data = {
    ...payload,
    coupon,
  };
  try {
    const greetingEmailInfo = couponMail({ data });
    if (!greetingEmailInfo) {
      return {
        success: false,
        message: 'Coupon Sending Failed. Please try again or contact support.',
      };
    }
    const greetingResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(greetingEmailInfo),
    });

    const greetingResult = await greetingResponse.json();
    if (!greetingResponse.ok) {
      return {
        success: false,
        message: `Your application was saved, but the greeting email failed to send. Reason: ${greetingResult.error ?? 'Unknown server error'}`,
      };
    }
    return {
      success: true,
      message:
        'Your application was saved and a confirmation email has been sent.',
    };
  } catch (error: any) {
    console.error('Network error sending email:', error);
    return {
      success: false,
      message: `Your application was saved, but the confirmation email failed with a network error: ${error.message}`,
    };
  }
}
