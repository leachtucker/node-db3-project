// Import database
const { schema } = require('../../data/db-config');
const db = require('../../data/db-config');

// Helper functions
function find() {
    return db('schemes');
}

function findById(id) {
    const schemaObject = db('schemes').where({ id: id });

    if (!schemaObject) {
        return Promise.resolve(null);
    }

    return schemaObject;
}

function findSteps(id) {
    const stepsArray = db('steps as s')
        .join('schemes as sch', 's.scheme_id', 'sch.id')
        .select('s.id', 'sch.scheme_name', 's.step_number', 's.instructions')
        .where('sch.id', id).orderBy('s.step_number', 'desc');

    if (!stepsArray) {
        return Promise.resolve(null);
    }

    return stepsArray;
}

async function add(scheme) {
    const newSchemeId = await db('schemes').insert(scheme);

    if (!newSchemeId[0]) {
        return Promise.resolve(null);
    }

    return Promise.resolve({
        id: newSchemeId[0],
        scheme_name: scheme.scheme_name
    });
};

async function update(changes, id) {
    const records = await db('schemes').where({id: id}).update(changes);

    if (!records) {
        return Promise.resolve(null);
    }

    return Promise.resolve({
        id: id,
        ...changes
    });
};

// Export
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update
};