const database = require('../data/database');
const Team = require('../models/team.model');



function storeData(req, res) {
    
    // console.log(req.body)
    // console.log(req.body.Clue)
    // console.log(req.body.Location)
    // console.log(req.body.Hint)
    let data = [];
    for (let i = 0; i < req.body.Name.length; i++) {
        const participantDetails = new Team.participantDataSet(req.body.Name[i], req.body.enrollementNo[i], req.body.phonenumber[i], req.body.email[i]);
        data.push(participantDetails);
        
    }
    // console.log(req.body.Name)
    // console.log(data);
    const team = new Team.Team(req.body.teamname, data);
    
    console.log(req.body.teamname,data);
    
    team.Save(req.body.huntname).then(function () {
        res.redirect('/menu_client');
    }).catch(function (err) {
        console.log(err);
    });
}

function loadnames(req, res) {
    database.getDb().collection('upcominghunts').find().toArray().then(function (hunts) {
        // console.log(hunts);
        let names = [];
        for (let hunt of hunts) {
            names.push(hunt.huntname);
        }
        res.render('team_members', {
            names: names
        });
        console.log(names);
    }).catch(function (err) {
        console.log(err);
    });
}

module.exports = {
    storeData: storeData,
    loadnames: loadnames
}