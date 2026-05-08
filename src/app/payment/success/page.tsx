"use client";

import PaymentRedirectView from "@/components/ui/Payment/PaymentRedirectView";

const PaymentSuccessPage = () => {
    return (
        <PaymentRedirectView
            variant="success"
            title="Payment Successful"
            message="Your payment was completed successfully."
            clearCartOnMount
        />
    );
};

export default PaymentSuccessPage;
