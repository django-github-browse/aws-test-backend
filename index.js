const express = require("express")
const app = express()
const { createProxyMiddleware } = require("http-proxy-middleware")

const rateLimit = require("express-rate-limit")
require("dotenv").config()
//const url = require("url")

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})

app.use(limiter)

app.get("/",(req,res) => {
    //const params = url.parse(req.url).query
    //console.log(params)
    res.send("This is my proxy server")
})

app.use("/corona-tracker-world-data",(req,res,next) => {
    createProxyMiddleware({
        target: process.env.BASE_API_URL_CORONA_WORLD,
        changeOrigin: true,
        pathRewrite: {[`^/corona-tracker-world-data`]: "",},
    })(req,res,next)
})

app.use("/aws-test-backend",(req,res,next) => {
    createProxyMiddleware({
        target: process.env.BASE_API_URL_AWS_TEST_BACKEND,
        changeOrigin: true,
        pathRewrite: {[`^/aws-test-backend`]: "",},
    })(req,res,next)
})

app.use("/react-backend-test1",(req,res,next) => {
    createProxyMiddleware({
        target: process.env.BASE_API_URL_REACT_BACKEND_TEST1,
        changeOrigin: true,
        pathRewrite: {[`^/react-backend-test1`]: "",},
    })(req,res,next)
})

const port = process.env.PORT || 5050
app.listen(port,() => {
    console.log(`Listening on localhost port ${port}`)
})

module.exports = app