/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dotenv-flow/config.js":
/*!********************************************!*\
  !*** ./node_modules/dotenv-flow/config.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst env_options = __webpack_require__(/*! ./lib/env-options */ \"./node_modules/dotenv-flow/lib/env-options.js\");\nconst cli_options = __webpack_require__(/*! ./lib/cli-options */ \"./node_modules/dotenv-flow/lib/cli-options.js\");\n\n__webpack_require__(/*! ./lib/dotenv-flow */ \"./node_modules/dotenv-flow/lib/dotenv-flow.js\").config({\n  ...env_options(),\n  ...cli_options()\n});\n\n\n//# sourceURL=webpack:///./node_modules/dotenv-flow/config.js?");

/***/ }),

/***/ "./node_modules/dotenv-flow/lib/cli-options.js":
/*!*****************************************************!*\
  !*** ./node_modules/dotenv-flow/lib/cli-options.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst CLI_OPTIONS_MAP = {\n  '--node-env': 'node_env',\n  '--default-node-env': 'default_node_env',\n  '--dotenv-flow-path': 'path',\n  '--dotenv-flow-encoding': 'encoding',\n  '--dotenv-flow-purge-dotenv': 'purge_dotenv',\n  '--dotenv-flow-silent': 'silent'\n};\n\nconst CLI_OPTION_KEYS = Object.keys(CLI_OPTIONS_MAP);\n\n/**\n * Get CLI options for `dotenv-flow#config()`.\n *\n * @param {string[]} [argv=process.argv]\n * @return {{node_env?: string, default_node_env?: string, path?: string, encoding?: string, purge_dotenv?: string, silent?: string}}\n */\nmodule.exports = function cli_options(argv = process.argv) {\n  const options = {};\n\n  for (let i = 0; i < argv.length; i++) {\n    const arg = argv[i];\n\n    if (arg in CLI_OPTIONS_MAP) {\n      options[ CLI_OPTIONS_MAP[arg] ] = argv[++i];\n      continue;\n    }\n\n    for (let j = 0; j < CLI_OPTION_KEYS.length; j++) {\n      const flag = CLI_OPTION_KEYS[j];\n\n      if (arg.startsWith(flag + '=')) {\n        options[ CLI_OPTIONS_MAP[flag] ] = arg.slice(flag.length + 1);\n        break;\n      }\n    }\n  }\n\n  return options;\n};\n\n\n//# sourceURL=webpack:///./node_modules/dotenv-flow/lib/cli-options.js?");

/***/ }),

