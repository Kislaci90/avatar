export type LoginResult = {
    login: TokenView,
}

export type TokenView = {
    token: string,
    expiresIn: number,
}

export type LoginResponse = {
    token: string,
    expiresIn: number,
}

export type GetMeResult = {
    getMe: UserView,
}

export type UserView = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
}

export type RegisterResult = {
    register: RegisterResponse,
}

export type RegisterUserInput = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type RegisterResponse = {
    success: boolean,
    message: string,
    user: UserView,
    loginResponse: LoginResponse,
}