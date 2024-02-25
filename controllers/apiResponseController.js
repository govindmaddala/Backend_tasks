const { databaseConnect } = require('../databases/ConnectDb');
const socket = require('../server');

exports.welcomeMsg = async (req, res, next) => {
    try {
        return res.send({
            nodeMsg: "Message from node server",
        });
    } catch (error) {
        return res.send({

        })
    }
}

exports.userCount = async (req, res, next) => {
    try {
        const db = await databaseConnect("chatApp", "users")
        const allData = await db.collection.find().toArray();
        return res.status(200).send({ userCount: allData.length });
    } catch (error) {
        await socket.ioObject.sockets.emit("usercount", 0);
        return res.send({
            msg: "failed"
        })
    }
}

exports.registerUser = async (req, res, next) => {
    try {
        let query = {
            email: req.body.email
        }
        const db = await databaseConnect("chatApp", "users")
        const insertedData = await db.collection.insertOne(query);
        const allData = await db.collection.find().toArray();
        await socket.ioObject.sockets.emit("usercount", allData.length);
        return res.status(200).send({ insertedData, length: allData.length });
    } catch (error) {
        return res.send({
            msg: "failed"
        })
    }
}

// 
exports.sendMsg = async (req, res, next) => {
    try {
        const db = await databaseConnect("chatApp", "chats")
        const insertedData = await db.collection.insertOne(req.body);
        if (insertedData) {
            await socket.ioObject.sockets.emit("newChat", req.body);
        }
        res.status(200).send({ msg: "msg sent" });
    } catch (error) {
        await socket.ioObject.sockets.emit("usercount", 0);
        return res.send({
            msg: "failed"
        })
    }
}

exports.allMsgs = async(req,res,next)=>{
    try {
        const db = await databaseConnect("chatApp", "chats")
        const allMsgs = await db.collection.find().toArray();
        return res.status(200).send({ allMsgs });
    } catch (error) {
        return res.send({
            msg: "failed"
        })
    }
}


