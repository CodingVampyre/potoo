const Datastore = require('nedb');

const db = new Datastore({
    filename: path.join(__dirname, 'potoo.db'),
    autoload: true,
});

export function storeImage(id, image, tags) {
    return new Promise((resolve, reject) => {
        db.insert({ id, image, tags, }, (error, newDoc) => {
            if (error) { return reject(error); }
            else { return resolve(newDoc); }
        });
    });
}

export function listImages() {
    return new Promise((resolve, reject) => {
        db.find({}, (error, docs) => {
            if (error) { return reject(error); }
            else { return resolve(docs); }
        })
    });
}
