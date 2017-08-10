//tealium universal tag - utag.522 ut4.0.201602042317, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.data={};u.data.pid="1449";u.map={"adara_pg":"pg","mhe":"u"};u.extend=[function(a,b){try{if(b['pageType']=='hp'){b['adara_pg']='hm'}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};var c,d,e,f;c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){c.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]))
u.data[e[f]]=encodeURIComponent(b[d]);}}}
u.base_url="//tag.yieldoptimizer.com/ps/ps?t=s&p="+u.data.pid+"&";u.img=new Image();u.img.src=u.base_url+c.join(u.qsp_delim);}}
utag.o[loader].loader.LOAD(id);})('522','pcln.main');}catch(e){}
