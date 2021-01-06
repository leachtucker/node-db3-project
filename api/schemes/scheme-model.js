// Import database
const { schema } = require('../../data/db-config');
const db = require('../../data/db-config');

// Helper functions
function find() {
    return db('schemes');
}

async function findById(id) {
    const schemaObject = await db('schemes').where({ id: id });

    if (!schemaObject) {
        return Promise.resolve(null);
    }

    return schemaObject[0];
}

function findSteps(id) {
    const stepsArray = db('steps as s')
        .join('schemes as sch', 's.scheme_id', 'sch.id')
        .select('s.id', 'sch.scheme_name', 's.step_number', 's.instructions')
        .where('sch.id', id).orderBy('s.step_number', 'asc');

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
    // Resolves to the number of records updated
    const updatedRecords = await db('schemes').where({id: id}).update(changes);

    if (!updatedRecords) {
        return Promise.resolve(null);
    }

    const updatedScheme = await findById(id);

    return Promise.resolve({
        ...updatedScheme
    });
};

async function remove(id) {
    const schemeToDel = await findById(id);
    const delRecords = await db('schemes').where({ id: id }).del();

    if (delRecords.removed <= 0) {
        Promise.resolve(null);
    }

    return Promise.resolve(schemeToDel);
}

async function addStep(step, scheme_id) {
    const newStep = await db('steps').insert({ ...step, scheme_id });

    if (!newStep) {
        return Promise.resolve(null);
    }

    return Promise.resolve({
        ...step,
        scheme_id: scheme_id
    });
}

// Export
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};