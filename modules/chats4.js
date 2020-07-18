//________________________________________TOOLS__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; 
     //* for delay inside async function, use it instead setTimeout
let random =(max)=>{ return Math.floor(Math.random()*max);};
let a ={};

//_________________PART MANAGER (OPCIONAL)
//module.exports.active=false;//previous rh_handler version(true=module on/false=module off);
//exports.RH_IGNORE_TOTAL=true;//add this line to ignore this module 
//exports.RH_IGNORE_COMMANDS=true;//add this line to ignore all commands from this module
//module.exports.RH_BOOTS=true;//add this line to ignore all boots from this module
//module.exports.RH_IGNORE_EVENTS=true;//add this line to ignore all events from this module
//module.exports.RH_IGNORE_EVENTS_PRIMITIVE=true;//add this line to ignore all events_primitive from this module

var logs=true;
//___________________________ETERNAL_VARIABLE_PART
let chats={};
chats.text_channels={};
chats.voice_channels={};
chats.owners={};
exports.e={
  afk_channel_id:'476431736813912068'
  ,main_voice_id:'733084986093076530',
  free_chat_category_id:'729784711710376007'
  ,create_voice_id:'733084986093076530'
  ,create_voice_name:'создать войс'
 ,text_category_id:'729784711710376007'
  ,voice_category_id:'476431736813912067'
   ,sp_role_name:'visible'
 ,mod_role_name:'Супермодератор'
 ,roles_arr:['Супермодератор','☥']
  ,roles_arr_block:['Мертвые души','Muted','Временная роль']
 ,delay_time:2*1000
 ,info:"Вы только что создали войсовый канал, для того чтобы сделать этот текстовый канал доступным для общения людям, находящимся в вашем войсе, воспользуйтесь командой `!открыть чат`. Люди с ролью @visible могут общаться в этом текстовом канале даже не находясь в войсе. Для настроики выборочного доступа воспользуйтесь командой `!блокировать`, а затем дайте доступ нужным людям командой:`!доступ @ник1`. Для бана воспользуйтесь командой `!бан @ник`. Комада для снятия бана:`!разбан`. В команде можно упоминать сразу нескольких людей. Все команды:`!хелп`"
 ,under_limit:"превышен лимит"
 ,no_rights_for_creating:"недостаточно прав"
,you_owner_already:"у вас уже есть войс"
};
module.exports.p={
  opened:[' Текстовый канал открыт ',' Text channel is opened ']
 ,closed:[' Текстовый канал закрыт ',' Text channel is closed ']
 ,blocked:[ ' Текстовый и Войсовый канал заблокировны ',' Text & Voice channel are blocked ']
 ,unblocked:[' Текстовый и Войсовый канал разаблокировны ',' Тext & Voice channel unblocked ']
 ,muted:[' Замучен ',' is muted ']
 ,banned:[' Забанен ',' is banned']
 ,unbanned:[' Разбанен ',' is unbanned ']
 ,right:[' Права переданы ',' Right is redirected ']
 ,reset:[ 'Настройки сброшены ', ' Settings is reseted']
 ,undeleted:[ ' Войс неудаляем теперь ',' Voice is undeleted now ']
 ,deleted:[' Войс удаляем снова ',' Voice is deleted '] 
  ,accessed:[[' Допущен (размучен и разбанен) '],[' accessed(unmuted&unbaned)']]
  ,r:(msg,name,n,mmb)=>{let str=(mmb)?mmb.toString():'';msg.reply(exports.p[name][n]+str);}
};
module.exports.err={
   d:[' Секретная ошибка возникла ',' An secret Error occurs ']
  ,d_:(msg,n)=>{msg.reply(this.d[n]);}
   ,no_rights:[' Недостаточно прав ',' No permissions ']
  ,no_mentioned:[' Не указан @ник ',' No mentioned users ']
  ,r:(msg,name,n)=>{msg.reply(exports.err[name][n]);}
};
//_________global
function Ch(){
  
  this.record = async () =>{
      let data={ voice_id:this.voice_id, owner_id:this.owner_id, role_id:this.role_id };
       chats.text_channels[this.text_id]={data:data};
       chats.voice_channels[this.voice_id]={data:data};
       chats.owners[this.owner_id]={data:data};
       a.LCH.send(JSON.stringify(this));
 };
  this.construct = async(room)=>{
    this.text_id=room.text_id||null;
    this.voice_id=room.voice_id||null;
    this.owner_id=room.owner_id||null;
    this.role_id=room.role_id||null;
    this.record();
  };
  //
  //
 // this.record();
  this.ini=async(channel,owner)=>{
  let room={};
  let free_text = await  a.SRV.channels.cache.find(ch=>ch.name.startsWith('текстовый')&&ch.parent.id==exports.e.text_category_id); 
  if(!free_text) return console.log('no free_text'); 
  room.text_id=free_text.id;
  let num = free_text.name.match(/\d{1,}/g)[0];
  let role = await a.SRV.roles.cache.find(r=>r.name.startsWith('роль'+num)); 
  if(!role) return a.LCH.send('err0 на сервере нет роли  '+'роль'+num);
  room.role_id=role.id; 
  let voice_channel = await channel.clone().catch(console.error);
  let name=(owner.nickname)?owner.nickname:owner.user.username;  
  await voice_channel.edit({name: name});
  room.voice_id=voice_channel.id;
 // room.owner_id=owner.id;
   this.construct(room);
   this.setOwner(owner);
   console.log(this);
    return;
  };
 this.setOwner = async (owner)=>{
   this.owner_id=owner.id;
   let voice_channel= a.SRV.channels.cache.get(this.voice_id); if(!voice_channel) return;
   voice_channel.updateOverwrite(owner, { MANAGE_CHANNEL: true, CONNECT:true, SPEAK:true, MOVE_MEMBERS:true, STREAM:true });
   let text_channel= a.SRV.channels.cache.get(this.text_id); if(!text_channel) return;
   text_channel.updateOverwrite(owner, { VIEW_CHANNEL:true,SEND_MESSAGES:true});
   this.record(this);
   return;
 };
/*
 this.iniciate = async()=>{
  // this.setOwner(obj.owner);
   console.log('owner set');
   
  };
  */
  
};
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots = {}; 
module.exports.boots.someBoot2={on:true,run:async(client)=>{try{

 a.SRV= await client.guilds.cache.get(client.SERVER_ID);
 a.LCH = await client.guilds.cache.get(client.SERVER_ID).channels.cache.find(ch=>ch.name=='logbot');
  
}catch(err){console.log(err);};}};//
//module.exports.boots.someBoot.RH_IGNORE=true;//add this line to ignore this command
//...
module.exports.boots.parseTextChannels={run:async(client)=>{try{
    //code to execut bot on loading
await delay(1000);
module.exports.voice_channels={};
module.exports.text_channels={};
module.exports.owners={};
  //
  //await a.LCH.messages.fetch({limit:100}).catch(console.error);
  let msg_arr= await a.LCH.messages.fetch({limit:10}).then(messages => {
             let msgs =  messages.filter(m=>m.content.indexOf('chatVR')!=-1);// return msgs.first().content.match(/\d{3,}/)[0];
              return msgs;
         }).catch(console.error);
  //
  // let text_channels_arr= await client.guilds.cache.get(client.SERVER_ID).channels.cache.filter(ch=>ch.type=="text"&&ch.parent&&ch.parent.id==exports.e.voice_category_id);
   let obj;
 msg_arr=msg_arr.array();
   msg_arr.map(ch=>{
 console.log(ch.content);
     if(ch.content.indexOf('{')==-1||ch.content.indexOf('}')==-1) return;
     let data1 = JSON.parse(ch.content.trim());
     let data2 = JSON.parse(ch.content.trim());
     //console.log(data1);
     let msg_id=ch.id;
    // ch.id=data1.text_id;
     let text_id=data1.text_id;
     if(exports.text_channels[text_id]) return  console.log('has');
     if(data1){
      let channel_id=data1.id; 
       obj=data1;
       exports.text_channels[text_id]={id:text_id,msg_id:msg_id,data:data2};
       obj.text_channel=exports.text_channels[text_id]; exports.text_channels[text_id].voice_channel=this;
       exports.voice_channels[channel_id]=obj;
       exports.text_channels[text_id].voice_channel=exports.voice_channels[channel_id];
       exports.owners[obj.owner_id]={id:obj.owner_id,voice_channel:exports.voice_channels[channel_id],text_channel:exports.text_channels[text_id]};
      };
     });

 // console.log(exports.voice_channels);
  console.log(exports.text_channels);
 // console.log(exports.owners);

   return;

}catch(err){console.log(err);};}};//
//module.exports.boots.someBoot.RH_IGNORE=true;//add this line to ignore this command

