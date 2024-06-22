const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();
const {load} = require("nodemon/lib/rules");



const router = express.Router();

// GET POSTS
router.get('/', async(req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).sort({ createdAt: -1 }).toArray());
});


// ADD POSTS
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        title: req.body.title,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        sport: req.body.sport,
        skillLevel: req.body.skillLevel,
        activityType: req.body.activityType,
        location: req.body.location,
        travelDistance: req.body.travelDistance,
        description: req.body.description,
        date: req.body.date,
        createdAt: new Date()
    });
    res.status(201).send();
});


// DELETE POSTS
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
});

// UPDATE POSTS
router.patch('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.updateOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        { $set: {
                title: req.body.title,
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                contact: req.body.contact,
                sport: req.body.sport,
                skillLevel: req.body.skillLevel,
                activityType: req.body.activityType,
                location: req.body.location,
                travelDistance: req.body.travelDistance,
                description: req.body.description,
                date: req.body.date
            }}
    );
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);
}
module.exports = router;