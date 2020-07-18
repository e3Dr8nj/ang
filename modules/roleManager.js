//________________________________________INITIATION_PART__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; 
//_____________SETTINGS
exports.active=true;//this module activate (deactivate module and all events,commands,boot in it if value is false)
exports.events=false;// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots=false;// {} - activate/false -deactive
exports.RH_IGNORE_TOTAL=true;
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
module.exports.idk=".";
const aliase ={
  'мертвые души':{name:'мертвые души',add:true,remove:true}
  ,'адепты хаоса':{name:'адепты хаоса',add:true,remove:true}
  ,'временная роль':{name:'временная роль',add:false,remove:true}
  ,'странники':{name:'странники', add:true,remove:true}
  ,'лампочка':{name:'💡',add:true, remove:true}
  ,'звездочка':{name:'✴',add:true, remove:true}
  ,'кто все эти люди':{name:'кто все эти люди',add:true,remove:true}
  ,'модератор':{name:'модератор',add:false,remove:true}
  ,'сумеречные':{name:'сумеречные',add:true,remove:true}
};

const self_roles ={
  'dj':{name:'dj',add:true,remove:true}
  ,'пинг':{name:'💥',add:true,remove:true}
 ,'токсик':{name:'☠',add:true,remove:true}
 ,'craig':{name:'craig', add:true,remove:true}
  ,'викторина':{name:'v', add:true,remove:true}
 // ,'лампочка':{name:'💡',add:true, remove:true}
 // ,'звездочка':{name:'✴',add:true, remove:true}
 // ,'кто все эти люди':{name:'кто все эти люди',add:true,remove:true}
 // ,'модератор':{name:'модератор',add:false,remove:true}
 // ,'сумеречные':{name:'сумеречные',add:false,remove:true}
};
exports.d={
      some_phase:['on_lang0','on_lang1']
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'  
     ,sm_role_name:'Супермодератор'
     ,ch_log_name:'лог-мод'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________
let total_log='';
//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.someEvent={ on:true,  run:async(client,event_parametrs)=>{try{
//if on this function triggers on deffined event
              

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//__________c0
module.exports.commands.roleHelp={ on:true, aliase:'рольхелп', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              console.log('rh');
              let isAble=await module.exports.isAble(client,message);
              let str =''; let px=client.prefix;
  /*
              str+='['+px+'роль +роль1] взять роль1\n';
              str+='['+px+'роль -роль1] снять роль1\n';
              str+='['+px+'роль +роль1,-роль2]\n*взять роль1 снять роль2\n';
              str+='  +/-DJ\n  +/-craig\n  +/-токсик\n +/-пинг\n +/-викторина\n';
  */
              str+='['+px+'роль название роли или id] - показать список участников с этой ролью\n';
              str+='['+px+'роль ? паттерн флаги] - найти названия ролей по маске (regExp)\n';
             
              if(isAble){
                  
                  str+='['+px+'роль @nick1 +роль1] +выдать роль \n';
                  str+='['+px+'роль @nick1 -роль1] -снять роль \n';
                  str+='['+px+'роль @nick1 *роль1] *cоздать роль и выдать \n';
                  str+='['+px+'роль @nick1 %роль1] %снять роль и удалить ее \n';
                  str+='['+px+'роль @nick1 @nick2 +роль1,-роль2,-роль3,*роль4,%роль5 ]\n';
                  str+='* применить несколько действий к нескольким участникам\n';
                  str+='  +/-Адепты Хаоса\n  +/-Кто все эти люди\n  +/-Странники\n  -Временная роль\n  +/-Лампочка\n  +/-Звездочка\n';
                  str+='  -Модератор\n  -Сумеречные\n';
                  str+='+/- все созданные ранее роли (['+px+'роль ?*] -список ролей)\n';
                  str+='['+px+'роль удалить название роли(без точки в конце)] +удалить роль \n';
              };//isAble true;
              //if(!isAble) {return;};
              message.channel.send(str,{code:'ini'});
}catch(err){console.log(err);};}};//
//_______c1
module.exports.commands.manipuleRole={ on:true, aliase:'роль', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
           total_log='';
           let isAble=await module.exports.isAble(client,message);
           if(!message.mentions.members.first()){
//
            if(args[1].startsWith("?")) {
               if (args[1].length==1) return module.exports.roleListName(client,message,args);
               return module.exports.roleListCreated(client,message,args);
            };
           
         

             if(args[1].startsWith("удалить")&&isAble) {
               
               return module.exports.deleteRole(client,message,false,args.slice(2).join(" "));
            };
//
             return module.exports.roleList(client,message,args);


           };//selfroles mode
            
            
           if(!isAble) {
             message.channel.send(message.member+' недостаточно прав');
             return false;}
         
           
            let mmbs = message.mentions.members.keyArray();
            let msg_cnt =message.content.split('>');
            let role_names = msg_cnt[msg_cnt.length-1].trim().split(',');
            console.log(role_names);
            for(let i=0;i<role_names.length;i++){ console.log(role_names[i]);
             
                    for(let ii=0;ii<mmbs.length;ii++){
                        try{
                            let mmb= await message.member.guild.members.fetch(mmbs[ii]).catch(err=>console.log(err));
                            console.log(mmb.user.username);
                            role_names[i]=role_names[i].trim();
                            let r_n = (role_names[i].startsWith(' '))?role_names[i].slice(1):role_names[i];
                          console.log(r_n);
                            if(r_n.startsWith('-')){
                                r_n=r_n.slice(1); 
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.removeRole(client,message,mmb,r_n,aliase); 
                            }else if(r_n.startsWith('+')){
                                r_n=r_n.slice(1); 
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.giveRole(client,message,mmb,r_n,aliase); 
                            }else if(r_n.startsWith('*')){
                                r_n=r_n.slice(1); 
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.createRole(client,message,mmb,r_n,aliase); 
                            }else if(r_n.startsWith('%')){
                                r_n=r_n.slice(1); 
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.deleteRole(client,message,mmb,r_n,aliase); 
                            }else{
                                r_n=r_n.slice(1);
                                r_n = (r_n.startsWith(' '))?r_n.slice(1):r_n;
                                await module.exports.giveRole(client,message,mmb,r_n,aliase); 
                            };
                         }catch(err){console.log(err);};
                    };//for ii end
             
            };//for end
           // message.channel.send('ок');
             module.exports.log(client,message,{description:total_log,color:'blue'},true);
             total_log='';
             return;
}catch(err){console.log(err);};}};//

