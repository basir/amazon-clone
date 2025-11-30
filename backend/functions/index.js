const { onInit, setGlobalOptions } = require("firebase-functions");
const { onRequest, onCall, HttpsError } = require("firebase-functions/https");
const { defineString } = require('firebase-functions/params');
const logger = require("firebase-functions/logger");
const STRIPE_SECRET_KEY = defineString('STRIPE_SECRET_KEY');
const Stripe = require('stripe');

let stripe;

setGlobalOptions({ maxInstances: 10 });

onInit(() => {
    stripe = new Stripe(STRIPE_SECRET_KEY.value());
});


exports.createPaymentIntent = onCall(async (request) => {
    const { amount, currency = "usd" } = request.data;
    if (!amount || amount <= 0) {
        throw new HttpsError("invalid-argument", "The function must be called with a positive amount.");
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
        };
    } catch (error) {
        logger.error("Error creating payment intent:", error);
        throw new HttpsError("internal", error.message);
    }
});
