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

    //public static STRIPE_PK = 'pk_test_51IWOf3A0DJoBf0VzbZR7l3xohneGilLnLoYtjesw2BED5SqjGsV8TZa2Xx9d68RCFlmAN87ErPgQhx9UMT1yrC1400omCjotV3';
    public static STRIPE_PK = 'pk_live_51IWOf3A0DJoBf0VzY3xgx6DmyJKBu1Jdu32HvAxA0QLmjIrYAzF9MAehrqDnJRlTg7fw3u3kkEGUAnHrgqupldL100jciG8fKC'


    public static PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsAjdi8p0adqAiDqtY5VQ
    S6FKjiNPdspE9GceMvoZbvv2eSLiNLBnfAPLe+s7duFLZklMekc5QTzsRtIUu6Em
    tv8t/ZvxXrUf7tKDH2P+jOKyBHp73Z60c7l5j1IMgc/j/GFgY6bVTlSjrmsCuh44
    kO6MXXGfeQ842ffRfBFIHzHNIXMfZK4Afz5gjDJQ9i5quYVoSxWrbNgiren9w1a2
    2QNQWl8dcO9+DEEtQtiu0lH/cDJODWQHNMy58qtsRxJ4SASn2YOD7+NeD2Yos9Ut
    Eui1QkZSrdSDiUGrjzuG+y/OKOOdvxqwOREug0EJj0+6TUMYk15VoCV6iMp5SFUq
    5OPDrkabgQ+X3+mIW7QTDUBbYFM6+Ehy3SEoN84HkJALr0ejLrPrbsKXYyAclYOe
    IeYq3XjH9qVg6H+WUEnMwMQi67wRFCW1qoa4BrLJlS4VvuxTgzuvCcmE53Zj47kh
    7Qk99USi8AoD+HKdhm6pfbcfXPg1avCSK4A0EP8GoS9sFlWZtIN4yB62n2fU0k8h
    ZavuPJ5nU+NIseGTTe2ODYwCg39YGu1d83Jz/qQCuT3bRgWkcMF6o/re9wQDQ4G/
    FhqwzkTDZMrxK+vVCYabolfH8dxXjkWKjgDE3IEGB5+xZM5BzQrIi+JaC0JORIrt
    pVHUU5Y+56jAmUf2w2tnIpECAwEAAQ==
    -----END PUBLIC KEY-----`;

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