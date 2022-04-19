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

    async create(userId){
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
            userId,
            taskTitle: this.taskTitle,
            status: this.status
        });
    }
    
    async createInLocalStorage(){
      if (typeof this.id === "undefined") {
            const date = new Date();
            let myDate = (date.getUTCFullYear()) + "/" + (date.getMonth() + 1)+ "/" + (date.getUTCDate());
            this.id = uuid();
            this.status = 'Active'
            this.createdAt = myDate;
        }
        //kod na localStorage
        return console.log('info sie pojawilo, znaczy, że nie jesteś zalogowany, a formularz wyslal dane na serwer do todo.js, a potem do todo.record.js i stworzyl tego consol loga.')
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
      return results
    };

    static async getOneById(id) {
        const [results] = await pool.execute('SELECT * FROM `todos`  WHERE `id` = :id', {
            id,
        });
        return results
    };

    static async getOneByIdAndChangeStatus(id, status) {
        await pool.execute('UPDATE `todos` SET `status` = :status WHERE `id` = :id', {
            id,
            status,
        });
    };

    static  async removeCompletedTasks(userId) {
        await pool.execute('DELETE FROM `todos` WHERE `status` = :status AND `userId`= :userId', {
            status: 'Completed',
            userId
        });
    };

}

module.exports = {
    TodoRecord,
}
