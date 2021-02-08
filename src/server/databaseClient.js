import 'dotenv-flow/config';
import path from 'path';
import Sql from 'better-sqlite3';

const dbPath = path.join(__dirname, `../db/${process.env.DB_NAME}.db`);

const databaseClient = () => {

    const addEntry = (data) => {
        delete data.id;
        Object.keys(data).forEach(k => (!data[k] && data[k] !== undefined) && delete data[k]);
        const db = new Sql(dbPath);
        const columns = '"' + Object.keys(data).join('","') + '"';
        const values = '"' + Object.values(data).join('","') + '"';
        const query = 'INSERT INTO parts (' + columns + ') VALUES (' + values + ')';
        const createEntry = db.prepare(query).run();
        const latestEntry = db.prepare('SELECT * FROM parts WHERE ID = ' + createEntry.lastInsertRowid).all();
        db.close();

        return latestEntry;
    };

    const latestEntries = () => {
        const db = new Sql(dbPath);
        const query = 'SELECT name, id FROM parts ORDER BY "id" DESC LIMIT 0, 5';
        const entries = db.prepare(query).all();
        db.close();

        return entries;
    };

    const listEntries = () => {
        const db = new Sql(dbPath);
        const query = 'SELECT * FROM parts ORDER BY datetime(date_created) DESC';
        const entries = db.prepare(query).all();
        db.close();

        return entries;
    };

    const getPartColumns = () => {
        const db = new Sql(dbPath);
        const query = 'PRAGMA table_info(parts)';
        const entries = db.prepare(query).all();
        db.close();

        return entries;
    };

    const getEntry = (id) => {
        console.log(id);
        const db = new Sql(dbPath);
        const query = 'SELECT * FROM parts WHERE ID = ' + id;
        const entries = db.prepare(query).all();
        db.close();

        return entries;
    };

    const updateEntry = (data) => {
        const sql = Object.keys(data).filter(key => typeof data[key] !== 'undefined').map(key => {
            return key + ' = "' + data[key] + '"';
        });
        const db = new Sql(dbPath);
        const query = 'UPDATE parts SET ' + sql + ' WHERE id = ' + data.id;
        db.prepare(query).run();
        db.close();
    };

    return {
        addEntry,
        latestEntries,
        listEntries,
        getEntry,
        getPartColumns,
        updateEntry,
    };
};

export default databaseClient;
