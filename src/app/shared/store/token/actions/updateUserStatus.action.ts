export class UpdateUserStatusAction {
    static readonly type = '[Auth] UpdateUserStatus';

    constructor(public model: boolean) { }
}