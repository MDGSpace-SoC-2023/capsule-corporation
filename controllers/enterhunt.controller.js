const database  = require('../data/database');





function loadnames(req, res) {
    database.getDb().collection('upcominghunts').find().toArray().then(function (hunts) {
        // console.log(hunts);
        let names = [];
        for (let hunt of hunts) {
            names.push(hunt.huntname);
        }
        res.render('upcomings_client', {
            names: names
        });
        console.log(names);
    }).catch(function (err) {
        console.log(err);
    });
}



function enterHunt(req,res){
    // const huntname = req.body.huntname;
    let clues = [];
    let hints = [];
    let locations = [];
    database.getDb().collection('hunts').findOne({huntname : req.body.huntname}).then(function (hunt) {
        // console.log(hunt.data);
        
        for (let clueset of hunt.data) {
            // console.log(clueset);
            clues.push(clueset.clue);
            hints.push(clueset.hint);
            locations.push(clueset.location);
            
        }
        console.log(clues);
        console.log(hints);
        console.log(locations);

        res.render('clues',{
            clues : clues,
            hints : hints,
            locations : locations
        
        });
    }).catch(function (err) {
        console.log(err);
    });
    
    
}

module.exports = {
    loadnames: loadnames,
    enterHunt : enterHunt
};