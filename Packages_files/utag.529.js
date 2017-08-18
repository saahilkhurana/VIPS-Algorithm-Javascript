//tealium universal tag - utag.529 ut4.0.201610041726, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.base_url="//www.tripadvisor.com/js3/taevents-c.js";u.map={};u.extend=[function(a,b){if(b.pageType=='hp')
b.tripadvisorPageType='Homepage';else if(b.pageType=='promo')
b.tripadvisorPageType='Hotel City/State';else if(b.productId==5){if(b.pageType=='prodhp')
b.tripadvisorPageType='Hotel Homepage';else if(b.pageType=='listing')
b.tripadvisorPageType='Hotel Listings';else if(b.pageType=='detail')
b.tripadvisorPageType='Hotel Details';else if(b.pageType=='confirmation')
b.tripadvisorPageType='Hotel Confirmation';}else if(b.productId==1){if(b.pageType=='prodhp')
b.tripadvisorPageType='Flight Homepage';else if(b.pageType=='listing')
b.tripadvisorPageType='Flight Listings';else if(b.pageType=='returning')
b.tripadvisorPageType='Flight Return';else if(b.pageType=='detail')
b.tripadvisorPageType='Flight Details';else if(b.pageType=='confirmation')
b.tripadvisorPageType='Flight Confirmation';}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){u.initialized=true;taq('init','721192672');if(b.pageType=='listing'||b.pageType=='detail'||b.pageType=='hp'||b.pageType=='promo'||b.pageType=='returning'||b.pageType=='prodhp'){var eventData={'is_member':b.mhe!=''?'Y':'N','Page_Type':b.tripadvisorPageType};if(b.productId==5){eventData['LOS']=b.lenStay;eventData['travel_start_date']=b.travelStartDateYYYYMMDD;eventData['travel_end_date']=b.travelEndDateYYYYMMDD;}
else if(b.productId==1){eventData['origAirport']=b.origAirportCode||'';eventData['destAirport']=b.destAirportCode||'';eventData['flight_start_date']=b.travelStartDateYYYYMMDD;eventData['flight_end_date']=b.travelEndDateYYYYMMDD;}
if(b.productId==1)
taq('track','PAGEVIEW_FLIGHT',eventData);else
taq('track','PAGEVIEW',eventData);if(b.productId==5&&b.pageType=='detail'){attachEventBySelector("button.button-primary.gaHtlEvntTrk-Rates","click","START_BOOKING",eventData);attachEventBySelector("div.reserve > button.button-primary","click","START_BOOKING",eventData);}
if(b.productId==1&&(b.pageType=='listing'||b.pageType=="returning")){attachEventBySelector("div.pricing-info > div.content > button","click","START_BOOKING_FLIGHT",eventData);}
if(b.productId==1&&b.pageType=='detail'){attachEventBySelector(".booking-bottom button[type='submit']","click","START_BOOKING_FLIGHT",eventData);}}else if(b.pageType=='confirmation'){var eventData={'partner':'Priceline','Page_Type':b.tripadvisorPageType,};if(b.productId==5){eventData['LOS']=b.lenStay;eventData['travel_start_date']=b.travelStartDateYYYYMMDD;eventData['travel_end_date']=b.travelEndDateYYYYMMDD;}
else if(b.productId==1){eventData['origAirport']=b.origAirportCode||'';eventData['destAirport']=b.destAirportCode||'';eventData['flight_start_date']=b.travelStartDateYYYYMMDD;eventData['flight_end_date']=b.travelEndDateYYYYMMDD;}
if(b.productId==1)
taq('track','BOOKING_CONFIRMATION_FLIGHT',eventData);else
taq('track','BOOKING_CONFIRMATION',eventData);}
};function fireEvent(eventId,data){taq('track',eventId,data==undefined?{}:data);}
function attachEventBySelector(selector,event,eventId,data){var elements=document.querySelectorAll(selector);for(var i=0;i<elements.length;i++){elements[i].addEventListener(event,function(){fireEvent(eventId,data);},true);}}
if(!u.initialized){if(window.taq){return}
window.taq=function(){window.taq.queue.push(arguments)};window.taq.queue=[];if(/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)){return}
u.loader({"type":"script","src":u.base_url,"cb":u.loader_cb,"loc":"script","id":'utag_529'});}else{u.loader_cb();}
}};utag.o[loader].loader.LOAD(id);})("529","pcln.main");}catch(error){utag.DB(error);}
