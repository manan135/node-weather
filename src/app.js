const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

// app.use(express.static());
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: "Home Page"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Center",
        msg: "We are here to help, please contact +91-9876443434"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Manan Singla"
    });
})

app.get('/products', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "Please provide a location"
        })
    }

    forecast(req.query.location, (err, data) => {
        if (err) {
            return res.send({
                error: err
            })
        } else {
            res.send(data);
        }
    });

})

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: "Error",
//         msg: "Help Page doesn't exist",
//         code: "4042"
//     });
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: "Error",
//         msg: "Page doesn't exist",
//         code: "4041"
//     });
// })

app.listen(3000, () => {
    console.log("Server started");
});