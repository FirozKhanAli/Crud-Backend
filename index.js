const express = require("express")
const path = require("path")
const hbs = require("hbs")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")



const app = express()
const Employee = require("./models/Employee")
const urlEncoder = bodyParser.urlencoded()

app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname + "/views/public")))
hbs.registerPartials(path.join(__dirname, "/views/partials"))

//Api for grtting the all Record

app.get("/", async (req, res) => {
    var data = await Employee.find()
    res.render("index", { data: data })
})

// Api for creating the Record
app.get("/add", (req, res) => {
    res.render("add", { data: "", show: false })
})

//Api for Creating and post the record
app.post("/add", urlEncoder, async (req, res) => {
    try {
        var data = new Employee(req.body)
        await data.save()
        res.redirect("/")
    }
    catch (error) {
        if (error.errors.name)
            res.render("add", { data: data, error: error.errors.name.message, show: true })
        else if (error.errors.email)
            res.render("add", { data: data, error: error.errors.email.message, show: true })
        else if (error.errors.phone)
            res.render("add", { data: data, error: error.errors.phone.message, show: true })
        else if (error.errors.dsg)
            res.render("add", { data: data, error: error.errors.dsg.message, show: true })
        else if (error.errors.salary)
            res.render("add", { data: data, error: error.errors.salary.message, show: true })
        else if (error.errors.city)
            res.render("add", { data: data, error: error.errors.city.message, show: true })
        else if (error.errors.state)
            res.render("add", { data: data, error: error.errors.state.message, show: true })
        else
            res.send("add", { data: data, message: "Internal Server Error", show: true })
    }

})
//Api For deleting the record
app.get("/delete/:_id", async (req, res) => {
    var dat = await Employee.deleteOne({ _id: req.params._id })
    res.redirect("/")
})
//Api For Updating the record

app.get("/update/:_id", async (req, res) => {
    var data = await Employee.findOne({ _id: req.params._id })
    res.render("update", { data: data })
})

//Api for updating the record
app.post("/update/:_id", urlEncoder, async (req, res) => {
    try {
        var data = await Employee.findOne({ _id: req.params._id })
        data.name = req.body.name
        data.email = req.body.email
        data.phone = req.body.phone
        data.dsg = req.body.dsg
        data.salary = req.body.salary
        data.city = req.body.city
        data.state = req.body.state
        await data.save()
        res.redirect("/")
    }
    catch (error) {
        if (error.errors.name)
            res.render("add", { data: data, error: error.errors.name.message, show: true })
        else if (error.errors.email)
            res.render("add", { data: data, error: error.errors.email.message, show: true })
        else if (error.errors.phone)
            res.render("add", { data: data, error: error.errors.phone.message, show: true })
        else if (error.errors.dsg)
            res.render("add", { data: data, error: error.errors.dsg.message, show: true })
        else if (error.errors.salary)
            res.render("add", { data: data, error: error.errors.salary.message, show: true })
        else if (error.errors.city)
            res.render("add", { data: data, error: error.errors.city.message, show: true })
        else if (error.errors.state)
            res.render("add", { data: data, error: error.errors.state.message, show: true })
        else
            res.send("add", { data: data, message: "Internal Server Error", show: true })
    }

})

//Api for searching
app.post("/search",urlEncoder, async(req,res)=>{
try{
    var data=await Employee.find({
        $or:[
            {_id:req.body.search},
            {name:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {email:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {phone:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {dsg:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {city:{$regex:`.*${req.body.search}.*`,$options:"i"}},
            {state:{$regex:`.*${req.body.search}.*`,$options:"i"}}

        ]
    })
    res.render("index",{data:data})
}
catch(error){
    console.log(error);
}
})


const port = 80
app.listen(port, () => console.log(`Server is Running at port http://localhost:${port}`))


mongoose.connect("mongodb://127.0.0.1:27017/Crud3")
    .then(() => {
        console.log("Data Base is Connect");
    })
    .catch((error) => {
        console.log(error);
    })

