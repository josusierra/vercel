export interface PersonaLoginResponse {
    message: string;
    userId: string;
}
export interface PersonaLogin {
    email: string;
    password: string;
}

export interface PersonaRegister {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
}
