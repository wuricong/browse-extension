import puppeteer from "puppeteer"
import express from "express"
import cors from "cors"
const app = express()

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET,POST",
}

app.use(cors(corsOptions))

app.get("/", async (req, res) => {
  console.log(req.url, "http://localhost:61111")
  // Launch the browser and open a new blank page.
  const browser = await puppeteer.launch({ headless: false })
  const pages = await browser.pages()
  const page = pages[0]

  // Navigate the page to a URL.
  await page.goto("https://developer.chrome.com/")

  res.send({ a: 1 })
})

app.get("/close/server", async (req, res) => {
  res.send({ sign: "close" })
  quitPortListen()
})

const server = app.listen(61111, () => console.log("Listening on port 61111"))

// 结束端口监听
function quitPortListen() {
  const startTime = new Date().getTime()
  console.log("关闭服务中......")
  server.close(() => {
    const endTime = new Date().getTime() - startTime
    console.log(`关闭服务成功 共耗时${endTime / 1000} s`)
  })
}
