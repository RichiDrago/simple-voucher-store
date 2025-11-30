// Model
import User from "../model/User.model.js";
import Role from "../model/Role.model.js";

export class UserDAL {
    static async getAllUsers() {
        return User.findAll({ include: Role });
    }

    static async findById(id: number) {
        return User.findByPk(id, { include: Role });
    }

    static async findByUsername(username: string) {
        return User.findOne({ where: { username }, include: Role });
    }

    static async createUser(data: {
        username: string;
        password: string;
        privilege_name: string;
    }) {
        return User.create(data);
    }

    static async deleteUser(id: number) {
        return User.destroy({ where: { id } });
    }
}
