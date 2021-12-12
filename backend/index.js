const app = require('./config/app')
const { PORT } = require('./config/env/production')

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT)