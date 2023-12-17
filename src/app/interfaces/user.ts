export interface UserModel {
    id: number
    name: string,
    surname: string,
    userRoleId: number
    iconURL: string
}

export interface LoginData {
    login: string
    password: string
}