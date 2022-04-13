const {pool} = require('../utils/db');
const {v4: uuid} = require('uuid');

class TodoRecord {
    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.userId = obj.userId;
        this.taskTitle = obj.taskTitle;
        this.status = obj.status;
    }

    async create(){
        if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate());
            this.id = uuid();
            this.status = 'Active'
            this.createdAt = myDate;
        }
        await pool.execute('INSERT INTO `todos` VALUES(:id, :createdAt,:userId, :taskTitle, :status)', {
            id: this.id,
            createdAt: this.createdAt,
            userId: 'this.userId',
            taskTitle: this.taskTitle,
            status: this.status
        });
    }

    static async listAll(userId) {
        const [results] = await pool.execute('SELECT * FROM `todos` WHERE `userId` = :userId', {
          userId,
        });
        return results
    }
    
    static async listAllByStatus(userId, status) {
      const [results] = await pool.execute('SELECT * FROM `todos` WHERE `userId`= :userId AND `status`= :status', {
        userId,
        status,
      });
    };

    static async getOneById(id) {
        const [results] = await pool.execute('SELECT * FROM `todos`  WHERE `id` = :id', {
            id,
        });
        return results
    };

    static async getOneByIdAndChangeStatus(id) {
        if (this.status === 'Active') {
            this.status = 'Completed'
        } else {
            this.status = 'Active'
        }
        await pool.execute('UPDATE `todos` SET `status` = :status WHERE `id` = :id', {
            id: id,
            status: this.status,
        });
    };

}

module.exports = {
    TodoRecord,
}
