const express = require('express')
const cors = require('cors')
const Stripe = require('stripe')
const routes = require('./routes/routes')

//Declarar la variable para el servidor web
const app = express()
const stripe = Stripe('sk_test_51POtpgP5BW8DwZz8wEVj6Hhy5WLNVfUkXuLyEdLumV96lH2yTtgIQOsJBAiXB4cjGBDQAHaqYEzRGmASrK8uaeU300rS4RQmCC')

// Middleware
app.use(cors())
app.use(express.json())
app.use('/', routes)
//app.use('api/users', users)

const PORT = process.env.PORT || 3020
app.listen(PORT, ()=> {
    console.log(`Listen Port: ${PORT}`)
})


app.post('/create-checkout-session', async (req, res) => {
const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
    {
        price_data: {
        currency: 'usd',
        product_data: {
            name: 'Producto de prueba',
        },
        unit_amount: 2000, // 20.00 USD
        },
        quantity: 1,
    },
    ],
    mode: 'payment',
    success_url: 'https://localhost:3000/boleto',
    cancel_url: 'https://localhost:3000/Reservar',
});

res.json({ id: session.id });
});