//_______c

//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//

//___________________________________________BOOTS_PART_END______________________________________________
//______________________________SUB__FUNCTIONS
//_______SF-1
exports.deleteRole=async(client,message,mmb,role_name,aliase)=>{
try{ 
   role_name=role_name.toLowerCase();
   let sprole=await message.guild.roles.cache.find(r=>r.name.toLowerCase()==role_name+module.exports.idk);
   if(!sprole){
      return;
   }else{
    
   if(mmb)  await module.exports.removeRole(client,message,mmb,role_name,aliase);
     let role_deleted = await sprole.delete().then(()=>message.channel.send(role_name+" роль удалена")).catch(err=>console.log(err));
     if(!role_deleted) return;
    if(mmb) total_log+=message.member+' удалил роль  `'+role_name+'\n';
     return;
    };
  return;
}catch(err){console.log(err);};
};//createRole end
//_______SF0
exports.createRole=async(client,message,mmb,role_name,aliase)=>{
try{ 
   role_name=role_name.toLowerCase();
   
   let sprole=await message.guild.roles.cache.find(r=>r.name.toLowerCase()==role_name+module.exports.idk);
   if(sprole){
     
     return module.exports.giveRole(client,message,mmb,role_name,aliase);
   }else{
     
//
     let sp_roles=message.guild.roles.cache.filter(r=>r.name.endsWith(module.exports.idk));
     sp_roles.map(r=>{
           console.log(r.name);
           if(r.members.array().length==0){message.guild.roles.cache.get(r.id).delete();console.log('role has no member delete '+r.name);}
     });
     await delay(1000);
     sp_roles=await message.guild.roles.cache.filter(r=>r.name.endsWith(module.exports.idk));
     let len = sp_roles.array().length;
     if(len>4){message.channel.send('Превышено допустимое колличество создаваемых ролей, удалите ненужные [роль удалить название_роли]-удалить роль, [роль ?*]-посмотеть список созданных ролей', ); return;};
    
/*
     if(len>4){
       sp_roles.map(r=>console.log(r.name+' '+r.position));
       sp_roles.sort(function(a,b){return a.position>b.position;});
       sp_roles.map(r=>console.log(r.name+' '+r.position));
       for(let i=0;i++;i<len-4+1){
          message.guild.roles.get(sp_roles[i].id).delete();
       };

     };
*/
     
//
     let role_created = await message.guild.roles.create({data:{name:role_name+module.exports.idk,position:1,color:0xf47fff}}).then(()=>message.channel.send(role_name+" роль создана")).catch(err=>console.log(err));
     if(!role_created) return;
     //console.log(role_created);
     total_log+=message.member+' создал роль  `'+role_name+'\n';
     return module.exports.giveRole(client,message,mmb,role_name,aliase);
    };
  return;
}catch(err){console.log(err);};
};//createRole end
//_______SF1
exports.giveRole=async(client,message,mmb,role_name,aliase)=>{
try{ 
   role_name=role_name.toLowerCase();
   
   let sprole=await message.guild.roles.cache.find(r=>r.name.toLowerCase()==role_name+module.exports.idk);

   if( (!aliase[role_name]||aliase[role_name].add===false)&&(!sprole) ) {
        message.channel.send(role_name+' - роль неверно указана, или недоступна для данной манипуляции. \\'+client.prefix+'рольхелп');
        return;
   };
   if(!sprole) role_name=aliase[role_name].name.toLowerCase();
   if(sprole) role_name+=module.exports.idk;
   let role_=await message.guild.roles.cache.find(r=>r.name.toLowerCase()==role_name);
   if(!role_){message.channel.send(role_name+' роль не найдена '); return;};
   if(mmb.roles.cache.get(role_.id)) {return;};
   await mmb.roles.add(role_); 
   message.channel.send(role_.name+' роль добавлена '+mmb.user.username);
   //await module.exports.log(client,message, {name:'Управление ролями', description:' выдал роль  `'+role_.name+'`  '+mmb+' '+mmb.user.username+mmb.user.discriminator,color:'blue'});
  total_log+=message.member+' выдал роль  `'+role_.name+'` '+mmb+' '+mmb.user.username+mmb.user.discriminator+'\n';
  return;
}catch(err){console.log(err);};
};//createRole end
//_______SF2
exports.removeRole=async(client,message,mmb,role_name,aliase)=>{
try{ 
   role_name=role_name.toLowerCase();
   let sprole=await message.guild.roles.cache.find(r=>r.name.toLowerCase()==role_name+module.exports.idk);
   
   if( (!aliase[role_name]||aliase[role_name].remove===false)&&(!sprole) ) {
        message.channel.send(role_name+' - роль неверно указана, или недоступна для данной манипуляции. \\'+client.prefix+'рольхелп');
        return;
   };
   if(!sprole) role_name=aliase[role_name].name.toLowerCase();
   if(sprole) role_name+=module.exports.idk;
   let role_=await message.guild.roles.cache.find(r=>r.name.toLowerCase()==role_name);
   if(!role_){message.channel.send(role_name+' роль не найдена '); return;};
   if(!mmb.roles.cache.get(role_.id)) {return;};
  
    await mmb.roles.remove(role_); message.channel.send(role_.name+' роль снята c '+mmb.user.username);
    
    //await module.exports.log(client,message, {name:'Управление ролями', description:' снял роль  `'+role_.name+'` с '+mmb+' '+mmb.user.username+mmb.user.discriminator,color:'blue'});
   total_log+=message.member+' снял роль  `'+role_.name+'` с '+mmb+' '+mmb.user.username+mmb.user.discriminator+'\n';
    return;
}catch(err){console.log(err);};
};//createRole end
//_______SF3
exports.isAble=async(client,message)=>{
try{ 
   //return true;
   if(message.member.user.id==message.guild.owner.id) return true;
   let role_=await message.guild.roles.cache.find(r=>r.name==module.exports.e.sm_role_name);
   if(!role_){message.channel.send('роль не найдена '+module.exports.e.sm_role_name); return false;};
   if(message.member.roles.cache.find(r=>r.name==module.exports.e.sm_role_name)){return true;};
    //message.channel.send(message.member+' недостаточно прав');
    return false;
}catch(err){console.log(err);};
};//createRole end
//_______SF4
exports.log=async(client,message,action)=>{
try{ 
   let colors={blue:0x3366ff};
   action.name=(action.name)?action.name:'Управление ролями';
   let log_mod=await message.guild.channels.cache.find(r=>r.name==module.exports.e.ch_log_name);
   if(!log_mod){console.log('log channel not found'); return;};
  // log_mod.send(message.member+action+"`"+role_name+"`  "+mmb);
  //let str = (all)?message.member+'\n':message.member;
   if(!action.description) return;
   let emb={fields:[{name:action.name,value:action.description}],timestamp: new Date(),color:colors[action.color]};
   log_mod.send({embed:emb});
}catch(err){console.log(err);};
};//createRole end
//______________sf5
exports.roleList=async(client,message,args)=>{
try{ 
   args.shift();
    if(args.length===0) return;
    let str = args.join(" ");
    let role = message.guild.roles.cache.find(r=>r.name.toLowerCase()===str.toLowerCase());
    str=str.trim();
    if(!role) role = message.guild.roles.cache.get(str);
    if(!role) return;
    let count = role.members.array().length;
    let mmb_str = 'участники с ролью ['+ str +'] '+ count +'\n';
    let nick='';
    role.members.map(e=>{
       nick=(e.nickname)?e.nickname:'';
       mmb_str+=nick+'('+e.user.username+') #'+e.user.discriminator+' '+e.user.id+'\n';
   
    });
    mmb_str=(mmb_str.length<1900)?mmb_str:mmb_str.slice(0,1900);
    message.channel.send(mmb_str,{code:'ini'});
   return;
}catch(err){console.log(err);};
};//createRole end
//(node:279) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 guildMemberUpdate listeners added. Use emitter.setMaxListeners() to increase limit

