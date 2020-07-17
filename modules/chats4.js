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
  main_voice_id:'733084986093076530',
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
//
module.exports.voice_channels={};
module.exports.text_channels={};
module.exports.owners={};
  //
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
  await a.LCH.messages.fetch({limit:100}).catch(console.error);
  let msg_arr= await a.LCH.messages.fetch({limit:10}).then(messages => {
             let msgs =  messages.filter(m=>m.content.indexOf('chatVR')!=-1);// return msgs.first().content.match(/\d{3,}/)[0];
              return msgs;
         }).catch(console.error);
  //
  // let text_channels_arr= await client.guilds.cache.get(client.SERVER_ID).channels.cache.filter(ch=>ch.type=="text"&&ch.parent&&ch.parent.id==exports.e.voice_category_id);
   let obj;
  msg_arr=msg_arr.array().reverse();
   msg_arr.map(ch=>{
 console.log(ch.content);
     if(ch.content.indexOf('{')==-1||ch.content.indexOf('}')==-1) return;
     let data1 = JSON.parse(ch.content.trim());
     let data2 = JSON.parse(ch.content.trim());
     console.log(data1);
     let msg_id=ch.id;
    // ch.id=data1.text_id;
     let text_id=data1.text_id;
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
        let msg = await free_chat.send(member+'`!хелп`-список всех команд. \n Войс удалится сам, после выхода всех участников.\n');
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