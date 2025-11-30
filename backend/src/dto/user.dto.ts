// DTO used for update user request
export class UpdateUserDTO {
    username?: string;
    password?: string;
    privilege_name?: string;

    constructor(
        username?: string,
        password?: string,
        privilege_name?: string
    ) {
        if (username) this.username = username;
        if (password) this.password = password;
        if (privilege_name) this.privilege_name = privilege_name;
    }
}

// DTO used for returning user data to the client
export class UserResponseDTO {
    id: number;
    username: string;
    privilege_name: string;
    privilege_level: number;

    constructor(
        id: number,
        username: string,
        privilege_name: string,
        privilege_level: number
    ) {
        this.id = id;
        this.username = username;
        this.privilege_name = privilege_name;
        this.privilege_level = privilege_level;
    }
}
