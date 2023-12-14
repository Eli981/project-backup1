export interface RegisterUser {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface Login {
    username: string,
    email: string,
    password: string
}