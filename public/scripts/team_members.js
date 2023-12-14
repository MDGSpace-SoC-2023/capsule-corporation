
const database = require('../data/database');

database.getDb().collection('upcominghunts').find().toArray().then(function (hunts) {
    console.log(hunts);
    let names = [];
    for (let hunt of hunts) {
        names.push(hunt.huntname);
    }
    console.log(names);    
    for (let name of names){
        let option = document.createElement('select').options.add(new Option(name, name));
        const toadd = document.getElementById('toadd');
        toadd.appendChild(option);
    }
}).catch(function (err) {
    console.log(err);
});

