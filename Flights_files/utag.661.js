//tealium universal tag - utag.661 ut4.0.201708102050, Copyright 2017 Tealium.com Inc. All Rights Reserved.
var IntentMediaProperties=IntentMediaProperties||{};try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
if(utag.ut.loader===undefined){u.loader=function(o){var b,c,l,a=document;if(o.type==="iframe"){b=a.createElement("iframe");o.attrs=o.attrs||{"height":"1","width":"1","style":"display:none"};for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";for(l in utag.loader.GV(o.attrs)){b[l]=o.attrs[l];}b.src=o.src;}if(o.id){b.id=o.id};if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb()},false);}else{b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
u.ev={"view":1,"link":1};u.map={"intentMediaDataMappings":"intentMediaDataMappings"};u.extend=[function(a,b){try{if(1){var IntentMediaMappings=IntentMediaMappings||{};try{var productName={'1':'flight','5':'hotel','8':'car','16':'home'};var pageName=function(pageType){var pageNames={'hp':'home','prodhp':'frontdoor','listing':'list','detail':'details','checkout':'cart','confirmation':'confirmation'};var name=pageNames[pageType?pageType:b.pageType];if(!name)name=b.pageType;if(productName=='hotel'&&b.offerMethod=='semiopaque')name+='.semiopaque';if((productName=='flight'||productName=='car')&&b.offerMethod=='opaque')name+='.opaque';return name};var intentDestCountryCode=b.destCountryCode&&b.destCountryCode=='UK'?'GB':b.destCountryCode;var intentTripType=b.tripType&&b.tripType=='OW'?'oneway':'roundtrip';IntentMediaMappings={page_id:productName[b.productId]+'.'+pageName(),user_member_id:b.mhe,visitor_id:b['cp.vid'],referrer_source:b.refId,referrer_channel:b.refClickId,travel_date_start:b.travelStartDateYYYYMMDD.split('-').join(''),travel_date_end:b.travelEndDateYYYYMMDD.split('-').join(''),travelers:b.numTravelers,adults:b.numAdults,children:b.numChildren};if(b.productId=='1'){IntentMediaMappings.trip_type=intentTripType;IntentMediaMappings.flight_class_of_service=b.airCabinClass;IntentMediaMappings.flight_origin=b.origAirportCode;IntentMediaMappings.flight_destination=b.destAirportCode;}
if(b.productId=='5'){IntentMediaMappings.hotel_airport_code=b.destAirportCode;IntentMediaMappings.hotel_city=b.destCityName;IntentMediaMappings.hotel_country=b.destCountryName;IntentMediaMappings.hotel_state=b.destStateCode;IntentMediaMappings.hotel_rooms=b.numUnits<=0?1:b.numUnits;if(b.pageType=='listing'&&b.hotelId&&b.hotelId!=null){var sopqResults=0;try{b.hotelId.split(',').forEach(function(h){if(!h||h==null||h=='')sopqResults++;});}catch(e){}
IntentMediaMappings.number_of_opaque_listings=sopqResults;}
if(b.pageType=='detail'){IntentMediaMappings.publisher_hotel_property_id=b.hotelId;}}
if(b.productId=='8'){IntentMediaMappings.trip_type=intentTripType;IntentMediaMappings.car_pickup_location_type=b.carPickupLocType&&b.carPickupLocType.toUpperCase();IntentMediaMappings.car_pickup_airport=b.origAirportCode;IntentMediaMappings.car_pickup_city=b.origCityName;IntentMediaMappings.car_pickup_state=b.origStateCode;IntentMediaMappings.car_pickup_country=b.origCountryCode;IntentMediaMappings.car_dropoff_location_type=b.carDropoffLocType&&b.carDropoffLocType.toUpperCase();IntentMediaMappings.car_dropoff_airport=b.destAirportCode;IntentMediaMappings.car_dropoff_city=b.destCityName;IntentMediaMappings.car_dropoff_state=b.destStateCode;IntentMediaMappings.car_dropoff_country=b.destCountryName;IntentMediaMappings.car_pickup_time=b.pickupTime;IntentMediaMappings.car_dropoff_time=b.dropoffTime;}
if(b.pageType=='confirmation'){IntentMediaMappings.total_conversion_value=b.rsvTotal;IntentMediaMappings.order_id=b.offerNumber;IntentMediaMappings.conversion_type=b.offerMethod;if(b.productId=='1'){IntentMediaMappings.flight_carrier_code=b.airDepBrandCode;}
if(b.productId=='5'){IntentMediaMappings.hotel_brand_code=b.hotelBrandId;}
if(b.productId=='8'){IntentMediaMappings.car_class=b.rentalCarType;}}
if(document.readyState!='loading'){clickEvents();}else{document.addEventListener('DOMContentLoaded',clickEvents());}}catch(IntentError){console.log("IntentMedia Mappings Error: "+IntentError);}
b.intentMediaDataMappings=IntentMediaMappings;function triggerIntentPageUpdate(){if(window.IntentMedia&&IntentMedia.trigger){IntentMedia.trigger("page_id_updated");}}
function clickEvents(){if(PCLN&&PCLN.pclnEventDispatcher){PCLN.pclnEventDispatcher.register('RC_CAR_SELECTION_CLICKED',function(rcClickData){try{if(IntentMediaProperties){IntentMediaProperties.page_id=productName[b.productId]+'.'+pageName('checkout');triggerIntentPageUpdate();}}catch(e){}});PCLN.pclnEventDispatcher.register('AIR_FLIGHT_SELECTION_CLICKED',function(airClickData){try{if(IntentMediaProperties){IntentMediaProperties.page_id=productName[b.productId]+'.'+pageName('checkout');triggerIntentPageUpdate();}}catch(e){}});}}}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,g;u.data={"qsp_delim":"&","kvp_delim":"=","tag_path":"//a.cdn.intentmedia.net/javascripts/intent_media_priceline.js"||"//a.cdn.intentmedia.net/javascripts/v1/intent_media_core.js","site_name":"PRICELINE","page_id":"","site_country":"US","site_language":"EN","site_currency":"USD","display_format_type":"DESKTOP","intercard":"","rail":"","footer":"","order_id":"","order_subtotal":"","order_currency":"","order_coupon_code":""};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(!(e[f]in u.data)){IntentMediaProperties[e[f]]=b[d];}
u.data[e[f]]=b[d];}}}
u.data.order_id=u.data.order_id||b._corder||"";u.data.order_subtotal=u.data.order_subtotal||b._csubtotal||"";u.data.order_currency=u.data.order_currency||b._ccurrency||"";u.data.order_coupon_code=u.data.order_coupon_code||b._cpromo||"";function addDiv(targetID,divID){var d,e;e=document.getElementById(targetID);d=document.createElement('div');d.setAttribute("id",divID);try{e.appendChild(d);}catch(error){utag.DB("ERROR:661:"+error);};}
if(a==="view"){IntentMediaProperties.tag_path=u.data.tag_path;IntentMediaProperties.site_name=u.data.site_name;IntentMediaProperties.page_id=u.data.page_id;IntentMediaProperties.site_country=u.data.site_country;IntentMediaProperties.site_language=u.data.site_language;IntentMediaProperties.site_currency=u.data.site_currency||u.data.order_currency;IntentMediaProperties.display_format_type=u.data.display_format_type;if(u.data.intercard){addDiv(u.data.intercard,"​I​ntentMediaIntercard");}
if(u.data.rail){addDiv(u.data.rail,"IntentMediaRail");}
if(u.data.footer){addDiv(u.data.footer,"IntentMediaFooter");}
if(u.data.order_id){IntentMediaProperties.total_conversion_value=u.data.order_subtotal;IntentMediaProperties.order_id=u.data.order_id;if(u.data.order_coupon_code){IntentMediaProperties.promo_code=u.data.order_coupon_code;}
IntentMediaProperties.flight_carrier_code=u.data.flight_carrier_code;IntentMediaProperties.hotel_brand_code=u.data.hotel_brand_code;IntentMediaProperties.car_class=u.data.car_class;IntentMediaProperties.car_rental_agency=u.data.car_rental_agency;}
if(IntentMediaProperties['intentMediaDataMappings']){delete IntentMediaProperties.intentMediaDataMappings}
for(var attrname in b.intentMediaDataMappings){IntentMediaProperties[attrname]=b.intentMediaDataMappings[attrname];}
u.loader({"type":"script","src":u.data.tag_path,"cb":null,"loc":"script","id":'utag_661'});}else{if(window.IntentMedia&&IntentMedia.trigger&&b.event){IntentMedia.trigger(b.event);}}
}};utag.o[loader].loader.LOAD(id);}("661","pcln.main"));}catch(error){utag.DB(error);}
