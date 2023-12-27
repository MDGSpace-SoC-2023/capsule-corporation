const Hunt = require('../models/hunt.model');


function storeData(req, res) {
    let data = [];
    if (Array.isArray(req.body.Clue)) {
        for (let i = 0; i < req.body.Clue.length; i++) {
            const dataSet = new Hunt.dataSet(req.body.Clue[i], req.body.Location[i], req.body.Hint[i]);
            data.push(dataSet);
        }
    } else {
        const dataSet = new Hunt.dataSet(req.body.Clue, req.body.Location, req.body.Hint);
        data.push(dataSet);
    }
    const hunt = new Hunt.Hunt(req.body.huntname, data);
    console.log(req.body.huntname,data);
    hunt.savehuntname();
    hunt.Save().then(function () {
        res.redirect('/menu');
    }).catch(function (err) {
        console.log(err);
    });
}


module.exports = {
    storeData: storeData
}