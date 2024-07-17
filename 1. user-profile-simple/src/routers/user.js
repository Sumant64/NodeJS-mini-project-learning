const express = require('express');
const User = require('../models/user');

const router = new express.Router();


router.get('/users', async(req, res) => {
    try{
        let result = await User.find({});
        res.status(200).send({result});
    } catch (err) {
        console.log(err);
        res.status(400).send({err});
    }
})

router.get('/user/:id', async(req, res) => {
    try{
        let id = req.params.id;
        let result = await User.findById(id);
        if(result) {
            res.status(200).send({result});
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({err});
    }
})

//pagination
// filter?page=1&row-per-page=10
router.get('/pagination', async(req, res) => {
    try{
        let pageNo = parseInt(req.query.page);
        let rowPerPage = parseInt(req.query['row-per-page'])
        let skip = pageNo * rowPerPage - rowPerPage
        let result = await User.find({}).limit(rowPerPage).skip(skip)

        if(result) {
            res.status(200).send({result})
        } else {
            res.status(404).send({message: 'No data found'})
        }

    } catch(err) {
        console.log(err);
    }
})

// pagination + search string => search by name, hobbies, education.university(any string field)
// pagesearch?page=1&row-per-page=10&search=string
router.get('/pagesearch', async (req, res) => {
    try{
        let pageNo = parseInt(req.query.page);
        let rowPerPage = parseInt(req.query['row-per-page'])
        let skip = pageNo * rowPerPage - rowPerPage
        let search = req.query.search && req.query.search.toString();
        let result;

        if(search) {
            result = await User.find({
                $or: [
                    {name: { $regex: search, $options: 'i' }}, 
                    {hobbies: { $elemMatch: { $regex: search, $options: 'i' } }},
                    {"education.university": { $regex: search, $options: 'i' }}
                ]
            }).limit(rowPerPage).skip(skip)

        }else{  
            result = await User.find({}).limit(rowPerPage).skip(skip)
        }

        res.status(200).send({result})

    } catch(err) {
        console.log(err);
        res.status(400).send({error: 'Something went wrong'});
    }
})

router.post('/user', async(req, res) => {
    try{
        const keys = Object.keys(req.body);
        const allowedKeys = ["name", "age", "hobbies", "education", "dob"];
        const isValidOperation = allowedKeys.every((key) => keys.includes(key));

        if(isValidOperation) {
            let obj = new User(req.body);
            const result = await obj.save();
            return res.status(200).send(result)

        }else {
            let missingKey = allowedKeys.filter((item) => {
                return !keys.includes(item)
            })
            return res.status(400).send({message: `${missingKey.toString()} keys are missing`})   
        }
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.patch('/user/:id', async(req, res) => {
    try{
        let id = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "hobbies", "age", "education" ];
        const isValidOperation = updates.every((key) => allowedUpdates.includes(key));

        if(!isValidOperation) {
            return res.status(400).send({error: 'Invalid Operation'})
        }

        let user = await User.findOne({_id: id});
        if(!user) {
            return res.status(404).send({message: 'User not found'})
        }
        let obj = new User(user);
        updates.forEach((update) => obj[update] = req.body[update]);
        obj.save();
        res.send({message: 'User updated successfully', result: obj})

    } catch(err) {
        console.log(err);
        res.status(400).send({message: 'Something went wrong'});
    }
})

module.exports = router