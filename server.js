const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '/index.html')
// })

app.get('/img', (request, response) => {
    const imgPath = path.join(__dirname, 'public')
    const category = request.query.category || 'default'
    const categoryPath = path.join(imgPath, category)
    console.log(category, categoryPath)

    fs.readdir(imgPath, (err, files) => {
        if (err) {
            console.error(err)
            response.status(500).send('Error reading image directory')
            return
        }

        if (files.length === 0) {
            response.status(404).send('No images found')
            return
        }

        const count = files.length
        const num = Math.floor(Math.random() * count)
        const randomImg = files[num]

        response.json({ 
            imgUrl: `${randomImg}`,
            imgNum: num + 1,
            total: count
        })
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})