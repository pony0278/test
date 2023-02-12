const express = require('express')
const handlebars = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const nStatic = require('node-static');
const app = express()
const port = 3000
app.use(express.static('public'))


app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
    res.render('index', { restaurant: restaurantList.results })
  })

app.get('/restaurant/:restaurant_id', (req, res) => {  
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )  
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ? restaurant.name.toLowerCase().includes(keyword.toLowerCase()) : restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurant ,  keyword: keyword})
})

app.listen(port , ()=>{
    console.log(`is okok`)
})