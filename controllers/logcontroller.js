let express = require('express');
let validateSession = require('../middleware/validate-session');
const user = require('../models/user');
let router = express.Router();
let log = require('../db').import('../models/log')

router.get('/practice', function(req,res)
{
    res.send("Hey! This is a practice route!")
})

router.post('/', validateSession, (req, res) => {
    const workLog = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id,
    }
    log.create(workLog)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error:err}))
});

router.get('/', validateSession, (req, res) => {
    log.findAll({
        where: { owner_id: req.user.id}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error:err}))
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    log.findAll({
        where: { id: req.params.id, owner_id: req.user.id}
    })
    .then(Log => res.status(200).json(Log))
    .catch(err => res.status(500).json({error:err}))
});

router.put('/:id', validateSession, (req, res) => {
    const updateLog = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
    };
    const query = { where: { id: req.params.id, owner_id: req.user.id}};

    log.update(updateLog, query)
    .then(Log => res.status(200).json(Log))
    .catch(err => res.status(500).json({error:err}))
});

router.delete('/:id',validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner_id: req.user.id}};
    
    log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Removed"}))
    .catch(err => res.status(500).json({error:err}))
});

module.exports = router