import express from "express"


const app = express()


const PORT = 8000

app.get("/", (req, res)=>{
    return res.json({message: "Server Started"})
})
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})