//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands = {};

module.exports.commands.someCommand={aliase:'aliase_for_command', run:async(client,message,args)=>{try{
   //code to execut then this command triggered
}catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command
// ...


//_________________________________________EVENTS_PART_________________________________________________
module.exports.events={};

module.exports.events.message={ on:true,run:async(client,message)=>{try{
 

}catch(err){console.log(err);};}};//
//module.exports.events.someEvent.RH_IGNORE=true;//add this line to ignore this event trigger
// ...
//_________________________________________EVENTS_PART_END__________________________________________

//______________________________EVENTS PRIMITIVE
module.exports.events_primitive={};

module.exports.events_primitive.SOME_EVENT_NAME={run:async(client,event)=>{try{
      //some code here
}catch(err){console.log(err);};}};//
//module.exports.events_primitive.SOME_EVENT_NAME.RH_IGNORE = true;//add this line to ignore this primitive event trigger
module.exports.events.voiceStateUpdate={ on:true,  run:async(client,oldState,newState)=>{try{
   if (!oldState || !newState) return;
  console.log('vsu');
  let newMember=newState; newMember.voiceChannel=newState.channel; newMember.voiceChannelID=(newState.channel)?newState.channel.id:false;
  let oldMember=oldState; oldMember.voiceChannel=oldState.channel; oldMember.voiceChannelID=(oldState.channel)?oldState.channel.id:false;
 
let inside = newMember.voiceChannel!=undefined&&newMember.voiceChannel.parent.id==exports.e.voice_category_id;
let out = oldMember.voiceChannel!=undefined&&oldMember.voiceChannel.parent.id==exports.e.voice_category_id;

if (inside) {console.log('inside');}else if(out){console.log('out')};
  let income = (exports.voice_channels[newMember.voiceChannelID])?newMember.voiceChannelID:false; 
  let outcome = (exports.voice_channels[oldMember.voiceChannelID])?oldMember.voiceChannelID:false;
  let create_voice_income = !!(newMember.voiceChannelID==module.exports.e.main_voice_id);
  if(!(income||outcome||create_voice_income||out)) {return console.log('nothing');};
  let member = a.SRV.members.cache.get(newMember.id);
  
  //DISCONNECT CASE
   if(out&&!outcome&&(oldMember.voiceChannelID!=module.exports.e.main_voice_id)) { 
     console.log('out');
      if(oldMember.voiceChannel.members.array().length==0) {console.log('del'); await oldMember.voiceChannel.delete();};
 };
  if(outcome) { // await exports.onDisconnect(client,oldMember,newMember);
    console.log(outcome);
     let voiceChannel=await member.guild.channels.cache.get(outcome);
     await member.roles.remove(member.guild.roles.cache.get(exports.voice_channels[outcome].role_id)).catch(console.error);
     if(voiceChannel.members.array().length==0) {module.exports.onVoiceClose(client,member,voiceChannel);};
  };
 //CONNECT CASE
  if(newMember.voiceChannel!=undefined) {
     if(create_voice_income){ return exports.createNewVoice(client,oldMember,newMember);};//if new chat creation inicialized
     if(income){//return exports.onConnect(client,oldMember,newMember);
                let voiceChannel=await member.guild.channels.cache.get(income);
                await member.roles.add(member.guild.roles.cache.get(exports.voice_channels[income].role_id)).catch(console.error);
      };//if mmb join to voice chat
  };
  


  
 }catch(err){console.log(err);};}};// 
//_____________SUB FUNCTION
//______________sf01
exports.onChatCreate=async(client,owner,channel)=>{
try{ 

   a.LCH.send('cv ini');
  /*
  let free_text = await  a.SRV.channels.cache.find(ch=>ch.name.startsWith('текстовый')&&ch.parent.id==exports.e.text_category_id);
  let num = free_text.name.match(/\d{1,}/g)[0];
  let role = await a.SRV.roles.cache.find(r=>r.name.startsWith('роль'+num)); 
  if(!role) return a.LCH.send('err0 на сервере нет роли  '+'роль'+num);
  let voice_channel = await channel.clone().catch(console.error);
  let name=(owner.nickname)?owner.nickname:owner.user.username;  
  await voice_channel.edit({name: name});
  let obj={};
  */
/*
obj.text_id=free_text.id;
obj.role_id=role.id;
obj.owner_id=owner.id;
obj.voice_id=voice_channel.id;
  a.LCH.send(JSON.stringify(obj));
  */
  
 // await voice_channel.overwritePermissions([owner],{ VIEW_CHANNEL:null}).catch(console.error);
  

  
 


let ch = new Ch();
  ch.ini(channel, owner);

console.log(chats);
  
  
}catch(err){console.log(err);};
};//createRole end
exports.sf01=async(client)=>{
try{ 
   
}catch(err){console.log(err);};
};//createRole end

exports.createNewVoice=async(client,oldState,newState)=>{try{ //triggered then new chat creating
         if(logs) console.log("create new voice");
         let channel=newState.channel;
         let member=channel.guild.members.cache.get(newState.member.id);
         let is_able= await member.roles.cache.find(r=>exports.e.roles_arr.includes(r.name))||member.user.id==channel.guild.owner.id;
         if(!is_able) {
 let sv_name=await channel.name;await channel.edit({name:exports.e.no_rights_for_creating}).catch(console.error);await delay(exports.e.delay_time);await channel.edit({name:sv_name}).catch(console.error);
         return;}; 
         let more=member.roles.cache.find(r=>r.name==exports.e.mod_role_name)||member.user.id==channel.guild.owner.id;
         if(exports.owners[member.user.id]&&!more){ return ;};
  //____________LINK FREE TEXT CHAT
       let free_chat=await channel.guild.channels.cache.find(ch=>ch.name.startsWith('текстовый')&&ch.parent.id==exports.e.free_chat_category_id); console.log('find free');
            if(!free_chat){return;};
//__________________CREATE VOICE CHANNEL
        let new_channel=await channel.clone().catch(console.error);
       let name=(member.nickname)?member.nickname:member.user.username;  
       await new_channel.edit({name: name});
        //await new_channel.setBitrate(128).catch(console.error);
        let parent2 = await channel.guild.channels.cache.get(exports.e.free_chat_category_id);
        if(parent2) {await new_channel.setParent(parent2.id).then(ch => { ch.lockPermissions(); }).catch(console.error);};
        await new_channel.setParent(channel.parentID).catch(console.error);
       await exports.voiceSetOwnerPermissions(client,member,new_channel).catch(console.error);
        await new_channel.updateOverwrite(a.SRV.roles.everyone, { VIEW_CHANNEL:null });

      let role_id = free_chat.name.match(/\d{1,}/)[0]; if(!role_id) return; console.log(role_id);
      let role = await free_chat.guild.roles.cache.find(r=>r.name=='роль'+role_id); 
      if(!role) return; 
       await free_chat.updateOverwrite(role, { VIEW_CHANNEL:true });
      //if (logs) console.log(role.name);
      let cht='chat'+free_chat.id;
      let data = {chatVR:true,text_id:free_chat.id,id:new_channel.id, owner_id:member.user.id, role_id:role.id,ud:0, opened:0, blocked:0};
      a.LCH.send(JSON.stringify(data));
      await free_chat.setParent(channel.parentID).catch(console.error);
      if(logs) console.log('set parent for text channel'); 
      await free_chat.updateOverwrite(member.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
        if(logs) console.log('chat, text channel, set permissions for owner')
         await free_chat.updateOverwrite(a.SRV.roles.everyone, { VIEW_CHANNEL: false }).catch(console.error);
        if(logs) console.log('chat, text channel, set permissions for everyone role')
        await module.exports.boots.parseTextChannels.run(client);//update chat`s structure
        await member.voice.setChannel(new_channel).catch(console.error);
        await delay(1000);
        let msg = await free_chat.send(member.toString()+'`!хелп`-список всех команд. \n Войс удалится сам, после выхода всех участников.\n');
       // await exports.commands.chatHelp2.run(client,msg,['']);
        
  
       return;
}catch(err){console.log(err);};};//exports.createNewVoice end

//
//______________sf05
exports.onVoiceClose=async(client,member,channel)=>{try{ //triggered them last mmb left the voice channel
          // let member=oldMember.guild.members.cache.get(oldMember.user.id);
          // let channel=member.guild.channels.cache.get(oldMember.voiceChannel.id);
           if(exports.voice_channels[channel.id].ud==1) return;
           let text_channel_id= exports.voice_channels[channel.id].text_id;
           let role_id=exports.voice_channels[channel.id].role_id;
           let role = member.guild.roles.cache.get(role_id);
           let owner_id=exports.voice_channels[channel.id].owner_id;
           //if(role) await role.delete();
           let text_channel=await member.guild.channels.cache.get(text_channel_id);
            if(text_channel){ 
                 //await text_channel.edit({name:'fch'+role_id,topic:''});
                 let parent = await member.guild.channels.cache.get(exports.e.free_chat_category_id);
                 if(parent) {await text_channel.setParent(parent.id).then(channel => { channel.lockPermissions().catch(console.error); }).catch(console.error);};
                 text_channel.send(channel.name+' end');
           };
         
          if(channel) await channel.delete();
          let msg_id_=exports.text_channels[text_channel_id].msg_id;
          console.log('msg'+msg_id_);
          
         let msg_test= await a.SRV.channels.cache.find(ch => ch.name=='logbot').messages.fetch(msg_id_)
  .then(msg => {
   return msg;
  })
  .catch(err => console.error);
 // let msg_test =await a.LCH.send('1');
  await delay(500);
  await msg_test.delete();
   
          //await msg.delete().catch(err=>console.error);
          let data = exports.text_channels[text_channel_id].data;
          data.chatVR=false;
          //a.LCH.send(JSON.stringify(data));
          await module.exports.boots.parseTextChannels.run(client);//update chat`s structure
         // let afk=await newMember.guild.channels.get(exports.e.afk_channel_id); 
         //if(!afk) return;
         // await afk.overwritePermissions(newMember.user,{MOVE_MEMBERS:null}).catch(console.error);
         await delay(1000);
          await role.members.map(m=> m.role.remove(role).then(()=>console.log(m.user.username)).catch(err=>console.log(err)) );
        //clear role from all passivle members
          return;
}catch(err){console.log(err);};};

//-----------------
exports.voiceSetOwnerPermissions=async(client,mmb,new_channel)=>{try{ //on voice chat create
await new_channel.updateOverwrite(mmb.user,{ MANAGE_CHANNELS: true,PRIORITY_SPEAKER:true,CONNECT:true,MOVE_MEMBERS:true
,USE_VAD:true,SPEAK:true,MOVE_MEMBERS:true}).catch(console.error);
let afk=await mmb.guild.channels.cache.get(exports.e.afk_channel_id); 
if(!afk) return;await afk.updateOverwrite(mmb.user,{MOVE_MEMBERS:true}).catch(console.error);
}catch(err){console.log(err);};};

//____
exports.getProps=async(client,message,args)=>{try{ 
          let obj={};
          if (!exports.text_channels[message.channel.id]) return;
          obj.owner_id=exports.text_channels[message.channel.id].voice_channel.owner_id;
          obj.owner=exports.text_channels[message.channel.id].voice_channel.owner_id==message.author.id;
          obj.sm=message.member.roles.cache.find(r=>r.name==exports.e.mod_role_name)||message.member.user.id==message.guild.owner.id;
          obj.any=obj.owner||obj.sm;
          obj.any_no=()=>{exports.err.r(message,'no_rights',0)};
          obj.mnt=message.mentions&&message.mentions.members.first();
          obj.no_mnt=()=>{exports.err.r(message,'no_mentioned',0);};
          return obj;
}catch(err){console.log(err);};};
//------
//__________________open text chat
module.exports.commands.textOpen={aliase:'открыть'
,description:[[" чат"," Делает текстовый видимым людям в вашем войсе (*ПО УМОЛЧАНИЮ ОТКРЫТ*)",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no();
      let role_id=exports.text_channels[message.channel.id].data.role_id; if(!role_id){exports.err.r(message,'d',0); return;};
      let role=await message.guild.roles.cache.get(role_id); if(!role){exports.err.r(message,'d',0); return;};
      await message.channel.updateOverwrite(role, { VIEW_CHANNEL: true}).then(exports.p.r(message,'opened',0)).catch(err=>{console.log(err);exports.err.r(message,'d',0);});
  
       return;
}catch(err){console.log(err);};}};//
//_________________close text chat
module.exports.commands.textClose={aliase:'закрыть'
,description:[[" чат"," Опять делает текстовый невидимым для всех.",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no();
     // exports.textSetPermissions2(client,message.member,message.channel,'close'); message.reply('ok');
//_
   let role_id=exports.text_channels[message.channel.id].data.role_id; if(!role_id){exports.err.r(message,'d',0); return;};
   let role=await message.guild.roles.cache.get(role_id); if(!role){message.channel.reply(exports.err.d[0]); return;};
   await message.channel.updateOverwrite(role, { VIEW_CHANNEL: null}).then(exports.p.r(message,'closed',0)).catch(err=>{console.log(err);exports.err.r(message,'d',0);});
   
      
//_
      return;
}catch(err){console.log(err);};}};//







//_________________ban mmbs and roles
module.exports.commands.mute={aliase:'мут' 
//,description:[[" @мут"," забанить участника в вашем войсе и текстовом, что б не мог зайти."]]
,description:[
       [' @ник',' Запретить говорить в войсе. (сможет только слушать) ','1']
     // ,[' название роли',' Люди с этой ролью смогут слушать но не говорить.','1']
]
,help_type:'extended'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no(); if(!obj.mnt) return obj.no_mnt();
      await exports.setPerms(client,message,['','-']); 
      return;
}catch(err){console.log(err);};}};//
//_________________unban mmbs and roles
/*
module.exports.commands.unban={aliase:'разбан',description:[
[" @ник"," Разбан и размут в текстовом и войсе.",0]
,[' название роли',' Разбан и размут роли в текстовом и войсе.',1]
],help_type:'both'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no();
      await exports.setPerms(client,message,['','+']);
      message.reply('ok');  return;
}catch(err){console.log(err);};}};//
*/
//__________________block chat
module.exports.commands.chatBlock2={aliase:'заблокировать'                          
,description:[[" "," Сделать закрытый всем маня мирок в войсе. (*ПО УМОЛЧАНИЮ РАЗБЛОКИРОВАН*)(Уже находящимся в войсе выдадутся права доступа)",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return; console.log('2');
      //  exports.onChatBlockPerms2(client,message.channel,voice_chat);
  await voice_chat.updateOverwrite(voice_chat.guild.roles.everyone, { CONNECT: false }).catch(console.error);
          voice_chat.members.map(m=>{
		          if(m&&m.id!=exports.voice_channels[voice_chat.id].owner_id&&m.voiceChannelID==voice_chat.id) {
     		          	voice_chat.updateOverwrite(m.user, { CONNECT:true }).then(() => console.log(`${m.displayName}`)).catch(console.error);;
		           };
          });
        await module.exports.p.r(message,'blocked',0);
        return;
}catch(err){console.log(err);};}};//
module.exports.commands.chatBlock2.data={
  class:'help', sub_class:'base'
};
//__________________block chat
module.exports.commands.chatBlock={aliase:'заблокировать2'
,description:[[" "," Та же команда что и выше, но выкинет из войса всех кому прежде не был выдан персональный доступ.",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args); if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return; console.log('2');
        //exports.onChatBlockPerms(client,message.channel,voice_chat);
         await voice_chat.updateOverwrite(voice_chat.guild.roles.everyone, { CONNECT: false }).catch(console.error);
      let afk=await voice_chat.guild.channels.cache.get(exports.e.afk_channel_id);
	    voice_chat.members.map(m=>{
	  	    if(m&&m.id!=exports.voice_channels[voice_chat.id].owner_id&&m.voiceChannelID==voice_chat.id&&!m.roles.find(r=>r.name==exports.e.mod_role_name)) {
     		    	m.voice.setChannel(afk.id).then(() => console.log(`Moved ${m.displayName}`)).catch(console.error);
	      	};
      });
       await module.exports.p.r(message,'blocked',0);
        return;
}catch(err){console.log(err);};}};//
//__________________unblock chat
module.exports.commands.chatUnBlock={aliase:'разблокировать'
,description:[[" "," Позволить заходить в войс всем желающим.",'0']]
,help_type:'base'
,run:async(client,message,args)=>{try{console.log('unblock');
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return;
        exports.onChatUnBlockPerms(client,message.channel,voice_chat);
        await module.exports.p.r(message,'unblocked',0);
        return;
}catch(err){console.log(err);};}};//

