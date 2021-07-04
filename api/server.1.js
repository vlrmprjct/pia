!function (e) { var t = {}; function n(r) { if (t[r]) return t[r].exports; var s = t[r] = { i: r, l: !1, exports: {} }; return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports } n.m = e, n.c = t, n.d = function (e, t, r) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var s in e) n.d(r, s, function (t) { return e[t] }.bind(null, s)); return r }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 9) }([function (e, t) { e.exports = require("express") }, function (e, t) { e.exports = require("passport") }, function (e, t) { e.exports = require("better-sqlite3") }, function (e, t) { e.exports = require("path") }, function (e, t) { e.exports = require("fs") }, function (e, t) { e.exports = require("request") }, function (e, t, n) { "use strict"; const r = n(10), s = n(11); n(12).config({ ...r(), ...s() }) }, function (e, t) { e.exports = require("express-session") }, function (e, t) { e.exports = require("passport-github") }, function (e, t, n) { e.exports = n(14) }, function (e, t, n) { "use strict"; const r = { NODE_ENV: "node_env", DEFAULT_NODE_ENV: "default_node_env", DOTENV_FLOW_PATH: "path", DOTENV_FLOW_ENCODING: "encoding", DOTENV_FLOW_PURGE_DOTENV: "purge_dotenv", DOTENV_FLOW_SILENT: "silent" }; e.exports = function (e = process.env) { return Object.keys(r).reduce((t, n) => (n in e && (t[r[n]] = e[n]), t), {}) } }, function (e, t, n) { "use strict"; const r = { "--node-env": "node_env", "--default-node-env": "default_node_env", "--dotenv-flow-path": "path", "--dotenv-flow-encoding": "encoding", "--dotenv-flow-purge-dotenv": "purge_dotenv", "--dotenv-flow-silent": "silent" }, s = Object.keys(r); e.exports = function (e = process.argv) { const t = {}; for (let n = 0; n < e.length; n++) { const o = e[n]; if (o in r) t[r[o]] = e[++n]; else for (let e = 0; e < s.length; e++) { const n = s[e]; if (o.startsWith(n + "=")) { t[r[n]] = o.slice(n.length + 1); break } } } return t } }, function (e, t, n) { "use strict"; const r = n(4), { resolve: s } = n(3), o = n(13); function a(e, t = {}) { const { node_env: n } = t; return [s(e, ".env.defaults"), s(e, ".env"), "test" !== n && s(e, ".env.local"), n && s(e, ".env." + n), n && s(e, `.env.${n}.local`)].filter(e => Boolean(e)) } function i(e, t = {}) { return "string" == typeof e ? o.parse(r.readFileSync(e, t)) : e.reduce((e, n) => Object.assign(e, o.parse(r.readFileSync(n, t))), {}) } function c(e, t = {}) { try { const n = i(e, { encoding: t.encoding }); return Object.keys(n).forEach(e => { process.env.hasOwnProperty(e) ? t.silent || console.warn('dotenv-flow: "%s" is already defined in `process.env` and will not be overwritten', e) : process.env[e] = n[e] }), { parsed: n } } catch (e) { return { error: e } } } function u(e, t = {}) { const n = i(e, t); Object.keys(n).forEach(e => { process.env[e] === n[e] && delete process.env[e] }) } e.exports = { listDotenvFiles: a, parse: i, load: c, unload: u, config: function (e = {}) { const t = e.node_env || "production"; let n; e.path ? n = e.path : e.cwd ? (console.warn("dotenv-flow: `options.cwd` is deprecated, please use `options.path` instead"), n = e.cwd) : n = process.cwd(); const { encoding: o, silent: i = !1 } = e; try { e.purge_dotenv && u(s(n, ".env"), { encoding: o }); return c(a(n, { node_env: t }).filter(e => r.existsSync(e)), { encoding: o, silent: i }) } catch (e) { return { error: e } } } } }, function (e, t) { e.exports = require("dotenv") }, function (e, t, n) { "use strict"; n.r(t); n(6); var r = n(0), s = n.n(r), o = n(7), a = n.n(o), i = n(1), c = n.n(i), u = n(8), d = n(4), p = n.n(d), l = n(3), E = n.n(l), T = n(2), f = n.n(T); const g = E.a.join(__dirname, "./db"); p.a.existsSync(g) || p.a.mkdirSync(g); var v = (e, t, n) => { if (e.isAuthenticated()) { e.dbname = process.env.DB_NAME || e.session.passport.user.id; const t = new f.a(E.a.join(g, e.dbname + ".db")); t.prepare('CREATE TABLE IF NOT EXISTS parts (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT, type TEXT, value TEXT, supplier_nr TEXT, supplier TEXT, manufacturer_nr TEXT, manufacturer TEXT, unit TEXT, stock INTEGER DEFAULT 0, min_stock INTEGER DEFAULT 0, price TEXT DEFAULT "0.00", price_total TEXT DEFAULT "0.00", tags TEXT, date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, date_updated DATE, image TEXT, storage_name TEXT DEFAULT "", storage_location TEXT DEFAULT "", link TEXT)').run(), t.prepare('INSERT INTO parts(id, name, image) SELECT 1, "My first part", "https://dummyimage.com/300x300/fff/aaa" WHERE NOT EXISTS (SELECT 1 FROM parts WHERE id = 1)').run(), t.close() } n() }; const y = Object(r.Router)(); y.get("/login/github", c.a.authenticate("github", { scope: ["gist"] })), y.get("/logout", (e, t) => { delete e.session.token, delete e.session.passport, e.logout(), t.redirect("/") }), y.get("/login", c.a.authenticate("github", { failureRedirect: "/" }), (e, t) => { t.redirect("/") }); var O = y, _ = n(5), b = n.n(_); var m = e => { const t = `${E.a.join(__dirname, "./db")}/${e}.db`; return { addEntry: e => { delete e.id, Object.keys(e).forEach(t => !e[t] && void 0 !== e[t] && delete e[t]); const n = new f.a(t), r = "INSERT INTO parts (" + ('"' + Object.keys(e).join('","') + '"') + ") VALUES (" + ('"' + Object.values(e).join('","') + '"') + ")", s = n.prepare(r).run(), o = n.prepare("SELECT * FROM parts WHERE ID = " + s.lastInsertRowid).all(); return n.close(), o }, latestEntries: () => { const e = new f.a(t), n = e.prepare('SELECT name, id FROM parts ORDER BY "id" DESC LIMIT 0, 5').all(); return e.close(), n }, listEntries: () => { const e = new f.a(t), n = e.prepare("SELECT * FROM parts ORDER BY datetime(date_created) DESC").all(); return e.close(), n }, getEntry: e => { const n = new f.a(t), r = "SELECT * FROM parts WHERE ID = " + e, s = n.prepare(r).all(); return n.close(), s }, getPartColumns: () => { const e = new f.a(t), n = e.prepare("PRAGMA table_info(parts)").all(); return e.close(), n }, updateEntry: e => { const n = Object.keys(e).filter(t => null !== e[t]).map(t => t + ' = "' + e[t] + '"'), r = new f.a(t), s = "UPDATE parts SET " + n + " WHERE id = " + e.id; r.prepare(s).run(), r.close() } } }; const h = Object(r.Router)(); h.get("/*", (e, t, n) => { e.isAuthenticated() ? n() : t.status(401).send({ status: "unauthorized", message: "authentication is required" }) }), h.get("/success", (e, t) => { b()({ method: "get", uri: "https://api.github.com/user", headers: { Authorization: "token " + e.session.token, "User-Agent": e.headers["user-agent"] } }).pipe(t) }), h.get("/oemsecret/:query?", (e, t) => { b()({ uri: "https://beta.api.oemsecrets.com/partsearch", qs: { apiKey: process.env.OEMSECRET_API_KEY, searchTerm: e.params.query } }).pipe(t) }), h.get("/mouser/:query?", (e, t) => { b()({ uri: "https://api.mouser.com/api/v1.0/search/keyword", method: "post", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ SearchByKeywordRequest: { keyword: e.params.query, records: 0, startingRecord: 0 } }), qs: { apikey: process.env.MOUSER_API_KEY } }).pipe(t) }), h.get("/parts", (e, t) => { const n = m(e.dbname).listEntries(); t.status(200).send(n) }), h.get("/partcolumns", (e, t) => { const n = m(e.dbname).getPartColumns(); t.status(200).send(n) }), h.post("/part", (e, t) => { const n = m(e.dbname).updateEntry(e.body); t.status(200).send(n) }), h.get("/part/:id?", (e, t) => { const n = m(e.dbname).getEntry(e.params.id); t.status(200).send(n) }), h.post("/addpart", (e, t) => { const n = m(e.dbname).addEntry(e.body); t.status(200).send(n) }), h.get("/latestentries", (e, t) => { const n = m(e.dbname).latestEntries(e.body); t.status(200).send(n) }); var R = h; const S = s()(); c.a.use(new u.Strategy({ clientID: process.env.GITHUB_KEY, clientSecret: process.env.GITHUB_SECRET, callbackURL: "/api/login", passReqToCallback: !0 }, (e, t, n, r, s) => (e.session.token = t, s(null, r)))), c.a.serializeUser((e, t) => { t(null, e) }), c.a.deserializeUser((e, t) => { t(null, e) }), S.use((function (e, t, n) { t.header("Access-Control-Allow-Origin", "*"), t.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"), t.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"), t.header("Access-Control-Allow-Credentials", !0), n() })), S.use(a()({ name: "pia.sid", secret: process.env.SESSION_SECRET, resave: !0, saveUninitialized: !0 })), S.use(s.a.urlencoded({ extended: !0 })), S.use(s.a.json()), S.use(s.a.static("dist")), S.use(c.a.initialize()), S.use(c.a.session()), S.use(v), S.use((e, t, n) => { n() }), S.use("/api", O), S.use("/api", R), S.listen(process.env.PORT || 5e3, () => { console.info(`Listening on port ${process.env.PORT || 5e3}!`) }) }]);
