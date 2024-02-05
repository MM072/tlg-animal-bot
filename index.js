const express = require("express")
const PORT = process.env.PORT || 4040;
const { handler } = require("./controller")
const fetch = require("node-fetch")
const url = "https://animal-bot-tlg.onrender.com"
const token = process.env.token

const app = express()
app.use(express.json())
app.post("*", async (req, res) => {
    res.send(await handler(req));
});
app.get("*", async (req, res) => {
    res.send(await handler(req))
})

app.listen(PORT, function(err) {
    if(err) console.log(err)
    console.log("Server listening to PORT ", PORT)
})

async function setWebhook(){
    await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${url}`)
}

setWebhook()