/***/ "./node_modules/dotenv-flow/lib/dotenv-flow.js":
/*!*****************************************************!*\
  !*** ./node_modules/dotenv-flow/lib/dotenv-flow.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst {resolve} = __webpack_require__(/*! path */ \"path\");\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\n/**\n * Returns a list of `.env*` filenames ordered by the env files priority from lowest to highest.\n *\n * Also, make a note that the `.env.local` file is not included when the value of `node_env` is `\"test\"`,\n * since normally you expect tests to produce the same results for everyone.\n *\n * @param {string} dirname - path to `.env*` files' directory\n * @param {object} [options] - `.env*` files listing options\n * @param {string} [options.node_env] - node environment (development/test/production/etc,.)\n * @return {string[]}\n */\nfunction listDotenvFiles(dirname, options = {}) {\n  const {node_env} = options;\n\n  return [\n    resolve(dirname, '.env.defaults'),\n    resolve(dirname, '.env'),\n    (node_env !== 'test') && resolve(dirname, '.env.local'),\n    node_env && resolve(dirname, `.env.${node_env}`),\n    node_env && resolve(dirname, `.env.${node_env}.local`)\n  ]\n    .filter(filename => Boolean(filename));\n}\n\n/**\n * Parse a given file(s) to use the result programmatically.\n *\n * When several filenames are given, the parsed environment variables are merged using the \"overwrite\" strategy.\n *\n * @param {string|string[]} filenames - filename or a list of filenames to parse\n * @param {object} [options] - `fs.readFileSync` options\n * @return {object} the resulting map of `{ env_var: value }` as an object\n */\nfunction parse(filenames, options = {}) {\n  if (typeof filenames === 'string') {\n    return dotenv.parse(fs.readFileSync(filenames, options));\n  }\n\n  return filenames.reduce((parsed, filename) => {\n    return Object.assign(parsed, dotenv.parse(fs.readFileSync(filename, options)));\n  }, {});\n}\n\n/**\n * Load variables defined in a given file(s) into `process.env`.\n *\n * When several filenames are given, parsed environment variables are merged using the \"overwrite\" strategy since it utilizes `.parse()` for doing this.\n * But eventually, assigning the resulting environment variables to `process.env` is done using the \"append\" strategy,\n * thus giving a higher priority to the environment variables predefined by the shell.\n *\n * @param {string|string[]} filenames - filename or a list of filenames to load\n * @param {object} [options] - file loading options\n * @param {string} [options.encoding=\"utf8\"] - encoding of `.env*` files\n * @param {boolean} [options.silent=false] - suppress all the console outputs except errors and deprecations\n * @return {object} with a `parsed` key containing the loaded content or an `error` key with an error that is occurred\n */\nfunction load(filenames, options = {}) {\n  try {\n    const parsed = parse(filenames, {\n      encoding: options.encoding\n    });\n\n    Object.keys(parsed).forEach((key) => {\n      if (!process.env.hasOwnProperty(key)) {\n        process.env[key] = parsed[key];\n      }\n      else if (!options.silent) {\n        console.warn('dotenv-flow: \"%s\" is already defined in `process.env` and will not be overwritten', key); // >>>\n      }\n    });\n\n    return { parsed };\n  }\n  catch (error) {\n    return { error };\n  }\n}\n\n/**\n * Unload variables defined in a given file(s) from `process.env`.\n *\n * This function can gracefully resolve the following issue:\n *\n * In some cases the original \"dotenv\" library can be used by one of the dependent npm modules.\n * It causes calling the original `dotenv.config()` that loads the `.env` file from your project before you can call `dotenv-flow.config()`.\n * Such cases breaks `.env*` files priority because the previously loaded environment variables are treated as shell-defined thus having a higher priority.\n *\n * Unloading the previously loaded `.env` file can be activated when using the `dotenv-flow.config()` with the `purge_dotenv` option set to `true`.\n *\n * @param {string|string[]} filenames - filename or a list of filenames to unload\n * @param {object} [options] - `fs.readFileSync` options\n */\nfunction unload(filenames, options = {}) {\n  const parsed = parse(filenames, options);\n\n  Object.keys(parsed).forEach((key) => {\n    if (process.env[key] === parsed[key]) {\n      delete process.env[key];\n    }\n  });\n}\n\n/**\n * Main entry point into the \"dotenv-flow\". Allows configuration before loading `.env*` files.\n *\n * @param {object} [options] - configuration options\n * @param {string} [options.node_env=process.env.NODE_ENV] - node environment (development/test/production/etc,.)\n * @param {string} [options.default_node_env] - the default node environment\n * @param {string} [options.path=process.cwd()] - path to `.env*` files directory\n * @param {string} [options.encoding=\"utf8\"] - encoding of `.env*` files\n * @param {boolean} [options.purge_dotenv=false] - perform the `.env` file {@link unload}\n * @param {boolean} [options.silent=false] - suppress all the console outputs except errors and deprecations\n * @return {{ parsed?: object, error?: Error }} with a `parsed` key containing the loaded content or an `error` key with an error that is occurred\n */\nfunction config(options = {}) {\n  const node_env = options.node_env || \"development\" || options.default_node_env;\n\n  let path;\n  if (options.path) {\n    path = options.path;\n  }\n  else if (options.cwd) {\n    console.warn('dotenv-flow: `options.cwd` is deprecated, please use `options.path` instead'); // >>>\n    path = options.cwd;\n  }\n  else {\n    path = process.cwd();\n  }\n\n  const {\n    encoding = undefined,\n    silent = false\n  } = options;\n\n  try {\n    if (options.purge_dotenv) {\n      unload(resolve(path, '.env'), { encoding });\n    }\n\n    const existingFiles = (\n      listDotenvFiles(path, { node_env })\n        .filter(filename => fs.existsSync(filename))\n    );\n\n    return load(existingFiles, { encoding, silent });\n  }\n  catch (error) {\n    return { error };\n  }\n}\n\nmodule.exports = {\n  listDotenvFiles,\n  parse,\n  load,\n  unload,\n  config\n};\n\n\n//# sourceURL=webpack:///./node_modules/dotenv-flow/lib/dotenv-flow.js?");

/***/ }),

