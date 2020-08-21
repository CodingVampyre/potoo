const Datastore = require('nedb');

const db = new Datastore({
    filename: `${__dirname}/potoo.db`,
    autoload: true,
});

function storeImages(id, image, tags) {
    return new Promise((resolve, reject) => {
        db.insert({ id, image, tags, }, (error, newDoc) => {
            if (error) { return reject(error); }
            else { return resolve(newDoc); }
        });
    });
}

function listImages() {
    return new Promise((resolve, reject) => {
        db.find({}, (error, docs) => {
            if (error) { return reject(error); }
            else { return resolve(docs); }
        })
    });
}

module.exports = { storeImages, listImages }
