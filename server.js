const app = require("./app.js")

const PORT = process.env.PORT || 8080

require("dotenv").config();

app.listen(PORT, () => {
    console.log(`Server ${PORT} is live`)
})