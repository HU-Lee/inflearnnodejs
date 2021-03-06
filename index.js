const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require("./config/key");

//application/x-www-form-urlencoded 데이터 파일을 가져올 수 있게
app.use(bodyParser.urlencoded({extended: true}));

//application/json 데이터 파일을 가져올 수 있게
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 새해')
})

app.post('/register', (req,res) => {
    //회원가입 필요 정보
    const user = new User(req.body)

    user.save((err, userInfo) => { //몽고DB 메소드
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})