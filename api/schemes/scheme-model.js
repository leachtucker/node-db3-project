// Import database
const db = require('../../data/db-config');

// Helper functions
function find() {
    return db('schemes');
}

function findById(id) {
    let schemaObject = db('schemes').where({ id: id })[0];
    if (!schemaObject) {
        return Promise.resolve(null);
    }

    return schemaObject;
}

function findSteps(id) {
    const stepsArray = db('steps as s')
        .join('schemes as sch', 's.scheme_id', 'sch.id')
        .select('s.id', 'sch.scheme_name', 's.step_number', 's.instructions')
        .where('sch.id', id);

    if (!stepsArray) {
        return Promise.resolve(null);
    }

    return stepsArray;
}

// Export
module.exports = {
    find,
    findById,
    findSteps
};