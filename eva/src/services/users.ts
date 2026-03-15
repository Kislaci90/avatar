export type LoginResult = {
    login: TokenView,
}

export type RegisterResult = {
    register: TokenView,
}

export type GetMeResult = {
    getMe: UserView,
}

export type TokenView = {
    token: string,
    expiresIn: number,
}

export type UserView = {
    id: number,
    fullName: string,
    email: string,
    username: string,
}