
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

export type RegisterUserInput = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}