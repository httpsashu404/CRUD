const express = require('express')
const app = express()
const path = require('path')

// create unique id automatic
const { v4: uuidv4 } = require('uuid')

// use to override data method
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// port no set
const PORT = 5000

//  Read hidden url data
app.use(express.urlencoded({ extended: true }))

// access ejs files
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// access public files
app.use(express.static(path.join(__dirname, 'public')))

// employee data
let emp = [
    {
        id: uuidv4(),
        name: "Ashutosh Kumar",
        tel: 7763992074,
        add: "Sasaram",
        deprt: "Web developer",
        salary: 42000
    },
    {
        id: uuidv4(),
        name: "Pankaj Gupta",
        tel: 6203454484,
        add: "Gopalpur",
        deprt: "S/F Engineer",
        salary: 56000
    },
    {
        id: uuidv4(),
        name: "Rishav Singh",
        tel: 8271973256,
        add: "Patna",
        deprt: "Assi. Professor",
        salary: 45000
    },
    {
        id: uuidv4(),
        name: "Aditya Singh",
        tel: 8084018281,
        add: "Delhi",
        deprt: "HR Manager",
        salary: 35000
    }
]

//  view all records APIs
app.get('/emp', (req, res) => {
    res.render('index', { emp })
})

// get new employee data APIs
app.get('/emp/new', (req, res) => {
    res.render('new')
})

// add new employee APIs
app.post('/emp', (req, res) => {
    let { name, tel, add, deprt, salary } = req.body
    let id = uuidv4()
    emp.push({ id, name, tel, add, deprt, salary })
    res.redirect('/emp')
})

// show single data APIs
app.get('/emp/:id', (req, res) => {
    let { id } = req.params
    let emply = emp.find((p) => id === p.id)
    res.render('show', { emply })
})

// update form APIs
app.get('/emp/:id/edit', (req, res) => {
    let { id } = req.params
    let gemp = emp.find((p) => id === p.id)
    res.render('edit', { gemp })
})

// edit employee data APIs
// app.patch('/emp/:id', (req, res) => {        we can also this use
app.put('/emp/:id', (req, res) => {
    let { id } = req.params
    let ntel = req.body.tel
    let nadd = req.body.add
    let ndeprt = req.body.deprt
    let nsalary = req.body.salary
    let gemp = emp.find((p) => id === p.id)
    gemp.tel = ntel
    gemp.add = nadd
    gemp.deprt = ndeprt
    gemp.salary = nsalary
    res.redirect('/emp/')
})

// delete epmloyee APIs 
// method-I
// app.delete('/emp/:id', (req, res) => {
//     let { id } = req.params
//     emp = emp.filter((p) => id !== p.id)
//     res.redirect('http://localhost:5000/emp/')
// })

// method-II
app.get('/emp/:id/delete', (req, res) => {
    let { id } = req.params
    let gemp = emp.find((p) => id === p.id)
    emp = emp.filter((p) => id !== p.id)
    res.redirect('/emp/')
})

app.listen(PORT, () => {
    console.log(`Server has started on PORT : ${PORT}`)
})