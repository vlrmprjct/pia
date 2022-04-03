!function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=9)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("date-and-time")},function(e,t){e.exports=require("gitrows")},function(e,t){e.exports=require("cuid")},function(e,t){e.exports=require("request")},function(e,t,s){"use strict";const n=s(10),r=s(11);s(12).config({...n(),...r()})},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("passport-github2")},function(e,t,s){e.exports=s(16)},function(e,t,s){"use strict";const n={NODE_ENV:"node_env",DEFAULT_NODE_ENV:"default_node_env",DOTENV_FLOW_PATH:"path",DOTENV_FLOW_ENCODING:"encoding",DOTENV_FLOW_PURGE_DOTENV:"purge_dotenv",DOTENV_FLOW_SILENT:"silent"};e.exports=function(e=process.env){return Object.keys(n).reduce((t,s)=>(s in e&&(t[n[s]]=e[s]),t),{})}},function(e,t,s){"use strict";const n={"--node-env":"node_env","--default-node-env":"default_node_env","--dotenv-flow-path":"path","--dotenv-flow-encoding":"encoding","--dotenv-flow-purge-dotenv":"purge_dotenv","--dotenv-flow-silent":"silent"},r=Object.keys(n);e.exports=function(e=process.argv){const t={};for(let s=0;s<e.length;s++){const o=e[s];if(o in n)t[n[o]]=e[++s];else for(let e=0;e<r.length;e++){const s=r[e];if(o.startsWith(s+"=")){t[n[s]]=o.slice(s.length+1);break}}}return t}},function(e,t,s){"use strict";const n=s(13),{resolve:r}=s(14),o=s(15);function i(e,t={}){const{node_env:s}=t;return[r(e,".env.defaults"),r(e,".env"),"test"!==s&&r(e,".env.local"),s&&r(e,".env."+s),s&&r(e,`.env.${s}.local`)].filter(e=>Boolean(e))}function a(e,t={}){return"string"==typeof e?o.parse(n.readFileSync(e,t)):e.reduce((e,s)=>Object.assign(e,o.parse(n.readFileSync(s,t))),{})}function c(e,t={}){try{const s=a(e,{encoding:t.encoding});return Object.keys(s).forEach(e=>{process.env.hasOwnProperty(e)?t.silent||console.warn('dotenv-flow: "%s" is already defined in `process.env` and will not be overwritten',e):process.env[e]=s[e]}),{parsed:s}}catch(e){return{error:e}}}function u(e,t={}){const s=a(e,t);Object.keys(s).forEach(e=>{process.env[e]===s[e]&&delete process.env[e]})}e.exports={listDotenvFiles:i,parse:a,load:c,unload:u,config:function(e={}){const t=e.node_env||"production";let s;e.path?s=e.path:e.cwd?(console.warn("dotenv-flow: `options.cwd` is deprecated, please use `options.path` instead"),s=e.cwd):s=process.cwd();const{encoding:o,silent:a=!1}=e;try{e.purge_dotenv&&u(r(s,".env"),{encoding:o});return c(i(s,{node_env:t}).filter(e=>n.existsSync(e)),{encoding:o,silent:a})}catch(e){return{error:e}}}}},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("dotenv")},function(e,t,s){"use strict";s.r(t);s(6);var n=s(0),r=s.n(n),o=s(7),i=s.n(o),a=s(1),c=s.n(a),u=s(8),d=s(3),p=s.n(d),l=s(4),f=s.n(l),g=s(2),v=s.n(g);var h=(e,t,s)=>{if(e.isAuthenticated()){e.userID=e.session.passport.user.id,e.userName=e.session.passport.user.username;const t=v.a.format(new Date,"YYYY-MM-DD HH:mm:ss"),s=new p.a({user:"vlrmprjct",author:{name:e.userID,email:e.userID},message:"user dir "+e.userID+" for "+e.userName+" created",token:process.env.GITHUB_ACCESS,strict:!1});s.get(process.env.DB_PATH+"structure.json").then(n=>{const r={...Object.fromEntries(Object.entries(n).map(([e,t])=>[""+t.name,""])),id:f()(),name:"Example part",date_created:t,date_updated:t};s.create("@github/vlrmprjct/pia-database/"+e.userID+"/parts.json",[r]).then(()=>{s.put("@github/vlrmprjct/pia-database/"+e.userID+"/projects.json",[{}]).then(()=>{s.put("@github/vlrmprjct/pia-database/"+e.userID+"/settings.json",[{}]).then(()=>{}).catch(()=>{})}).catch(()=>{})}).catch(()=>{})})}s()};const m=Object(n.Router)();m.get("/login/github",c.a.authenticate("github")),m.get("/logout",(e,t)=>{delete e.session.token,delete e.session.passport,e.logout(),t.redirect("/login")}),m.get("/login",c.a.authenticate("github",{failureRedirect:"/"}),(e,t)=>{t.redirect("/")});var _=m,y=s(5),b=s.n(y);const O=Object(n.Router)(),D=e=>process.env.DB_PATH+e+"/parts.json",E=new p.a({user:"vlrmprjct",author:{name:"pia app",email:"pia@app"},message:"part created or updated",token:process.env.GITHUB_ACCESS,strict:!1});O.get("/*",(e,t,s)=>{console.log("SESSION: ",e.session),console.log("TOKEN:",e.session.token),console.log("AUTH:",e.isAuthenticated()),console.log("----"),s()}),O.get("/success",(e,t)=>{t.status(200).send({status:"authorized",message:"user is authenticated",token:e.session.token,user:e.session.passport.user})}),O.get("/getuser",(e,t)=>{b()({method:"get",uri:"https://api.github.com/user",headers:{Authorization:"token "+e.session.token,"User-Agent":e.headers["user-agent"]}}).pipe(t)}),O.get("/oemsecret/:query?",(e,t)=>{b()({uri:"https://beta.api.oemsecrets.com/partsearch",qs:{apiKey:process.env.OEMSECRET_API_KEY,searchTerm:e.params.query}}).pipe(t)}),O.get("/mouser/:query?",(e,t)=>{b()({uri:"https://api.mouser.com/api/v1.0/search/keyword",method:"post",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({SearchByKeywordRequest:{keyword:e.params.query,records:0,startingRecord:0}}),qs:{apikey:process.env.MOUSER_API_KEY}}).pipe(t)}),O.get("/parts",(e,t)=>{E.get(D(e.userID)).then(e=>{t.status(200).send(e&&e.reverse())})}),O.get("/partcolumns",(e,t)=>{E.get(process.env.DB_PATH+"structure.json").then(e=>{t.status(200).send(e)})}),O.post("/delete",(e,t)=>{E.delete(D(e.userID),e.body,{id:e.body.id}).then(s=>{t.status(200).send({...s,id:e.body.id})})}),O.post("/part",(e,t)=>{const s=v.a.format(new Date,"YYYY-MM-DD HH:mm:ss"),n={...e.body,date_updated:s};E.update(D(e.userID),n,{id:e.body.id}).then(e=>{t.status(e.code).send(e)})}),O.get("/parts/:id?",(e,t)=>{E.get(D(e.userID),{id:e.params.id}).then(e=>{t.status(200).send(e)})}),O.post("/addpart",(e,t)=>{const s=v.a.format(new Date,"YYYY-MM-DD HH:mm:ss"),n={...e.body,id:f()(),date_created:s,date_updated:s};E.put(D(e.userID),n).then(e=>{t.status(e.code).send({response:e,data:n})})}),O.get("/latestentries",(e,t)=>{E.get(D(e.userID)).then(e=>{t.status(200).send(e&&e.slice(-5).reverse())})});var T=O;const j=r()();c.a.use(new u.Strategy({clientID:process.env.GITHUB_KEY,clientSecret:process.env.GITHUB_SECRET,callbackURL:"/api/login",passReqToCallback:!0},(e,t,s,n,r)=>(e.session.token=t,r(null,n)))),c.a.serializeUser((e,t)=>{t(null,e)}),c.a.deserializeUser((e,t)=>{t(null,e)}),j.use((function(e,t,s){t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),t.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS"),t.header("Access-Control-Allow-Credentials",!0),s()})),j.use(r.a.urlencoded({extended:!0})),j.use(r.a.json()),j.use(r.a.static("dist"));var w={name:"pia.sid",secret:process.env.SESSION_SECRET,resave:!0,rolling:!0,saveUninitialized:!1,cookie:{path:"/",maxAge:2592e6}};"production"===j.get("env")&&(j.set("trust proxy",1),w.cookie.secure=!0),j.use(i()(w)),j.use(c.a.initialize()),j.use(c.a.session()),j.use(h),j.use((e,t,s)=>{s()}),j.use("/api",_),j.use("/api",T),j.listen(process.env.PORT||5e3,()=>{console.info(`Listening on port ${process.env.PORT||5e3}! 👾`)})}]);