//tealium universal tag - utag.586 ut4.0.201609121620, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState==='complete'||this.readyState==='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.map={"DCM452_pageType":"u17","DCM452_appCode":"u5"};u.extend=[function(a,b){if(b.appCode=='DESKTOP')
b.DCM452_appCode='web';else
b.DCM452_appCode='mweb';if(b.pageType=='hp')
b.DCM452_pageType='homepage';else if(b.pageType=='prodhp'&&b.productId==1)
b.DCM452_pageType='Air HomePage';else if(b.pageType=='prodhp'&&b.productId==5)
b.DCM452_pageType='Hotel HomePage';else if(b.pageType=='prodhp'&&b.productId==8)
b.DCM452_pageType='RC HomePage';else if(b.pageType=='prodhp'&&b.productId==17)
b.DCM452_pageType='VP HomePage';else
b.DCM452_pageType=b.pageType;b.DCM452_dates=b.travelStartDate+"|"+b.travelEndDate;if(b.productId==1||b.productId==17){b.DCM452_AirportCode=b.origAirportCode+"|"+b.destAirportCode;}else if(b.productId==5){b.DCM452_destination=b.destCityName+"|"+b.destStateCode+"|"+b.destCountryCode;}else if(b.productId==8){b.DCM452_carLocation=(b.origAirportCode!=''?b.origAirportCode:(b.origCityName+','+b.origStateCode+','+b.origCountryCode))
+"|"+(b.destAirportCode!=''?b.destAirportCode:(b.destCityName+','+b.destStateCode+','+b.destCountryCode));}
if(b.pageType=='confirmation'){b.DCM452_bookingValue=b.rsvTotal+'|'+b.currencyCode;}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,g;u.data={"qsp_delim":";","kvp_delim":"=","base_url":"","src":"6036335","type":"homepage","cat":"homep0","multicat":"","ord":"","cost":"","qty":0,"total_qty":0,"countertype":"standard","order_id":"","order_subtotal":"","product_id":[],"product_quantity":[],"product_unit_price":[]};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];g=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(/^(cat|multicat|type|src|cost|qty|ord|order_id|order_subtotal|product_id|product_quantity|product_unit_price)$/.test(e[f])){u.data[e[f]]=b[d];}else{u.data[e[f]]=b[d];g.push(e[f]+u.data.kvp_delim+encodeURIComponent(b[d]))}}}}
u.data.order_id=u.data.order_id||u.data.ord||b._corder||"";u.data.order_subtotal=u.data.cost||u.data.order_subtotal||b._csubtotal||b._ctotal||"";if(u.data.product_id.length===0&&b._cprod!==undefined){u.data.product_id=b._cprod.slice(0);}
if((u.data.qty&&u.data.qty.length>0)||(u.data.product_quantity.length===0&&b._cquan!==undefined)){u.data.product_quantity=u.data.qty||b._cquan.slice(0);}
if(u.data.product_unit_price.length===0&&b._cprice!==undefined){u.data.product_unit_price=b._cprice.slice(0);}
u.data.base_url='//'+u.data.src+'.fls.doubleclick.net/activityi;src='+u.data.src+';type='+u.data.type+';';if(u.data.multicat===""){u.data.multicat_arr=[u.data.cat];}else{u.data.multicat_arr=u.data.multicat.split(';');}
if(u.data.order_id){if(u.data.total_qty===0&&u.data.product_quantity.length>0){for(f=0;f<u.data.product_quantity.length;f++){u.data.total_qty+=parseInt(u.data.product_quantity[f]);}}
if(u.data.total_qty===0){u.data.total_qty=1;}
var dc_fl_prd=[];for(var i=0;i<u.data.product_id.length;i++){var prod_num=i+1;dc_fl_prd.push("i"+prod_num+":"+u.data.product_id[i]+"|p"+prod_num+":"+u.data.product_unit_price[i]+"|q"+prod_num+":"+u.data.product_quantity[i])}
u.prd=dc_fl_prd.join('|');if(u.prd){c.push("prd="+u.prd);}
c.push('qty='+(u.data.total_qty));c.push('cost='+(u.data.order_subtotal));if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(u.data.order_id));}else if(u.data.countertype==='standard'){if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(Math.random()*10000000000000));}else if(u.data.countertype==='unique'){if(g.length>0){c.push(g.join(';'));}
c.push('ord=1');c.push('num='+(Math.random()*10000000000000));}else{if(g.length>0){c.push(g.join(';'));}
c.push('ord='+(u.data.order_id?u.data.order_id:window.utag.data['cp.utag_main_ses_id']));}
for(f=0;f<u.data.multicat_arr.length;f++){u.loader({"type":"iframe","src":u.data.base_url+'cat='+u.data.multicat_arr[f]+((c.length>0)?';'+c.join(u.data.qsp_delim):'')+'?',"loc":"body","id":'utag_586_iframe'});}}};utag.o[loader].loader.LOAD(id);}('586','pcln.main'));}catch(error){utag.DB(error);}
