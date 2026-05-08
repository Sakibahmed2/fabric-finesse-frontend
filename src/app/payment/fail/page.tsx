"use client";

import PaymentRedirectView from "@/components/ui/Payment/PaymentRedirectView";

const PaymentFailPage = () => {
    return (
        <PaymentRedirectView
            variant="failed"
            title="Payment Failed"
            message="We could not complete your payment. You can try again from your order page."
        />
    );
};

export default PaymentFailPage;
