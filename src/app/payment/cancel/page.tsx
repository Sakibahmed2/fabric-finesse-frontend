"use client";

import PaymentRedirectView from "@/components/ui/Payment/PaymentRedirectView";

const PaymentCancelPage = () => {
    return (
        <PaymentRedirectView
            variant="cancelled"
            title="Payment Cancelled"
            message="Payment was cancelled. You can retry payment from your order list."
        />
    );
};

export default PaymentCancelPage;
