const router = require('express').Router()
const Userdb = require('../users/users-model')
const jwt = require('jsonwebtoken');



router.get('/', (req,res) => {
    res.send('Your in this db')
})



router.post('/register', (req,res) =>{

    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Please enter a username and password' })
    } else {
        const user = req.body;
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Userdb.add(user)
            .then(user => {
                res.status(200).json({ message: `Welcome ${user.username} to the Weightlifting Journal!` })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
})




router.post('/login', (req,res) => {
    let {username, password} = req.body
    
    Userdb.findBy({username})
     .first()
     .then(user => {
         if(user && bcrypt.compareSync(password, user.password)){
             const token = genToken(user)
             res.status(200).json({
                 message: `Welcome to the Weightlifting Journal ${user.username}!`,
                 token: token,
                 user_id: `${user.id}`
             })
         } else {
            res.status(400).json({message: "invalid credentials"})
         }
     })
     .catch(err => {
         res.status(500).json(err)
     })
    
})


function genToken(user){
    const payload = {
        userid: user.id,
        username: user.username
    }

    const options = { expiresIn: "1h" }
    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token
}








module.exports = router;
