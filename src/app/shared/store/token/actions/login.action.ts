import { LoginModel } from '../../../../auth/login/login.model';

export class LoginAction {
    static readonly type = '[Auth] Login';

    constructor(public model: LoginModel) { }
}