/***/ "./node_modules/dotenv-flow/lib/env-options.js":
/*!*****************************************************!*\
  !*** ./node_modules/dotenv-flow/lib/env-options.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst ENV_OPTIONS_MAP = {\n  NODE_ENV: 'node_env',\n  DEFAULT_NODE_ENV: 'default_node_env',\n  DOTENV_FLOW_PATH: 'path',\n  DOTENV_FLOW_ENCODING: 'encoding',\n  DOTENV_FLOW_PURGE_DOTENV: 'purge_dotenv',\n  DOTENV_FLOW_SILENT: 'silent'\n};\n\n/**\n * Get environment variable defined options for `dotenv-flow#config()`.\n *\n * @param {object} [env=process.env]\n * @return {{node_env?: string, default_node_env?: string, path?: string, encoding?: string, purge_dotenv?: string, silent?: string}}\n */\nmodule.exports = function env_options(env = process.env) {\n  return Object.keys(ENV_OPTIONS_MAP)\n    .reduce((options, key) => {\n      if (key in env) {\n        options[ ENV_OPTIONS_MAP[key] ] = env[key];\n      }\n      return options;\n    }, {});\n};\n\n\n//# sourceURL=webpack:///./node_modules/dotenv-flow/lib/env-options.js?");

/***/ }),

/***/ "./src/server/apiRouter.js":
/*!*********************************!*\
  !*** ./src/server/apiRouter.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv-flow/config */ \"./node_modules/dotenv-flow/config.js\");\n/* harmony import */ var dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! request */ \"request\");\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(request__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _databaseClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./databaseClient */ \"./src/server/databaseClient.js\");\n\n\n\n\n\nconst apiRouter = Object(express__WEBPACK_IMPORTED_MODULE_1__[\"Router\"])();\n\nconst defaultRoute = (req, res, next) => {\n    if (!req.isAuthenticated()) {\n        res.status(401).send({\n            'status': 'unauthorized',\n            'message': 'authentication is required',\n        });\n    } else {\n        next();\n    }\n};\n\napiRouter.get(\"/*\", defaultRoute);\n\napiRouter.get('/success', (req, res) => {\n    request__WEBPACK_IMPORTED_MODULE_2___default()({\n        method: 'get',\n        uri: `https://api.github.com/user`,\n        headers: {\n            Authorization: 'token ' + req.session.token,\n            'User-Agent': req.headers['user-agent'],\n        }\n    }).pipe(res);\n});\n\napiRouter.get('/oemsecret/:query?', (req, res) => {\n    request__WEBPACK_IMPORTED_MODULE_2___default()({\n        uri: 'https://beta.api.oemsecrets.com/partsearch',\n        qs: {\n            apiKey: process.env.OEMSECRET_API_KEY,\n            // currency: 'EUR',\n            // countryCode: 'DE',\n            // groupBy: 'distributor_name',\n            searchTerm: req.params.query\n        }\n    }).pipe(res);\n});\n\napiRouter.get('/mouser/:query?', (req, res) => {\n    request__WEBPACK_IMPORTED_MODULE_2___default()({\n        uri: 'https://api.mouser.com/api/v1.0/search/keyword',\n        method: 'post',\n        headers: {\n            'Content-Type': 'application/json',\n            'Accept': 'application/json'\n        },\n        body: JSON.stringify({\n            \"SearchByKeywordRequest\": {\n                \"keyword\": req.params.query,\n                \"records\": 0,\n                \"startingRecord\": 0,\n                // \"searchOptions\": \"string\",\n                // \"searchWithYourSignUpLanguage\": \"string\"\n            }\n        }),\n        qs: {\n            apikey: process.env.MOUSER_API_KEY\n        }\n    }).pipe(res);\n});\n\napiRouter.get('/parts', (req, res) => {\n    const entries = Object(_databaseClient__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(req.dbname).listEntries();\n    res.status(200).send(entries);\n});\n\napiRouter.get('/partcolumns', (req, res) => {\n    const entries = Object(_databaseClient__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(req.dbname).getPartColumns();\n    res.status(200).send(entries);\n});\n\napiRouter.post('/part', (req, res) => {\n    const updateEntry = Object(_databaseClient__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(req.dbname).updateEntry(req.body);\n    res.status(200).send(updateEntry);\n});\n\napiRouter.get('/part/:id?', (req, res) => {\n    const entries = Object(_databaseClient__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(req.dbname).getEntry(req.params.id);\n    res.status(200).send(entries);\n});\n\napiRouter.post('/addpart', (req, res) => {\n    const addItem = Object(_databaseClient__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(req.dbname).addEntry(req.body);\n    res.status(200).send(addItem);\n});\n\napiRouter.get('/latestentries', (req, res) => {\n    const entries = Object(_databaseClient__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(req.dbname).latestEntries(req.body);\n    res.status(200).send(entries);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (apiRouter);\n\n\n//# sourceURL=webpack:///./src/server/apiRouter.js?");

