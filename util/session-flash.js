function flashDataToSession(req, data, action){
    req.session.flashedData = data;
    req.session.save(action)
}

function getSessioData(req){
    const sessionData = req.session.flashedData;

    req.session.flashedData = null;
    return sessionData;

}

module.exports = {
    flashDataToSession: flashDataToSession,
    getSessioData: getSessioData
}