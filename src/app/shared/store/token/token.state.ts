import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { TokenModel } from 'src/app/shared/store/token/token.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoginAction } from './actions/login.action';
import { LogoutAction } from './actions/logout.action';
import { tap } from 'rxjs/operators';
import { UpdateUserStatusAction } from './actions/updateUserStatus.action';
import { FetchUserAction } from './actions/fetch-user.action';
import { UserService } from 'src/app/administration/user/user-management/user.service';
import { AdministrationService } from 'src/app/administration/administration.service';

export interface SystemModule {
    id: number;
    name: string;
}

export interface TokenStateModel {
    token: TokenModel;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    isNewUser: boolean;
    globalRoleName: string
    systemModules: SystemModule[];
}

@State<TokenStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        email: null,
        username: null,
        firstname: null,
        lastname: null,
        isNewUser: null,
        globalRoleName: null,
        systemModules: null
    }
})
export class TokenState {
    
    constructor(private authenticationService: AuthenticationService, private store: Store,
                private administrationService: AdministrationService) { }

    @Selector()
    static token(state: TokenStateModel) { return state.token }

    @Selector()
    static isNewUser(state: TokenStateModel) { return state.isNewUser }

    @Selector()
    static userEmail(state: TokenStateModel) { return state.email }

    @Selector()
    static username(state: TokenStateModel) { return state.username }

    @Selector()
    static globalRoleName(state: TokenStateModel) { return state.globalRoleName }

    @Selector()
    static systemModules(state: TokenStateModel) { return state.systemModules } 

    @Action(LoginAction)
    login(ctx: StateContext<TokenStateModel>, action: LoginAction) {
        return this.authenticationService.login(action.model).pipe(tap((data) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                token: data.token,
                email: data.email,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                isNewUser: data.newUser,
                globalRoleName: data.globalRoleName,
                systemModules: data.systemModules
            });
        }));
    }

    @Action(FetchUserAction)
    fetchUser(ctx: StateContext<TokenStateModel>, email: FetchUserAction) {
        const token = this.store.selectSnapshot(TokenState.token);
        return this.administrationService.fetchUser(email.email, token).pipe(tap((data) => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                email: data.email,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                isNewUser: data.newUser,
                globalRoleName: data.globalRoleName,
                systemModules: data.systemModules
            });
        }));
    }

    @Action(LogoutAction)
    logout(ctx: StateContext<TokenStateModel>, action: LogoutAction) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            token: null,
            email: null,
            username: null,
            firstname: null,
            lastname: null,
            isNewUser: null
        });
    }

    @Action(UpdateUserStatusAction)
    updateUserStatus(ctx: StateContext<TokenStateModel>, action: UpdateUserStatusAction) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            isNewUser: action.model
        });
    }

}