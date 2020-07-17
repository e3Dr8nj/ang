//________________________________________INITIATION_PART__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))};
//_____________SETTINGS
//exports.RH_IGNORE_TOTAL=true;//add this line to ignore this module
exports.events={};// {} - activate/false - deactive
exports.commands={};// {} - activate/false -deactive
exports.boots={};// {} - activate/false -deactive
exports.events_primitive={};//
//exports.m=require('./this_project_main.js'); //inculde this project`s main file if present (same directory)
//____________DICTIONARY//dictionary set, elements by accesed by module.exports.d.some_phase[client.lang] 
exports.d={

  
};//d end
//___________ENVORIMENTAL//envorimental set, elements accesed by module.exports.e.some_envorimental
exports.e={
     some_envorimental:'value'
    ,channel_log_name:'1'
};//e end
//_________________________________________INITIATION_PART_END___________________________________________

//_________________________________________EVENTS_PART_________________________________________________
//_______________________e0(first event)
module.exports.events.message={ on:true,  run:async(client,message)=>{try{
//if on this function triggers on deffined event
// code for event            
         // console.log('message dsfs'); 
        
           return;
}catch(err){console.log(err);};}};//
//_______________________e1(next event)
// ...
//_________________________________________EVENTS_PART_END__________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//______________________c0(first command)
module.exports.commands.someCommand={ on:true, aliase:'aliase_for_command', run:async(client,message,args)=>{try{
//if on this function triggers on deffined command
              message.reply('test');
// code for command
}catch(err){console.log(err);};}};//
//_____________________c1(next command)
// ...
//___________________________________________COMMANDS_PART_END___________________________________________
//_________________________________________BOOTS_PART___________________________________________________
//____________________b0(first boots)
module.exports.boots.someBoot={ on:true,  run:async(client)=>{try{
//if on this function triggers on ready event (with some delay)
           

}catch(err){console.log(err);};}};//
//____________________b1(next boot)
// code for boot
//___________________________________________BOOTS_PART_END______________________________________________
//____________________SUB_FUNCTION
//______sb0
module.exports.sub_commands=async(client,message,mmb)=>{try{
// code for sub commands        
}catch(err){console.log(err);};};//
//______sb1
/*
//______________________________EVENTS PRIMITIVE
//__E0
module.exports.events_primitive.MESSAGE_DELETE={ on:true,  run:async(client,event)=>{try{
          
           console.log('MESSAGE DELETE PRIMITIVE');
}catch(err){console.log(err);};}};//
*/
//_____________________________ADDITIONS
