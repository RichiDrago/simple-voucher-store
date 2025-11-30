import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Role = db.define("Role", {
    name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    privilege: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

export default Role;