//____________sf6
exports.roleListName=async(client,message,args)=>{
try{ 
    

              if(!args[2]) return;
              args[3]=(args[3])?args[3]:'i';
          
               let patt=new RegExp(args[2],args[3]);
              
              if(!patt) return;
              let n_a=message.guild.roles.cache.filter(r=>patt.test(r.name));
              let str='';
              n_a.map(r=>str+=r.name+" "+r.members.array().length+"\n");
              let p_str=n_a.array().length+" ролей найдено \n";
              str=(str.length<1900)?str:str.slice(0,1900);
              message.channel.send(p_str+str,{code:'ini'});
              
   return;
}catch(err){console.log(err);};
};//createRole end
//____________sf7
exports.roleListCreated=async(client,message,args)=>{
try{ 
    
            

             // let patt=new RegExp(module.exports.idk);
              
            //  if(!patt) return;
              let n_a=message.guild.roles.cache.filter(r=>r.name.endsWith(module.exports.idk));
              let str='';
              n_a.map(r=>str+=r.name+" "+r.members.array().length+"\n");
              let p_str=n_a.array().length+" созданных ролей найдено \n";
              str=(str.length<1900)?str:str.slice(0,1900);
              message.channel.send(p_str+str,{code:'ini'});
              
   return;
}catch(err){console.log(err);};
};//createRole end
//__________sf8

