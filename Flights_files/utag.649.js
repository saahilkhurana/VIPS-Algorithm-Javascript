//tealium universal tag - utag.649 ut4.0.201704201934, Copyright 2017 Tealium.com Inc. All Rights Reserved.
try{if(!utag.libloader){utag.libloader=function(src,handler,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;if(typeof handler=='function'){b.handlerFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.handlerFlag){b.handlerFlag=1;handler()}};b.onload=function(){if(!b.handlerFlag){b.handlerFlag=1;handler()}};a.getElementsByTagName('head')[0].appendChild(b)}}};(function(id,loader,u){u=utag.o[loader].sender[id]={};u.ev={'view':1};u.map={"criteo_site_type":"site_type","mhe":"email"};u.extend=[function(a,b){try{if(1){b['criteo_site_type']='d'}}catch(e){utag.DB(e)}}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){var data={};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'){e=u.map[d].split(',');for(f=0;f<e.length;f++){data[e[f]]=b[d]}}}
utag.libloader("//static.criteo.net/js/ld/ld.js",function(){window.criteo_q=window.criteo_q||[];window.criteo_q.push({event:"setAccount",account:[3088,37265]},{event:"setHashedEmail",email:[data['email']||'']},{event:"setSiteType",type:data['site_type']||''},{event:"viewHome"});});}};try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('649','pcln.main');}catch(e){}
