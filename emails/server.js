import 'dotenv/config'
import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import model from './model.js'
import emailModel from "./email.js"
import { z } from "zod"

mongoose.connect(process.env.DB_URL).then(() => console.log("Connedcted to DB")).catch(() => {
  console.log("Cannot connect to DB")
  process.exit(1)
})

const emailSch = z.object({ email: z.email() })

const app = express()
app.use(express.json())
app.use(cors())
app.set('trust proxy', true);

app.get("/", (req, res) => {
  const ip = req.ip
  res.json({ message: "echo hello world", ip: ip })
})

app.get("/stats/:section", async (req, res) => {
  const section = req.params.section
  const ip = req.ip
  if (section == "") {
    return res.status(400).json({ message: "params not found" })
  }
  const message = await user({ ip, section })
  if (message == null) {
    return res.json({ message: "welcome" })
  }
  return res.status(400).json({ message: "something went wrong" })
})

app.post("/email", async (req, res) => {
  const val = emailSch.safeParse(req.body)
  if (val.success == false) {
    return res.status(400).json({ message: "invalid body" })
  }
  const email = val.data.email
  const newEmail = new emailModel({ email: email })
  await newEmail.save()
  return res.json({ message: "email success" })
})


app.listen(8000, () => console.log("Server on port 8000"))

async function user({ ip, section }) {
  const myUser = await model.findOne({ ip: ip })
  if (myUser == null) {
    if (section == "hero") {
      const newUser = new model({ ip, hero: true })
      await newUser.save()
      return
    }
    if (section == "talk") {
      const newUser = new model({ ip, talk: true })
      await newUser.save()
      return
    }
    if (section == "contact") {
      const newUser = new model({ ip, contact: true })
      await newUser.save()
      return
    }
    if (section == "click") {
      const newUser = new model({ ip, click: true })
      await newUser.save()
      return
    }
    return "Something went wrong"
  }
  if (section == "hero") {
    await model.updateOne({ ip: ip }, { hero: true })
    return
  }
  if (section == "talk") {
    await model.updateOne({ ip: ip }, { talk: true })
    return
  }
  if (section == "contact") {
    await model.updateOne({ ip: ip }, { contact: true })
    return
  }
  if (section == "click") {
    await model.updateOne({ ip: ip }, { click: true })
    return
  }
  return "Something went wrong"
}
