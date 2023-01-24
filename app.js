const fs = require("fs");
const http = require("http")

function handler(req, res){
    const usersJson = fs.readFileSync("users.json", {encoding: "utf-8"})

    if(req.url === "/users/count"){
        const countUsers = JSON.parse(usersJson).length
        res.end(`${countUsers}`)
    }else if(req.url.startsWith("/users/delete/")){
        const userId = +req.url.split("/").reverse()[0]
        let deletedUserArray = JSON.parse(usersJson).filter(item => item.id !== userId);
        fs.writeFileSync("users.json", JSON.stringify(deletedUserArray),{encoding:"utf-8"})
        res.end("User deleted")
    }
} 

http.createServer(handler).listen(8080);