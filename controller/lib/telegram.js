const { response } = require("express");
const { axiosInstance } = require("./axios");
const fetch = require("node-fetch");

function sendMessage(messageObj, messageText){
    return axiosInstance.get("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
    });
}

async function handleMessage(messageObj) {
    const messageText = messageObj.text || "";

    if(messageText.charAt(0) == "/") {
        const command = messageText.substr(1);
        switch(command){
            case "start":
                return sendMessage(
                    messageObj,
                    "Hi!"
                );
            default:
                return sendMessage(messageObj, "?")
        }
    }else{
        console.log(messageText)
        let data;
        // if(messageObj.photo){
        //     console.log(messageObj)
        //     let photos = []
            // for (let i = 0; i < messageObj.photo.length; i++) {
            //     const res = await fetch(`https://api.telegram.org/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k/getFile?file_id=${messageObj.photo[i].file_id}`)
            //     const d = await res.json()
            //     console.log(d)
            //     const result = d.result.file_path

            //     photos.push(`"image":{"url":https://api.telegram.org/file/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k/${result}},`)
            //     console.log(photos)
            // }

        //     let lastElement = photos[photos.length -1];
        //     lastElement = lastElement.slice(0, -1);
        //     lastElement = lastElement.replace("\'", "");
        //     photos.pop()
        //     photos.push(lastElement)
        //     let img = new Map([photos])
        //     let json = JSON.stringify(Object.fromEntries(img));
        //     console.log(json)

        //     data = {
        //         username: `${messageObj.from.first_name} ${messageObj.from.last_name||""}`,
        //         content: messageObj.caption || " ",
        //         embeds: [JSON.parse(json)]
        //     }
            
        // }else{
        //     data = {
        //         username: `${messageObj.from.first_name} ${messageObj.from.last_name||""}`,
        //         content: messageText || " ",
        //     }
        // }

        if(messageObj.photo){
            for (let i = 0; i < messageObj.photo.length; i++) {
                if(messageObj.photo.length >= 2){
                    const res = await fetch(`https://api.telegram.org/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k/getFile?file_id=${messageObj.photo[messageObj.photo.length - 1].file_id}`)
                    const d = await res.json()
                    const result = d.result.file_path

                    data = {
                        username: `${messageObj.from.first_name} ${messageObj.from.last_name||""}`,
                        embeds:[{
                            "title": messageText || messageObj.caption || " ",
                            "image":{
                                "url": `https://api.telegram.org/file/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k/${result}`
                            }
                        }]
                    }
                    await fetch("https://discord.com/api/webhooks/1203744547738222663/jRKYOYZjbvk3vNczQ6xiEzcY9otHOcksJ4Qa2EpzyLgJLhQbeZgPFQ-Se_rbb2agMtBG", {
                        method: "POST",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify(data)
                    })
                
                    break
                }
                const res = await fetch(`https://api.telegram.org/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k/getFile?file_id=${messageObj.photo[i].file_id}`)
                const d = await res.json()
                const result = d.result.file_path


                data = {
                    username: `${messageObj.from.first_name} ${messageObj.from.last_name||""}`,
                    embeds:[{
                        "title": messageText || messageObj.caption || " ",
                        "image":{
                            "url": `https://api.telegram.org/file/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k/${result}`
                        }
                    }]
                }
                await fetch("https://discord.com/api/webhooks/1203744547738222663/jRKYOYZjbvk3vNczQ6xiEzcY9otHOcksJ4Qa2EpzyLgJLhQbeZgPFQ-Se_rbb2agMtBG", {
                    method: "POST",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(data)
                })
            }

        }else{
            data = {
                username: `${messageObj.from.first_name} ${messageObj.from.last_name||""}`,
                content: messageText || messageObj.caption ||" ",
            }
            await fetch("https://discord.com/api/webhooks/1203744547738222663/jRKYOYZjbvk3vNczQ6xiEzcY9otHOcksJ4Qa2EpzyLgJLhQbeZgPFQ-Se_rbb2agMtBG", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(data)
            })
        }

    }
}

// {
//     update_id: 839266082,
//     message: {
//         message_id: 217,
//         from: {
    //         id: 1086724007,
    //         is_bot: false,
    //         first_name: 'ong pin shun',
    //         username: 'shunpinong',
    //         language_code: 'en'
//         },
//         chat: {
    //         id: -4172380255,
    //         title: 'sb',
    //         type: 'group',
    //         all_members_are_administrators: true
//         },
//         date: 1707065541,
//         text: 'ur mom'
//     }
// }

module.exports = { handleMessage };