const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401)
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => res.send('not logged in'))
app.get('/failed', (req,res) => res.send('F for...'))
app.get('/success', isLoggedIn, (req,res) => res.send(`Welcome ${req.user.displayName}`))

app.get('/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/google/callback', 
    passport.authenticate( 'google', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect('/success')
    })


app.get('/logout', (req,res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

app.listen(3000, ()=>console.log('listening on 3000'))

