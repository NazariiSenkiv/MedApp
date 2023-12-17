export interface UserModel {
    id: number
    name: string,
    surname: string,
    userRoleId: number
}

export interface LoginData {
    login: string
    password: string
}