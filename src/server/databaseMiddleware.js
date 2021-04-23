import fs from 'fs';
import path from 'path';
import Sql from 'better-sqlite3';

const dbDirPath = (process.env.NODE_ENV === 'development')
    ? path.join(__dirname, '../db')
    : path.join(__dirname, './db');

if (!fs.existsSync(dbDirPath)) {
    fs.mkdirSync(dbDirPath);
}

const databaseMiddleware = (req, res, next) => {

    if (req.isAuthenticated()) {

        req.dbname = process.env.DB_NAME || req.session.passport.user.id;

        const db = new Sql(path.join(dbDirPath, `${req.dbname}.db`));

        db.prepare('CREATE TABLE IF NOT EXISTS parts (' +
            'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, ' +
            'name TEXT, ' +
            'type TEXT, ' +
            'value TEXT, ' +
            'supplier_nr TEXT, ' +
            'supplier TEXT, ' +
            'manufacturer_nr TEXT, ' +
            'manufacturer TEXT, ' +
            'unit TEXT, ' +
            'stock INTEGER DEFAULT 0, ' +
            'min_stock INTEGER DEFAULT 0, ' +
            'price TEXT DEFAULT "0.00", ' +
            'price_total TEXT DEFAULT "0.00", ' +
            'tags TEXT, ' +
            'date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
            'date_updated DATE, ' +
            'image TEXT, ' +
            'storage_name TEXT DEFAULT "", ' +
            'storage_location TEXT DEFAULT "", ' +
            'link TEXT)').run();

        db.prepare('INSERT INTO parts(id, name, image) ' +
            'SELECT 1, "My first part", "https://dummyimage.com/300x300/fff/aaa" ' +
            'WHERE NOT EXISTS ' +
            '(SELECT 1 FROM parts WHERE id = 1)').run();

        db.close();
    }
    next();
};

export default databaseMiddleware;