//_________________ban mmbs and roles
module.exports.commands.ban={aliase:'бан'
,description:[
      // [" @ник"," Выкинуть из вашего войса тех кто не нравится.",'0']
      [" @ник @ник @ник"," Выкинуть толпу неугодных одним махом.\n(так же можно и мутить и разбанивать по несколько человек)",'0']
     // ,[" название роли"," Забанить роль, что б ее обладатели не могли зайти.",'1']
]
,help_type:'both'
,run:async(client,message,args)=>{try{
      let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no(); if(!obj.mnt) return obj.no_mnt();
      await exports.setPerms(client,message,['','--']);
      return;
}catch(err){console.log(err);};}};//
//__________________access chat
module.exports.commands.giveAccess={aliase:'доступ'
,description:[[" @ник @ник @ник"," Пригласить в прежде заблокированный войс кучку избранных.(Команда так же **размучивает** и **разбанивает**)",'0']
              //,[" @ник"," Или по одному.",'0']
              ,[" название роли"," дать доступ роли",'1']
              ,[" название роли,название роли"," или сразу нескольким",'1']
              ,[" @ник @ник название роли,название роли"," или так",'1']
             ]
,help_type:'base'
,run:async(client,message,args)=>{try{ console.log('give');
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return obj.any_no();
        let voice_chat = message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return exports.err.r(message,'d',0);
        await exports.setPerms(client,message,['','+++']);
          
        return;
}catch(err){console.log(err);};}};//

