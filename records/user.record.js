const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class UserRecord {
    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;
        this.registered = obj.registered;
        this.last_login = obj.last_login;
    }

    static  async loginCheck(email) {
        const date = new Date();
        let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate()+ "  " + (date.getHours())+ ":" + (date.getMinutes()));
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `email`= :email', {
            email,
        });
        await pool.execute('UPDATE `users` SET `last_login` = :last_login WHERE `email` = :email', {
            email: email,
            last_login: myDate,
        });
        return results;
    }

    async create(hash){
        if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate());
            this.id = uuid();
            this.registered = myDate;
        }
        await pool.execute('INSERT INTO `users` VALUES(:id, :email, :password, :registered, :last_login)', {
            id: this.id,
            email: this.email,
            password: hash,
            registered: this.registered,
            last_login: this.registered,
        });
    }

    static async getOneByEmail(email) {
        const [results] = await pool.execute('SELECT `email` FROM `users` WHERE `email`= :email',{
            email,
        });
        return results;
    }

}

module.exports = {
    UserRecord,
}