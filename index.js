const express = require("express")
const PORT = process.env.PORT || 4040;
const { handler } = require("./controller")

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

// https://api.telegram.org/bot<token>/setWebhook?url=<url>
// curl -s -X POST https://api.telegram.org/bot6899370687:AAEfaiUrcDvHKiCG2uNlfL6qzzSoTmNsb3k=/sendMessage \ -F chat_id='-1234567890' -F text='test message'