//__________________rights chat
module.exports.commands.redirectOw={aliase:'права'
,description:[[" @ник"," Передать права на войс другому.",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{ console.log('redirect run');
        let obj = await exports.getProps(client,message,args); if (!obj.any) return obj.any_no(); if(!obj.mnt) return obj.no_mnt();
       
        let voice_channel=message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id);
        await exports.SetOwnerPermissions(client,message.mentions.members.first(),voice_channel,message.channel);//b
        await exports.ReSetOwnerPermissions(client,message.member,voice_channel,message.channel);//b
      //  await message.channel.edit({topic:new_topic}).then().catch(console.error);
       exports.text_channels[message.channel.id].data.owner_id=message.mentions.members.first().id;
       let cnt = await JSON.stringify(exports.text_channels[message.channel.id].data); 
         let msg_data= await a.LCH.messages.fetch(module.exports.text_channels[message.channel.id].msg_id).catch(err=>console.error);
          await msg_data.edit(cnt);
        await exports.boots.parseTextChannels.run(client);
         await module.exports.p.r(message,'right',0,message.mentions.members.first());
       return;
}catch(err){console.log(err);};}};//
//__________________mk undeleteble text chat
module.exports.commands.makeUndeletable={aliase:'неудалять'
,description:[[" чат"," Не удалять войс после выхода всех. (для супермодеров). ",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.sm) return;

        exports.text_channels[message.channel.id].data.ud=1;
        let cnt = await JSON.stringify(exports.text_channels[message.channel.id].data); 
        let msg_data= await a.LCH.messages.fetch(module.exports.text_channels[message.channel.id].msg_id).catch(err=>console.error);
        await msg_data.edit(cnt);
        await exports.boots.parseTextChannels.run(client);

       await module.exports.p.r(message,'undeleted',0);
       return;
}catch(err){console.log(err);};}};//
//__________________mk deleteble text chat
module.exports.commands.makeDeletable={aliase:'удалять'
,description:[[" чат"," Удалить войс после выхода всех из него. (для супермодеров)",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.sm) return;
        exports.text_channels[message.channel.id].data.ud=0;
        let cnt = await JSON.stringify(exports.text_channels[message.channel.id].data); 
         let msg_data= await a.LCH.messages.fetch(module.exports.text_channels[message.channel.id].msg_id).catch(err=>console.error);
          await msg_data.edit(cnt);
        await exports.boots.parseTextChannels.run(client);
        await module.exports.p.r(message,'deleted',0);
       return;
}catch(err){console.log(err);};}};//
//__________________reset chat
module.exports.commands.chatReset={aliase:'сбросить'
,description:[[" настройки"," Возвращает настройки в исходное положение. ",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
        let obj=await exports.getProps(client,message,args);  if(!obj.any) return; console.log('1');
        let voice_chat = message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_chat) return;            
        let text_channel=message.channel;
        let role=message.guild.roles.cache.get(exports.voice_channels[voice_chat.id].role_id); if(!role) return;
        let member = await message.guild.members.cache.get(obj.owner_id);
        await exports.reset(client,member,voice_chat,text_channel,role);
        await module.exports.commands.chatUnBlock.run(client,message,[]);
        await module.exports.commands.textOpen.run(client,message,[]);
       await module.exports.p.r(message,'reset',0);

}catch(err){console.log(err);};}};//
//__________________delete chat
module.exports.commands.delete={aliase:'удалить'
,description:[[" текстовый"," Удаляет текстовый. (для супермодеров) ",'1']]
,help_type:'base'
,run:async(client,message,args)=>{try{
          let obj = await exports.getProps(client,message,args); if(!obj.sm) return;
          let member=message.member;
          let text_channel = message.channel;
          
           let role_id=exports.text_channels[text_channel.id].voice_channel.role_id;
           let role = await message.member.guild.roles.cache.get(role_id);
           if(text_channel){ 
                 let parent = await member.guild.channels.cache.get(exports.e.free_chat_category_id);
                 if(parent) {await text_channel.setParent(parent.id).then(channel => { channel.lockPermissions().catch(console.error); }).catch(console.error);};
                 text_channel.send(text_channel.name+' end');
             };
         
          //await  delete exports.voice_channels[text_channel.id];
          //await delete exports.text_channels[text_channel.id];
          let msg_data= await a.LCH.messages.fetch(module.exports.text_channels[message.channel.id].msg_id).catch(err=>console.error);
          await msg_data.delete().catch(err=>console.log(err));
          await module.exports.boots.parseTextChannels.run(client);//update chat`s structure
          await delay(1000);
          await role.members.map(m=> m.roles.remove(role).then(()=>console.log(m.user.username)).catch(err=>console.log(err)) );
          return;

}catch(err){console.log(err);};}};//
       

