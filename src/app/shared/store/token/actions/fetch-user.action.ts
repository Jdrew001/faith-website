

export class FetchUserAction {
    static readonly type = '[Auth] FetchUser';

    constructor(public email: string) { }
}