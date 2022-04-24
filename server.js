const express = require("express");
const cors = require("cors");
const app = express();
const models = require('./models')
const port = 8080;

app.use(express.json());
app.use(cors());
app.get("/products",(req,res) => {
    const query = req.query;
    models.Products.findAll().then((result)=>{
        console.log("Products:" ,result);
        res.send({
            products : result
        }).catch((error) =>{
            console.log("error : ",error);
            res.send(error);
        })
    })
    // console.log("QUERY : ",query);
    // res.send({
    //     "product":[{
    //         "id" : 1,
    //         "name": "Basket Ball",
    //         "price": 100000,
    //         "seller": "Jorden",
    //         "imageUrl": "./img/products/basketball1.jpeg"
    //     },
    //         {
    //             "id" : 2,
    //             "name": "Soccer Ball",
    //             "price": 50000,
    //             "seller": "Messi",
    //             "imageUrl": "./img/products/soccerball1.jpg"
    //         },
    //         {
    //             "id":3,
    //             "name": "Keyboard",
    //             "price": 10000,
    //             "seller": "grab",
    //             "imageUrl": "./img/products/keyboard1.jpg"
    //         }
    //
    //     ]
    // })
})

app.post("/products",(req,res) => {
    const body = req.body;
    const {name,description,price,seller} = body;
    if(!name||!description||!price||!seller){
        res.send("fill all field")

    }
    models.Products.create({
       name,
        description,
       price,
       seller
    }).then((result)=>{
        console.log("upload success");
        res.send({
            result
        });
    }).catch((error) =>{
        console.error(`error : ${error}`);
        res.send("uploading is error")
    });
})
app.get("/products/:id/events/:eventId", (req, res) => {
    const params = req.params;
    const {id, eventId} = params;
    res.send(`id : ${id}, event : ${eventId}`)
})
app.listen(port,() => {
    console.log("server moving")
    models.sequelize.sync().then((result)=>{
        console.log("DB conneted")
    }).catch((error) => {
        console.log("error : ", error);
        process.exit();
    })
});