/***/ }),

/***/ "./src/server/authRouter.js":
/*!**********************************!*\
  !*** ./src/server/authRouter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst authRouter = Object(express__WEBPACK_IMPORTED_MODULE_0__[\"Router\"])();\n\nauthRouter.get('/login/github', passport__WEBPACK_IMPORTED_MODULE_1___default.a.authenticate('github', { scope: ['gist'] }));\n\nauthRouter.get('/logout', (req, res) => {\n    delete req.session.token;\n    delete req.session.passport;\n    req.logout();\n    res.redirect('/#/login');\n});\n\nauthRouter.get('/login',\n    passport__WEBPACK_IMPORTED_MODULE_1___default.a.authenticate('github', { failureRedirect: '/' }),\n    (req, res) => {\n        res.redirect('/');\n    });\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (authRouter);\n\n\n//# sourceURL=webpack:///./src/server/authRouter.js?");

/***/ }),

/***/ "./src/server/databaseClient.js":
/*!**************************************!*\
  !*** ./src/server/databaseClient.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv-flow/config */ \"./node_modules/dotenv-flow/config.js\");\n/* harmony import */ var dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst databaseClient = (dbname) => {\n\n    const dbDirPath = ( true)\n        ? path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '../db')\n        : undefined;\n\n    const dbPath = `${dbDirPath}/${dbname}.db`;\n\n    const addEntry = (data) => {\n        delete data.id;\n        Object.keys(data).forEach(k => (!data[k] && data[k] !== undefined) && delete data[k]);\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(dbPath);\n        const columns = '\"' + Object.keys(data).join('\",\"') + '\"';\n        const values = '\"' + Object.values(data).join('\",\"') + '\"';\n        const query = 'INSERT INTO parts (' + columns + ') VALUES (' + values + ')';\n        const createEntry = db.prepare(query).run();\n        const latestEntry = db.prepare('SELECT * FROM parts WHERE ID = ' + createEntry.lastInsertRowid).all();\n        db.close();\n\n        return latestEntry;\n    };\n\n    const latestEntries = () => {\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(dbPath);\n        const query = 'SELECT name, id FROM parts ORDER BY \"id\" DESC LIMIT 0, 5';\n        const entries = db.prepare(query).all();\n        db.close();\n\n        return entries;\n    };\n\n    const listEntries = () => {\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(dbPath);\n        const query = 'SELECT * FROM parts ORDER BY datetime(date_created) DESC';\n        const entries = db.prepare(query).all();\n        db.close();\n\n        return entries;\n    };\n\n    const getPartColumns = () => {\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(dbPath);\n        const query = 'PRAGMA table_info(parts)';\n        const entries = db.prepare(query).all();\n        db.close();\n\n        return entries;\n    };\n\n    const getEntry = (id) => {\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(dbPath);\n        const query = 'SELECT * FROM parts WHERE ID = ' + id;\n        const entries = db.prepare(query).all();\n        db.close();\n\n        return entries;\n    };\n\n    const updateEntry = (data) => {\n        const sql = Object.keys(data)\n            .filter(key => data[key] !== null)\n            .map(key => {\n                return key + ' = \"' + data[key] + '\"';\n            });\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(dbPath);\n        const query = 'UPDATE parts SET ' + sql + ' WHERE id = ' + data.id;\n        db.prepare(query).run();\n        db.close();\n    };\n\n    return {\n        addEntry,\n        latestEntries,\n        listEntries,\n        getEntry,\n        getPartColumns,\n        updateEntry,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (databaseClient);\n\n\n//# sourceURL=webpack:///./src/server/databaseClient.js?");

/***/ }),

