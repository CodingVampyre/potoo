const Datastore = require('nedb');

const db = new Datastore({
    filename: `${__dirname}/potoo.db`,
    autoload: true,
});

function storeImages(images) {
    return new Promise((resolve, reject) => {
        db.insert(images, (error, newDocs) => {
            if (error) { return reject(error); }
            else { return resolve(newDocs); }
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

function removeImage(id) {
    return new Promise((resolve, reject) => {
        db.remove({ id }, {}, (error, result) => {
            if (error) { return reject(error); }
            return resolve(result);
        });
    });
}

function updateTags(id, tags) {
    return new Promise((resolve, reject) => {
        db.update({ id }, { $set: { tags } }, {}, (error, result) => {
            if (error) { return reject(error); }
            return resolve(result);
        });
    });
}

function searchImagesByTags(tags) {
    const tagList = tags.map(tag => { return { tags: tag } });
    return new Promise((resolve, reject) => {
        db.find({ $and: tagList }, (error, docs) => {
            if (error) { return reject(error); }
            return resolve(docs);
        });
    });
}

module.exports = { 
    storeImages, 
    listImages, 
    removeImage, 
    updateTags,
    searchImagesByTags,
}
