// DTO used for user registration requests
export class RegisterAuthDTO {
    username!: string;
    password!: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

// DTO used for user login requests
export class LoginAuthDTO {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

// DTO used for returning user data to the client
export class AuthResponseDTO {
    jwtToken!: string;

    constructor(jwtToken: string) {
        this.jwtToken = jwtToken;
    }
}