/***/ "./src/server/databaseMiddleware.js":
/*!******************************************!*\
  !*** ./src/server/databaseMiddleware.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst dbDirPath = ( true)\n    ? path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '../db')\n    : undefined;\n\nif (!fs__WEBPACK_IMPORTED_MODULE_0___default.a.existsSync(dbDirPath)) {\n    fs__WEBPACK_IMPORTED_MODULE_0___default.a.mkdirSync(dbDirPath);\n}\n\nconst databaseMiddleware = (req, res, next) => {\n\n    if (req.isAuthenticated()) {\n\n        req.dbname = process.env.DB_NAME || req.session.passport.user.id;\n\n        const db = new better_sqlite3__WEBPACK_IMPORTED_MODULE_2___default.a(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(dbDirPath, `${req.dbname}.db`));\n\n        db.prepare('CREATE TABLE IF NOT EXISTS parts (' +\n            'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, ' +\n            'name TEXT, ' +\n            'type TEXT, ' +\n            'value TEXT, ' +\n            'supplier_nr TEXT, ' +\n            'supplier TEXT, ' +\n            'manufacturer_nr TEXT, ' +\n            'manufacturer TEXT, ' +\n            'unit TEXT, ' +\n            'stock INTEGER DEFAULT 0, ' +\n            'min_stock INTEGER DEFAULT 0, ' +\n            'price TEXT DEFAULT \"0.00\", ' +\n            'price_total TEXT DEFAULT \"0.00\", ' +\n            'tags TEXT, ' +\n            'date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +\n            'date_updated DATE, ' +\n            'image TEXT, ' +\n            'storage_name TEXT DEFAULT \"\", ' +\n            'storage_location TEXT DEFAULT \"\", ' +\n            'link TEXT)').run();\n\n        db.prepare('INSERT INTO parts(id, name, image) ' +\n            'SELECT 1, \"My first part\", \"https://dummyimage.com/300x300/fff/aaa\" ' +\n            'WHERE NOT EXISTS ' +\n            '(SELECT 1 FROM parts WHERE id = 1)').run();\n\n        db.close();\n    }\n    next();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (databaseMiddleware);\n\n\n//# sourceURL=webpack:///./src/server/databaseMiddleware.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv-flow/config */ \"./node_modules/dotenv-flow/config.js\");\n/* harmony import */ var dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_flow_config__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var passport_github__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! passport-github */ \"passport-github\");\n/* harmony import */ var passport_github__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(passport_github__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _databaseMiddleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./databaseMiddleware */ \"./src/server/databaseMiddleware.js\");\n/* harmony import */ var _authRouter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./authRouter */ \"./src/server/authRouter.js\");\n/* harmony import */ var _apiRouter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./apiRouter */ \"./src/server/apiRouter.js\");\n\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n\npassport__WEBPACK_IMPORTED_MODULE_3___default.a.use(new passport_github__WEBPACK_IMPORTED_MODULE_4__[\"Strategy\"]({\n    clientID: process.env.GITHUB_KEY,\n    clientSecret: process.env.GITHUB_SECRET,\n    callbackURL: '/api/login',\n    passReqToCallback: true,\n},(req, accessToken, refreshToken, profile, cb) => {\n    req.session.token = accessToken;\n    return cb(null, profile);\n}));\n\npassport__WEBPACK_IMPORTED_MODULE_3___default.a.serializeUser((user, cb) => {\n    cb(null, user);\n});\npassport__WEBPACK_IMPORTED_MODULE_3___default.a.deserializeUser((obj, cb) => {\n    cb(null, obj);\n});\n\napp.use(function (req, res, next) {\n    res.header(\"Access-Control-Allow-Origin\", \"*\");\n    res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept\");\n    res.header(\"Access-Control-Allow-Methods\", \"GET, POST, PUT, DELETE, OPTIONS\");\n    res.header(\"Access-Control-Allow-Credentials\", true);\n    next();\n});\n\napp.use(express_session__WEBPACK_IMPORTED_MODULE_2___default()({\n    name: 'pia.sid',\n    secret: process.env.SESSION_SECRET,\n    resave: true,\n    saveUninitialized: true\n}));\n\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({ extended: true }));\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.json());\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static('dist'));\n\napp.use(passport__WEBPACK_IMPORTED_MODULE_3___default.a.initialize());\napp.use(passport__WEBPACK_IMPORTED_MODULE_3___default.a.session());\n\napp.use(_databaseMiddleware__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n\napp.use((req, res, next) => {\n    next();\n});\n\napp.use('/api', _authRouter__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\napp.use('/api', _apiRouter__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\napp.listen(process.env.PORT || 5000, () => {\n    console.info(`Listening on port ${process.env.PORT || 5000}!`);\n});\n\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi babel-polyfill ./src/server/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./src/server/index.js */\"./src/server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./src/server/index.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"better-sqlite3\");\n\n//# sourceURL=webpack:///external_%22better-sqlite3%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-github":
/*!**********************************!*\
  !*** external "passport-github" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-github\");\n\n//# sourceURL=webpack:///external_%22passport-github%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request\");\n\n//# sourceURL=webpack:///external_%22request%22?");

/***/ })

/******/ });