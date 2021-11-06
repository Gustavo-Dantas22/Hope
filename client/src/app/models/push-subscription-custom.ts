export class PushSubscriptionCustom extends PushSubscription {
    payload: PayloadCustom
}

class PayloadCustom {
    title: string;
    description: string;
    image: string;
}