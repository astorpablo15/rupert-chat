const fs = require('fs');
class MessagesService{
    constructor(){}

    async createMesage(data){
        try{
            const messages = await fs.promises.readFile(__dirname + '/messages.json');
            const messagesObject = JSON.parse(messages);
            messagesObject.push(data);
            await fs.promises.writeFile(__dirname + '/messages.json', JSON.stringify(messagesObject, null, 2));  
            return {
                success: true,
                data
            }
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getMessages(){
        try{
            const data = await fs.promises.readFile(__dirname + '/messages.json');
            return {
                success: true,
                data: JSON.parse(data)
            }
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }
};

module.exports = MessagesService;