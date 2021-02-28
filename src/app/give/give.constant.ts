export class GiveConstants {
    public static GIVE_BG_URL = 'images/ONLINE.jpg';

    public static OFFERING_CATEGORIES =  [
        {value: 'General Offering', label: 'General Offering', disabled: false},
        {value: 'S. S. Offering', label: 'S. S. Offering', disabled: false},
        {value: 'Building Fund', label: 'Building Fund', disabled: false},
        {value: 'Foreign Missions', label: 'Foreign Missions', disabled: false},
        {value: 'Home Missions', label: 'Home Missions', disabled: false},
        {value: 'Youth Ministry', label: 'Youth Ministry',disabled: false},
        {value: 'Other', label: 'Other', disabled: false }
    ];

    public static PAY_PAL_TOKEN_URL = 'v1/oauth2/token';
    public static PAY_PAL_CREATE_ORDER = 'v2/checkout/orders';
    public static PAY_INFO = {
        accountId: 'Faithtabernacleupcarlington@gmail.com',
        clientId: 'AWgqhhwB9E_o33gvuBwyvgY0FYvbvx8VJbZO-rwvSaZNvlJGuH7bUDRC6M0YNX8oWpDTlfGnYIDnMQ8G',
        secret: 'EBaX5AIeESnOlfMAdmnRyTKYX-jVX_5m0CQ7mzdE1zOcIO34tsrSb05MUAV4wF0u5KGpsD838ZmFTK-s'
    };

    // public static PAY_INFO = {
    //     sandboxId: 'sb-vvvtj1278390@business.example.com',
    //     clientId: 'AWPG1i2JEj07tk8JUnfEn5gpxHHbZdDHxxdPBPKJZBj-3HMeREOjAk0ycL4I1Nb_3qDbPvlHJOaIkVVs',
    //     secret: 'EAbi9Z_3GOETQFOUnVs0VDPY1GLfEZp70Fxbw1FIkCSngSynkfWbC9dvDULA8auFB-zYyWyWFySxWeck'
    // };

    public static RATE_FEE = {
        rate: 0.022,
        cost: 0.30
    };

    public static INTENT = 'CAPTURE';
    public static CURRENCY_CODE = 'USD';
    public static PHONE_TYPE: 'MOBILE';
    public static BRAND_NAME = 'Faith Tabernacle Arlington';
    public static SHIPPING_PREFERENCE = 'NO_SHIPPING';
    public static USER_ACTION = 'PAY_NOW';
    public static BILLING = 'LOGIN';

    public static COMPLETED = 'COMPLETED';
} 