//_________________________help2
module.exports.commands.chatHelp2={aliase:'хелп?', run:async(client,message,args)=>{try{
      let extended=(args[1]=='+'); let all=(args[1]=='*'); let extended_type=0; let base=true; 
      let desc=(extended)?'РАСШИРЕННЫЕ КОМАНДЫ':(all)?'все комнады':'ОСНОВНЫЕ КОМАНДЫ ';
      let obj=exports.commands; let str=' \n'; let obj2={};  
      let link = "https://discordapp.com/channels/"+message.guild.id+"/"+message.channel.id;
      let link_str='('+link+')';
      for(let key in obj){
         obj2=obj[key];
         if(!obj2.description||!obj2.help_type) continue;
         for(let i=0;i<obj2.description.length;i++){
             if(all){
                     str+='``'+client.prefix+obj2.aliase+obj2.description[i][0]+'``'+obj2.description[i][1]+'\n';
                  // str+='['+client.prefix+obj2.aliase+obj2.description[i][0]+']'+link_str+obj2.description[i][1]+'\n';
              }else if(extended&&(obj2.description[i][2]=='1')){ 
                     str+='``'+client.prefix+obj2.aliase+obj2.description[i][0]+'``'+obj2.description[i][1]+'\n';
                //str+='['+client.prefix+obj2.aliase+obj2.description[i][0]+']'+link_str+obj2.description[i][1]+'\n';
              }else if(!extended&&(obj2.description[i][2]!='1')){str+='``'+client.prefix+obj2.aliase+obj2.description[i][0]+'``'+obj2.description[i][1]+'\n';};
         };//for end
         
       }
      // str+='``'+client.prefix+'хелп +`` - расширенные команды'+' ``'+client.prefix+'хелп *`` - все команды'; 
       console.log(str.length);
       let toSend=(str.length>1000)?str:{ embed:{fields:[{name:desc+" !хелп - все команды",value:str}]} };
      message.channel.send(toSend);
        
 }catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command

//______________________help
module.exports.commands.chatHelp={aliase:'хелп', run:async(client,message,args)=>{try{
      await exports.commands.chatHelp2.run(client,message,['']);
      await exports.commands.chatHelp2.run(client,message,['','+']);
      //await message.channel.send('`!хелп` - все команды `!хелп?` - основные `!хелп? +`  второстепенные');
        
 }catch(err){console.log(err);};}};//
//module.exports.commands.someCommand.RH_IGNORE=true;//add this line to ignore this command

//____________________________
//______________sf03 reset
exports.reset=async(client,member,new_channel,free_chat,role)=>{try{ //triggered then new chat creating
        let parent1= new_channel.parentID;
        let parent2 = await new_channel.guild.channels.cache.get(exports.e.free_chat_category_id);
        if(parent2) {await new_channel.setParent(parent2.id).then(ch => { ch.lockPermissions(); }).catch(console.error);};
        await new_channel.setParent(parent1).catch(console.error);
        await exports.voiceSetOwnerPermissions(client,member,new_channel).catch(console.error);
        await new_channel.updateOverwrite(new_channel.guild.roles.everyone,{ VIEW_CHANNEL:null}).catch(console.error);
        await free_chat.setParent(parent2).then(ch => { ch.lockPermissions(); }).catch(console.error);
        await free_chat.setParent(parent1).catch(console.error);
        await exports.textSetPermissions1(client,member,free_chat);
        return;
}catch(err){console.log(err);};};//exports.createNewVoice end

exports.voiceSetOwnerPermissions=async(client,mmb,new_channel)=>{try{ //on voice chat create
await new_channel.updateOverwrite(mmb.user,{ MANAGE_CHANNELS: true,PRIORITY_SPEAKER:true,CONNECT:true,MOVE_MEMBERS:true
,USE_VAD:true,SPEAK:true,MOVE_MEMBERS:true}).catch(console.error);
let afk=await mmb.guild.channels.cache.get(exports.e.afk_channel_id); 
if(!afk) return;await afk.updateOverwrite(mmb.user,{MOVE_MEMBERS:true}).catch(console.error);
}catch(err){console.log(err);};};

exports.voiceReSetOwnerPermissions=async(client,mmb,new_channel)=>{try{ //on voice chat create
await new_channel.updateOverwrite(mmb.user,{ MANAGE_CHANNELS: null,PRIORITY_SPEAKER:null,CONNECT:null,MOVE_MEMBERS:null
,USE_VAD:null,SPEAK:null,MOVE_MEMBERS:null}).catch(console.error);
}catch(err){console.log(err);};};


//_______________
exports.SetOwnerPermissions=async(client,mmb,voice_channel,text_channel)=>{try{ //on voice chat create
     await voice_channel.updateOverwrite(mmb.user,{VIEW_CHANNEL:true, MANAGE_CHANNELS: true,PRIORITY_SPEAKER:true,CONNECT:true,MOVE_MEMBERS:true
     ,USE_VAD:true,SPEAK:true,MOVE_MEMBERS:true}).catch(console.error);
     await text_channel.updateOverwrite(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
     let afk=await mmb.guild.channels.cache.get(exports.e.afk_channel_id); 
     if(!afk) return;await afk.updateOverwrite(mmb.user,{MOVE_MEMBERS:true}).catch(console.error);
}catch(err){console.log(err);};};

exports.ReSetOwnerPermissions=async(client,mmb,voice_channel,text_channel)=>{try{ //on voice chat create
     await voice_channel.updateOverwrite(mmb.user,{ MANAGE_CHANNELS: null,PRIORITY_SPEAKER:null,CONNECT:null,MOVE_MEMBERS:null
,USE_VAD:null,SPEAK:null,MOVE_MEMBERS:null}).catch(console.error);
     await text_channel.updateOverwrite(mmb.user,{VIEW_CHANNEL:null,SEND_MESSAGES:null}).catch(console.error);
}catch(err){console.log(err);};};
//_______________

exports.textSetPermissions1=async(client,mmb,free_chat)=>{try{ //on text chat create
          await free_chat.updateOverwrite(mmb.user,{VIEW_CHANNEL:true,SEND_MESSAGES:true}).catch(console.error);
          await free_chat.updateOverwrite(mmb.guild.roles.everyone, { VIEW_CHANNEL: false }).catch(console.error);
}catch(err){console.log(err);};};


//______block
/*
exports.onChatBlockPerms=async(client,text_chat,voice_chat)=>{try{ //on block
       
      await voice_chat.updateOverwrite(voice_chat.guild.roles.everyone, { CONNECT: false }).catch(console.error);
      let afk=await voice_chat.guild.channels.cache.get(exports.e.afk_channel_id);
	    voice_chat.members.map(m=>{
	  	    if(m&&m.id!=exports.voice_channels[voice_chat.id].owner_id&&m.voiceChannelID==voice_chat.id&&!m.roles.find(r=>r.name==exports.e.mod_role_name)) {
     		    	m.voice.setChannel(afk.id).then(() => console.log(`Moved ${m.displayName}`)).catch(console.error);
	      	};
      });

//___
          return;
}catch(err){console.log(err);};};
*/
//____
//______block
/*
exports.onChatBlockPerms2=async(client,text_chat,voice_chat)=>{try{ //on block
        
          await voice_chat.updateOverwrite(voice_chat.guild.roles.everyone, { CONNECT: false }).catch(console.error);
          voice_chat.members.map(m=>{
		          if(m&&m.id!=exports.voice_channels[voice_chat.id].owner_id&&m.voiceChannelID==voice_chat.id) {
     		          	voice_chat.updateOverwrite(m.user, { CONNECT:true }).then(() => console.log(`${m.displayName}`)).catch(console.error);;
		           };
          });
     return;
}catch(err){console.log(err);};};
*/
//____
//______unblock
exports.onChatUnBlockPerms=async(client,text_chat,voice_chat)=>{try{ //on text chat block
        
          await voice_chat.updateOverwrite(voice_chat.guild.roles.everyone, { CONNECT: true});
          return;
}catch(err){console.log(err);};};
//____
//______give access
exports.onGiveAccess=async(client,message,text_chat,voice_chat)=>{try{ //on text chat unblock
          let users_arr=message.mentions.users;
          users_arr.map(u=>{
              voice_chat.updateOverwrite(u, { CONNECT:true }).catch(console.error);
            
          });
          return;
}catch(err){console.log(err);};};
//______ungive access
exports.onUnGiveAccess=async(client,message,text_chat,voice_chat)=>{try{ //
          let users_arr=message.mentions.users;
          users_arr.map(u=>{
              voice_chat.updateOverwrite(u, { CONNECT:null}).catch(console.error);
            
          });
          return;
}catch(err){console.log(err);};};

//_______________
//_________________
exports.getId=async(str1,str2)=>{try{ 
           return str1.exec(str2)[0].slice(3); 
}catch(err){console.log(err);};};

exports.record=async(client,channel_id,name,value)=>{try{ 
           if(!module.exports.channels[channel_id]) module.exports.channels[channel_id]={};
           module.exports.channels[channel_id][name]=value;
}catch(err){console.log(err);};};


exports.setPerms=async(client,message,args)=>{try{ 
        
    //let mmbs_arr=message.mentions.members.keyArray();
    if(!message.mentions) return;
    let m_c=message.content;
    let users_arr=message.mentions.users;
    let roles_arr = message.mentions.roles;
    /*
  let roles_arr=[];
    m_c=m_c.split(' '); m_c.shift(); m_c=m_c.join(" ");
    m_c=m_c.replace(/<@\u0021?\d{1,}>/g,"").trim();
let roles_name_arr=false;
console.log(m_c);
if(m_c.indexOf(',')!=-1&&m_c.length>0){
   let str = m_c.split(','); roles_name_arr=str;
}else{roles_name_arr=[m_c.trim()];}
  console.log(m_c);
  //
   //let roles_name_arr=(m_c.length>0)?m_c.split('[')[1].split(']')[0]:false;
 if(roles_name_arr){
 //roles_name_arr=(roles_name_arr.indexOf(',')!=-1)?roles_name_arr.split(","):[roles_name_arr];//};
 //  console.log(roles_name_arr);
  
await roles_name_arr.map(rname=>{
        let role=message.guild.roles.cache.find(r=>r.name.toLowerCase()==rname.toLowerCase().trim());
        if(role&&role.name!="Супермодератор") roles_arr.push(role);
   });
                   };
  */
   //__
    let afk=message.guild.channels.cache.get(exports.e.afk_channel_id);
    let obj={размут:'+',разбан:'++','мут':'-','бан':'--'};
    for(let key in obj){
     let a = new RegExp(key);
     args[1]=args[1].replace(a,obj[key]); 
    };
// };
   
     async function setPerms(item_mmb,args){
//___________text
      if(args[1]=='-текст'){//mute on text channel
        await message.channel.updateOverwrite(item_mmb, { SEND_MESSAGES:false}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='--текст'){//ban on text channel
        await message.channel.updateOverwrite(item_mmb, { SEND_MESSAGES:false}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='+текст'){//unban on text channel
        await message.channel.updateOverwrite(item_mmb, { SEND_MESSAGES:true}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='++текст'){//unmute on text channel
        await message.channel.updateOverwrite(item_mmb, { VIEW_CHANNEL:null}).catch(err=>console.log(err));
        return;
     }else if(args[1]=='+++текст'){//unmute on text channel
        await message.channel.updateOverwrite(item_mmb, {VIEW_CHANNEL:null,SEND_MESSAGES:true}).catch(err=>console.log(err));
        return;
     };;
//_____________voice    
     let voice_channel=await message.guild.channels.cache.get(exports.text_channels[message.channel.id].voice_channel.id); if(!voice_channel) return;
     if(args[1]=='-войс'){//mute on voice channel
        await voice_channel.updateOverwrite(item_mmb, { SPEAK:false}).then(exports.p.r(message,'muted',0,item_mmb)).catch(err=>console.log(err));
       if(item_mmb.username&&voice_channel.members.get(item_mmb.id)) {await message.guild.members.cache.get(item_mmb.id).voice.setChannel(afk).catch(console.error);
  await message.guild.members.get(item_mmb.id).setVoiceChannel(voice_channel).catch(console.error); };
        return;
     }else if(args[1]=='--войс'){//ban on voice channel
        await voice_channel.updateOverwrite(item_mmb, { CONNECT:false}).then(exports.p.r(message,'banned',0,item_mmb)).catch(err=>console.log(err));
        if(item_mmb.username&&voice_channel.members.get(item_mmb.id)) {await message.guild.members.cache.get(item_mmb.id).voice.setChannel(afk).catch(console.error);};
        return;
     }else if(args[1]=='+войс'){//unmute on voice channel
        await voice_channel.updateOverwrite(item_mmb, { SPEAK:null,CONNECT:null}).then(exports.p.r(message,'unmuted',0,item_mmb)).catch(err=>console.log(err));
        return;
     }else if(args[1]=='++войс'){//unban on voice channel
       await voice_channel.updateOverwrite(item_mmb, { CONNECT:null}).then(exports.p.r(message,'unbanned',0,item_mmb)).catch(err=>console.log(err));
       return;
     }else if(args[1]=='+++войс'){//unban on voice channel
       await voice_channel.updateOverwrite(item_mmb, { CONNECT:true,SPEAK:true}).then(exports.p.r(message,'accessed',0,item_mmb)).catch(err=>console.log(err));
       return;
     };
//______________
     if(args[1]=='--'){//ban on text and voice channels
        await setPerms(item_mmb,['','--войс']); await setPerms(item_mmb,['','-текст']);  return;
     }else if(args[1]=='-'){//mute on text and voice channels
        await setPerms(item_mmb,['','-войс']);  await setPerms(item_mmb,['','-текст']); return;
    }else if(args[1]=='+++'){//unban on text and voice channels
       await setPerms(item_mmb,['','+++войс']); await setPerms(item_mmb,['','+текст']);  return
     }else if(args[1]=='++'){//unban on text and voice channels
       await setPerms(item_mmb,['','++войс']); await setPerms(item_mmb,['','+текст']); return;
     }else if(args[1]=='+'){//unmute on text and voice channels
       await setPerms(item_mmb,['','+войс']); await setPerms(item_mmb,['','+текст']); return;
     };

//_______
};

   if (roles_arr) roles_arr.map(u=>setPerms(u,args));
   if (users_arr) users_arr.map(u=>{
     let sp=message.guild.members.cache.get(u.id)&&message.guild.members.cache.get(u.id).roles.cache.find(r=>r.name==exports.e.mod_role_name);
     if(u.id!=message.member.user.id&&u.id!=client.user.id&&u.id!=message.guild.owner.id&&!sp){setPerms(u,args);} });
 return;
}catch(err){console.log(err);};};
