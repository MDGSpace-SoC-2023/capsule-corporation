const Hunt = require('../models/hunt.model');


function storeData(req, res) {
    
    // console.log(req.body)
    // console.log(req.body.Clue)
    // console.log(req.body.Location)
    // console.log(req.body.Hint)
    let data = [];
    for (let i = 0; i < req.body.Clue.length; i++) {
        const dataSet = new Hunt.dataSet(req.body.Clue[i], req.body.Location[i], req.body.Hint[i]);
        data.push(dataSet);
    }
    // console.log(data);
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