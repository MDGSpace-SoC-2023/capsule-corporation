const db = require('../data/database');


class Team{
    constructor(teamname, teamdata){
        this.teamname = teamname;
        this.teamdata = teamdata;
    }

    async Save(huntname){
        await db.getDb().collection(huntname).insertOne({
            teamname: this.teamname,
            teamdata: this.teamdata
        });
    }

}

class participantDataSet{
    constructor(name,enrollentNo,phoneNo,email){
        this.name = name;
        this.enrollentNo = enrollentNo;
        this.phoneNo = phoneNo;
        this.email = email;
    }
}

module.exports = {
    Team: Team,
    participantDataSet: participantDataSet
}