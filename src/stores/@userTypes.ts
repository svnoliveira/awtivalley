
export type TToken = {
    refresh: string;
    access: string;
}

export interface IUserCreate{
    username: string,
	email: string,
	name: string,
	password: string,
	is_superuser?: boolean
}

export interface IUser{
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    is_superuser: boolean;
};

export interface IUserData{
    accessToken: string;
    user: IUser;
};

export interface IUserState {
    userData: IUserData | null;
    loading: boolean
    setLoading: (boolean: boolean) => void
    logoutUser: () => void
    loginUser: ({ username, password }: {
        username: string;
        password: string;
    }) => Promise<true | undefined>
    loadUser: () => Promise<void>
    registerUser: (userData:IUserCreate) => Promise<boolean | undefined>
}