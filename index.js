let data = [
    {
      id: 1,
      name: "Jhin",
      line: "bot"
    },
    {
      id: 2,
      name: "Jinx",
      line: "bot"
    },
    {
      id: 3,
      name: "Caitlyn",
      line: "bot"
    },
    {
      id: 4,
      name: "Zoe",
      line: "mid"
    },
    {
      id: 5,
      name: "Xayah",
      line: "bot"
    },
    {
      id: 6,
      name: "Dr. Mundo",
      line: "top"
    },
    {
      id: 7,
      name: "Kalista",
      line: "bot"
    }
  ]
  
  const  express = require("express")
  const logger = require("./loggerMiddleware")
  const cors = require("cors")


  const app = express()

  app.use(cors())
  app.use(express.json())


  app.use(logger)

  app.get("/", (request, response) => {
      response.send("<h1>Hellooooo</h1>")
  })


  app.get("/all", (request, response) => {
    response.json(data)
})


app.get("/one/:id", (request, response) => {
    const id = request.params.id
    notes = data.find((el)=> el.id === id)
    console.log(id)
    
    if (notes) {
        response.json(notes)
    } else {
        response.status(404).end()
    }
    response.json(notes)
})


app.delete("/delete/:id", (request, response) => {
    const id = request.params.id
    data = data.filter((el)=> el.id !== id)
    console.log(id)
    //response.json(notes)

   
    response.status(204).end()
})


app.post("/post/", (request, response) => {
    const note = request.body;
    const id = data.map((el)=> el.id );
    const maxId = Math.max(...id);

    if (!note || !note.content) {
        return response.status(404).json({"error": "Note is missing"})
    }

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note !== "undefined" ? note.important : false,
        date: new Date().toISOString()
    }

    data = [...data, newNote]
    response.json(newNote)
})

app.use((request, response) => {
    response.status(404).json({error:"not-found"})
})



  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => console.log("hello wordddddd from NODE JSS OMGG!!!!"));
                