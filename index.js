require('dotenv').config();

const express = require("express");
const cors = require('cors')

const millennium = express()
// millennium.listen(3001)

/* Setup express posting and CORS */
millennium.use(express.json())
millennium.use(express.urlencoded({ extended: true }))
millennium.use(cors());

var admin = require("firebase-admin");
const functions = require("firebase-functions")
const { cache_handler } = require("./middleware/cache.js")
const { rate_limit } = require("./middleware/rate-limiter.js")

admin.initializeApp({ 
    credential: admin.credential.cert(require('./credentials/cert.json'))
});

millennium.get("/api/v2/details/:id", cache_handler, async (req, res) => {
    
    const { get_details } = require('./v2/get-details.js')
    get_details(req)
        .then(details => res.json(details))
        .catch(error => res.json({success: false, message: error.toString()}));
})

millennium.get("/api/v2", cache_handler, (_, res) => {

    const { get_featured } = require('./v2/featured.js')
    get_featured()
        .then(details => res.json(details))
        .catch(error => res.json({success: false, message: error.toString()}));
})

millennium.post("/api/v2/update", (req, res) => {

    const { get_update_v2 } = require("./v2/get-update.js")
    get_update_v2(req)
        .then(result => res.json(result))
        .catch(error => res.json({success: false, message: error.toString()}))
})

/* Deprecated */
millennium.post("/api/v2/get-update", cache_handler, (req, res) => {

    const { get_update } = require("./v2/get-update.js")
    get_update(req)
        .then(result => res.json(result))
        .catch(error => res.json({success: false, message: error.toString()}))
})

millennium.post("/api/v2/download", rate_limit, (req, res) => {

    const { download } = require("./v2/download.js")
    download(req)
        .then(result => res.json(result))
        .catch(error => res.json({success: false, message: error.toString()}))
})

millennium.post("/api/v2/checkupdates", cache_handler, async (req, res) => {

    const { check_updates } = require("./v2/check-updates.js")
    check_updates(req)
        .then(result => res.json(result))
        .catch(error => res.json({success: false, message: error.toString()}))
})

exports.api = functions.https.onRequest(millennium)