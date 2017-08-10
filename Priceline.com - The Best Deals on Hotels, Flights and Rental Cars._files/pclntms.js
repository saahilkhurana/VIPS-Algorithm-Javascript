



	var pclntms = (function() {
	var api = {};
	api.dataDictionary = {};
	api.tagSwitches = {};
	api.keys = ['siteCode','productId','pageType','offerMethod',
			'appCode','clientCountryCode','conversionValue','custId','offerNumber',
			'offerJustSubmittedFlag','offerChainLength','numUnits', 
			'origin', 'destination', 
			'travelStartDate', 'travelStartDate2','travelStartDate3','travelStartDate4','travelStartDate5','travelEndDate', 
			'origCityCode','origCityId','origCityName','origStateName','origStateCode', 'origCountryName', 'origCountryCode','origZip', 
			'destCityCode','destCityId','destCityName','destStateName','destStateCode','destCountryName','destCountryCode','destZip', 
			'tripType','origAirportCode',
			'origAirportCode2','origAirportCode3','origAirportCode4',
			'origAirportCode5','destAirportCode',
			'destAirportCode2','destAirportCode3',
			'destAirportCode4','destAirportCode5',
			'advPurchase','lenStay','numAdults','numChildren','numInfants','numTravelers', 
			'airCabinClass', 'starLevel', 'rentalCarType', 'rsvTotal','rsvTotalNoTaxFee',
			'hotelId','hotelBrandId','hotelChainCode','rcBrandCode','airDepBrandCode',
			'airRetBrandCode','numVirtualViews','virtualViews','refId','refClickId','emailAddress','gdsName','supConfirmNum',
			'productType','travelStartDateYYYYMMDD','travelEndDateYYYYMMDD','lre','lrv','mhe','currencyCode',
			'carPickupLocType', 'carDropoffLocType', 'rentalCarPartnerCode',
			'pickupTime', 'dropoffTime'
			];
	api.ProductEnum = {
			AIR: {"id": "1", "type": "air"},
			HOTEL: {"id": "5", "type": "hotel"},
			CAR: {"id": "8", "type": "car"},
			VP: {"id": "17", "type": "vp"},
			CRUISE: {"id": "18", "type": "cruise"},
			HOME: {"id": "16", "type": "home"},
			getType: function(id) {
				switch (id.toString()) {				
				case this.AIR.id: 
					return this.AIR.type;
				case this.HOTEL.id:
					return this.HOTEL.type;
				case this.CAR.id:
					return this.CAR.type;
				case this.VP.id:
					return this.VP.type;
				case this.CRUISE.id:
					return this.CRUISE.type;
				case this.HOME.id:
					return this.HOME.type;
				}
			}
	};
	function callEMSvcs() {
    	try {
    		getScript('/svcs/mkt/tag/em?callback=pclntms.updateEM'+'&em='+api.dataDictionary.emailAddress);
    	} catch (err) {
    		if (typeof (console) != 'undefined')
				console.log("eperror:"+err);
		}
	 }
	function callEPSvcs() {
	    var tms_ep = getCookie("TMS_EP");
	    if (typeof(tms_ep)!="undefined") {
	       	api.dataDictionary.clientCountryCode = tms_ep;
	       	postEP();
	    } else {
	    	try {
	     		//getScript('/svcs/ep/services/locale/v0/geoinfo?ipAddr=130.245.68.68');
	     		 ajaxGet(updateEP);
	    	} catch (err) {
	    		if (typeof (console) != 'undefined')
					console.log("eperror:"+err);
			}
	    }
	 }
	 function ajaxGet(callback) {
		 var req;
		 if(window.XMLHttpRequest) {
		    try {
		      req = new XMLHttpRequest();
		    } catch(e) {
		      req = false;
		    }
		  } else if(window.ActiveXObject) {
		    try {
		      req = new ActiveXObject("Msxml2.XMLHTTP");
		    } catch(e) {
		      try {
		        req = new ActiveXObject("Microsoft.XMLHTTP");
		      } catch(e) {
		        req = false;
		      }
		    }
		  }
		  try {
		  if(req) {
		    req.onreadystatechange = function() {
		     if (req.readyState == 4 && req.status == 200) {
		        var response = JSON.parse(req.responseText);
		        callback(response);
		     }
		    };
		    req.open("GET", "/svcs/ep/services/locale/v0/geoinfo?ipAddr=130.245.68.68", true);
		    req.send();
		    return true;
		  }
		  } catch (e) {}
	  }
	 function config(p_data) {
	    if (api.dataDictionary.appCode!=undefined)
	        return;
	   
		try {
			document.addEventListener('TMS_meAvail',
			function(e) {
				utag_data['lre'] = api.dataDictionary['lre'];
				utag_data['lrv'] = api.dataDictionary['lrv'];
				utag_data['mhe'] = api.dataDictionary['mhe'];
				utag.view(utag_data);
			}, 
			false);
	
			
			if (typeof(p_data)!="undefined") {
				api.dataDictionary = copyObject(p_data);
				for ( var i = 0; i < api.keys.length; i++) {
					var key = api.keys[i];
					if (typeof (api.dataDictionary[key]) == 'undefined')
						api.dataDictionary[key] = '';
				}
				if (api.dataDictionary.productId!='')
					api.dataDictionary.productType = api.ProductEnum.getType(api.dataDictionary.productId);
			
				if (api.dataDictionary.pageType == 'tgcity')
					api.dataDictionary.productType ='hotel-tg';
				
				if (api.dataDictionary.origCityName!='') {
					api.dataDictionary.origin = api.dataDictionary.origCityName;
					if (api.dataDictionary.origStateCode!='')
						api.dataDictionary.origin += ','+api.dataDictionary.origStateCode;
					if (api.dataDictionary.origCountryCode!='')
						api.dataDictionary.origin += ','+api.dataDictionary.origCountryCode;
				}
				if (api.dataDictionary.destCityName!='') {
					api.dataDictionary.destination = api.dataDictionary.destCityName;
					if (api.dataDictionary.destStateCode!='')
						api.dataDictionary.destination += ','+api.dataDictionary.destStateCode;
					if (api.dataDictionary.destCountryCode!='')
						api.dataDictionary.destination += ','+api.dataDictionary.destCountryCode;
				}
				if (api.dataDictionary.rsvTotal.length!=0 && !isNaN(api.dataDictionary.rsvTotal))
					api.dataDictionary.conversionValue = (api.dataDictionary.rsvTotal * 0.76).toFixed(2);
				else {
					api.dataDictionary.rsvTotal = '0';
					api.dataDictionary.conversionValue = '0';
				}
				if (api.dataDictionary.rsvTotalNoTaxFee.length==0 || isNaN(api.dataDictionary.rsvTotalNoTaxFee))
					api.dataDictionary.rsvTotalNoTaxFee = api.dataDictionary.rsvTotal;
				var d, m, y;	
				if (api.dataDictionary.travelStartDate!='' && api.dataDictionary.travelStartDate.toLowerCase()!='mm/dd/yy') {
				  	try {
					    api.dataDictionary.travelStartDateYYYYMMDD = new Date(api.dataDictionary.travelStartDate);
					    d = api.dataDictionary.travelStartDateYYYYMMDD.getDate();
					    m = api.dataDictionary.travelStartDateYYYYMMDD.getMonth() + 1;
					    y = api.dataDictionary.travelStartDateYYYYMMDD.getFullYear();
					    api.dataDictionary.travelStartDateYYYYMMDD = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-'
					      + (d <= 9 ? '0' + d : d);
					    
					    if (api.dataDictionary.advPurchase=='') {
						    var date1 = new Date();
		  					var date2 = new Date(api.dataDictionary.travelStartDate);
							var timeDiff = Math.abs(date2.getTime() - date1.getTime());
							api.dataDictionary.advPurchase = Math.ceil(timeDiff / (1000 * 3600 * 24));   
						}
				    } catch (err1) {
				    	api.dataDictionary.travelStartDateYYYYMMDD = api.dataDictionary.travelStartDate;
				    }
				} else
					api.dataDictionary.travelStartDateYYYYMMDD = api.dataDictionary.travelStartDate;
					
				if (api.dataDictionary.travelEndDate!='' && api.dataDictionary.travelEndDate.toLowerCase()!='mm/dd/yy') {
				   try {
					    api.dataDictionary.travelEndDateYYYYMMDD = new Date(api.dataDictionary.travelEndDate);
					    d = api.dataDictionary.travelEndDateYYYYMMDD.getDate();
					    m = api.dataDictionary.travelEndDateYYYYMMDD.getMonth() + 1;
					    y = api.dataDictionary.travelEndDateYYYYMMDD.getFullYear();
					    api.dataDictionary.travelEndDateYYYYMMDD = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-'
					      + (d <= 9 ? '0' + d : d);
				  } catch (err1) {
				    api.dataDictionary.travelEndDateYYYYMMDD = api.dataDictionary.travelEndDate;
				  }
				} else
					api.dataDictionary.travelEndDateYYYYMMDD = api.dataDictionary.travelEndDate;
					
				if (api.dataDictionary.lenStay=='' && api.dataDictionary.travelStartDate!='' && api.dataDictionary.travelEndDate!='' &&
				 api.dataDictionary.travelStartDate.toLowerCase()!='mm/dd/yy' && api.dataDictionary.travelEndDate.toLowerCase()!='mm/dd/yy') {
  					try {
	  					var date1 = new Date(api.dataDictionary.travelStartDate);
	    				var date2 = new Date(api.dataDictionary.travelEndDate);
	    				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	    				api.dataDictionary.lenStay = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	    			} catch (err3) {}
  
				}	
				if (api.dataDictionary.siteCode == '')
					api.dataDictionary.siteCode = 'pcln';
				var numTravelers = 0;
				if (typeof(api.dataDictionary.numAdults)=='number'||api.dataDictionary.numAdults.match(/^\d+$/))
					numTravelers += parseInt(api.dataDictionary.numAdults);
				if (typeof(api.dataDictionary.numChildren)=='number'||api.dataDictionary.numChildren.match(/^\d+$/))
					numTravelers += parseInt(api.dataDictionary.numChildren);
				if (typeof(api.dataDictionary.numInfants)=='number'||api.dataDictionary.numInfants.match(/^\d+$/))
					numTravelers += parseInt(api.dataDictionary.numInfants);
				if (numTravelers < 1)
					numTravelers = 1;
				api.dataDictionary.numTravelers = parseInt(numTravelers) + '';
				
				if (api.dataDictionary.productId!='' && api.dataDictionary.productId==8) {
					if (api.dataDictionary.origAirportCode!='') {
						api.dataDictionary.carPickupLocType = 'airport';
						if (api.dataDictionary.tripType == '')
							if (api.dataDictionary.origAirportCode == api.dataDictionary.destAirportCode)
								api.dataDictionary.tripType = 'RT';
							else
								api.dataDictionary.tripType = 'OW';
					}
					else {
						api.dataDictionary.carPickupLocType = 'city';
						if (api.dataDictionary.tripType == '')
							if (api.dataDictionary.origCityName == api.dataDictionary.destCityName)
								api.dataDictionary.tripType = 'RT';
							else
								api.dataDictionary.tripType = 'OW';
					}
					if (api.dataDictionary.destAirportCode!='')
						api.dataDictionary.carDropoffLocType = 'airport';
					else
						api.dataDictionary.carDropoffLocType = 'city';
				}
				
				if (typeof(PCLN)!='undefined' && typeof(PCLN.pclnEventDispatcher)!='undefined') {
					PCLN.pclnEventDispatcher.register('GLOBAL_PCLN_CUSTOMER_SIGNIN', function(customer) {
					  updateSignedInStatus(true);
					});
					PCLN.pclnEventDispatcher.register('GLOBAL_PCLN_CUSTOMER_SIGNOUT', function(customer) {
					  updateSignedInStatus(false);
					});
				}
				if (api.dataDictionary.clientCountryCode == '') {
					callEPSvcs();
				} else {
					if (typeof(getCookie("TMS_EP"))=="undefined")
						setCookie("TMS_EP", api.dataDictionary.clientCountryCode);
					postEP();
				}
			}
		} catch (err) {
			if (typeof (console) != 'undefined')
				console.log(err);
		}
	    
	}
	function copyObject(obj) {
	    if (obj === null || typeof obj !== 'object') {
	        return obj;
	    }
	 
	    var copy = obj.constructor(); 
	    for (var key in obj) {
	        copy[key] = copyObject(obj[key]);
	    }
	 
	    return copy;
	}
	function dateToYMD(date) {
		try {
			date = new Date(date);
			var d = date.getDate();
			var m = date.getMonth() + 1;
			var y = date.getFullYear();
			return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-'
					+ (d <= 9 ? '0' + d : d);
		} catch (err) {
			return date;
		}
	}
	function getCookie(c_name) {
		var i, x, y, cookies = document.cookie.split(";");
		for (i = 0; i < cookies.length; i++) {
			x = cookies[i].substr(0, cookies[i].indexOf("="));
			y = cookies[i].substr(cookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
	}
	function getScript(url, scriptCallback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.async = true;
		var se = document.getElementsByTagName("script")[0];
		se.parentNode.insertBefore(script, se);
		var notloaded = true;
		script.onload = script.onreadystatechange = function() {
			if (notloaded
					&& (!script.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
				notloaded = false;
				script.onload = script.onreadystatechange = null;
				if (scriptCallback && scriptCallback.length > 0 && window[scriptCallback] && typeof(window[scriptCallback]) =='function')
					try {
						window[scriptCallback]();
					} catch(err) {
						if (typeof (console) != 'undefined')
							console.log("scriptCallback:"+err);
					}
			}
		};
	}
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
		    
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	function loadTealium() {
		window.utag_data = {};
		for (var key in api.dataDictionary)
			window.utag_data[key] = api.dataDictionary[key];
		for (var key in api.tagSwitches)
			window.utag_data[key] = api.tagSwitches[key];

    	if (api.dataDictionary.appCode=='MOBILEWEB' || ''=='mweb')
    		a='//tags.tiqcdn.com/utag/pcln/mweb/prod/utag.js';
    	else 
    		a = '//tags.tiqcdn.com/utag/pcln/main/prod/utag.js';
    	
    	
	    
	    getScript(a);
	    
	    
		
	}
	function loadTMS() {
		processRules();
		if (api.dataDictionary.appCode=='MOBILEWEB' && api.tagSwitches.PLATFORM_MOBILE=='true' ||api.dataDictionary.appCode!='MOBILEWEB'  )  {
			loadTealium();
		}
	}
	function postEP() {
		if (api.dataDictionary.emailAddress!='')
			callEMSvcs();
		else 
			loadTMS();
	}
	
	function processRules() {
		api.tagSwitches.TAG_CriteoOne='true';api.tagSwitches.TAG_OceanMedia='true';api.tagSwitches.TAG_Facebook='true';api.tagSwitches.TAG_Activity='true';api.tagSwitches.TAG_HotelCombined='true';api.tagSwitches.TAG_Triggit='true';api.tagSwitches.TAG_LiveRamp =('+US'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.TAG_ValueClick='true';api.tagSwitches.TAG_HookLogic='true';api.tagSwitches.TAG_Vindicosuite='true';api.tagSwitches.TAG_RocketFuel='true';api.tagSwitches.TAG_OwnerIQ =('+US,CA'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.TAG_DblClickRetargeting='true';api.tagSwitches.TAG_GoogleHPA='true';api.tagSwitches.TAG_MSN='true';api.tagSwitches.TAG_MediaAlpha='true';api.tagSwitches.TAG_AdRoll='true';api.tagSwitches.TAG_Bridgetrack='true';api.tagSwitches.TAG_DblClickFloodlight='true';api.tagSwitches.TAG_LiveIntent='true';api.tagSwitches.PLATFORM_NEWSTACK='true';api.tagSwitches.TAG_BookingBuddy='true';api.tagSwitches.TAG_Conversant =('+US,CA'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.TAG_BlueKai='false';api.tagSwitches.TAG_Nanigans='true';api.tagSwitches.TAG_OpenTable='true';api.tagSwitches.TAG_IntentMedia='true';api.tagSwitches.TAG_GoogleSmartPixel =('+US,CA'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.TAG_YahooDot='true';api.tagSwitches.TAG_TripAdvisor='true';api.tagSwitches.TAG_ClickTripz='true';api.tagSwitches.TAG_RocketFuelRetargeting='true';api.tagSwitches.TAG_GPT='true';api.tagSwitches.TAG_Kayak='true';api.tagSwitches.TAG_AdWordsConversion='true';api.tagSwitches.TAG_Krux='true';api.tagSwitches.TAG_Sojern =('+US,CA'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.TAG_SmarterTravel='true';api.tagSwitches.TAG_GlobalwideMedia='true';api.tagSwitches.TAG_Adelphic='true';api.tagSwitches.TAG_Twitter='true';api.tagSwitches.PLATFORM_P2='true';api.tagSwitches.TAG_Steelhouse='false';api.tagSwitches.TAG_Bing='true';api.tagSwitches.TAG_Taboola='true';api.tagSwitches.TAG_YahooPClick='true';api.tagSwitches.TAG_eXelate =('+US,CA'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.PLATFORM_MOBILE='true';api.tagSwitches.TAG_Adara =('+US,CA'.indexOf(api.dataDictionary.clientCountryCode) > 0)+'';api.tagSwitches.TAG_AdMarketplace='true';api.tagSwitches.TAG_ComScore='false';api.tagSwitches.TAG_TVSquared='true';api.tagSwitches.TAG_Eyeview='true';api.tagSwitches.TAG_Amazon='true';
	}
	function push(p_data) {
		var dkey = [];
		var d, m, y;	
					
		try {
			if (typeof(p_data)!="undefined") {
				for ( var key in p_data) {
					api.dataDictionary[key] = p_data[key];
					if (key=='productId') {
						api.dataDictionary.productType = api.ProductEnum.getType(api.dataDictionary.productId);
						dkey.push('productType');
					}
					else if (key=='pageType' && api.dataDictionary.pageType == 'tgcity') { 
						api.dataDictionary.productType ='hotel-tg';
						dkey.push('productType');
					}
					else if (key=='rsvTotal' && api.dataDictionary.rsvTotal.length!=0 && !isNaN(api.dataDictionary.rsvTotal)) {
						api.dataDictionary.conversionValue = (api.dataDictionary.rsvTotal * 0.76).toFixed(2);
						dkey.push('conversionValue');
					} else if (key=='travelStartDate') {
						if (api.dataDictionary.travelStartDate!='' && api.dataDictionary.travelStartDate.toLowerCase()!='mm/dd/yy') {
						  	try {
							    api.dataDictionary.travelStartDateYYYYMMDD = new Date(api.dataDictionary.travelStartDate);
							    d = api.dataDictionary.travelStartDateYYYYMMDD.getDate();
							    m = api.dataDictionary.travelStartDateYYYYMMDD.getMonth() + 1;
							    y = api.dataDictionary.travelStartDateYYYYMMDD.getFullYear();
							    api.dataDictionary.travelStartDateYYYYMMDD = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-'
							      + (d <= 9 ? '0' + d : d);
							    
							    if (api.dataDictionary.advPurchase=='') {
								    var date1 = new Date();
				  					var date2 = new Date(api.dataDictionary.travelStartDate);
									var timeDiff = Math.abs(date2.getTime() - date1.getTime());
									api.dataDictionary.advPurchase = Math.ceil(timeDiff / (1000 * 3600 * 24));   
								}
						    } catch (err1) {
						    	api.dataDictionary.travelStartDateYYYYMMDD = api.dataDictionary.travelStartDate;
						    }
						} else {
							api.dataDictionary.travelStartDateYYYYMMDD = api.dataDictionary.travelStartDate;
						}
						dkey.push('travelStartDateYYYYMMDD');
						dkey.push('advPurchase');
					}
					else if (key=='travelEndDate') {
						if (api.dataDictionary.travelEndDate!='' && api.dataDictionary.travelEndDate.toLowerCase()!='mm/dd/yy') {
						   try {
							    api.dataDictionary.travelEndDateYYYYMMDD = new Date(api.dataDictionary.travelEndDate);
							    d = api.dataDictionary.travelEndDateYYYYMMDD.getDate();
							    m = api.dataDictionary.travelEndDateYYYYMMDD.getMonth() + 1;
							    y = api.dataDictionary.travelEndDateYYYYMMDD.getFullYear();
							    api.dataDictionary.travelEndDateYYYYMMDD = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-'
							      + (d <= 9 ? '0' + d : d);
						  } catch (err1) {
						    api.dataDictionary.travelEndDateYYYYMMDD = api.dataDictionary.travelEndDate;
						  }
						} else {
							api.dataDictionary.travelEndDateYYYYMMDD = api.dataDictionary.travelEndDate;
						}
						dkey.push('travelEndDateYYYYMMDD');
					}
					else if (key=='numAdults'||key=='numChildren'||key=='numInfants') {
						var numTravelers = 0;
						if (typeof(api.dataDictionary.numAdults)=='number'||api.dataDictionary.numAdults.match(/^\d+$/))
							numTravelers += parseInt(api.dataDictionary.numAdults);
						if (typeof(api.dataDictionary.numChildren)=='number'||api.dataDictionary.numChildren.match(/^\d+$/))
							numTravelers += parseInt(api.dataDictionary.numChildren);
						if (typeof(api.dataDictionary.numInfants)=='number'||api.dataDictionary.numInfants.match(/^\d+$/))
							numTravelers += parseInt(api.dataDictionary.numInfants);
						if (numTravelers < 1)
							numTravelers = 1;
						api.dataDictionary.numTravelers = parseInt(numTravelers) + '';
						dkey.push('numTravelers');
					}
					else if (key=='clientCountryCode') {
						if (typeof(getCookie("TMS_EP"))=="undefined")
							setCookie("TMS_EP", api.dataDictionary.clientCountryCode);
						dkey.push('clientCountryCode');
					}
					if ((key=='travelStartDate'||key=='travelEndDate') 
					 && api.dataDictionary.travelStartDate!='' && api.dataDictionary.travelEndDate!='' &&
					 api.dataDictionary.travelStartDate.toLowerCase()!='mm/dd/yy' && api.dataDictionary.travelEndDate.toLowerCase()!='mm/dd/yy') {
	  					try {
		  					var date1 = new Date(api.dataDictionary.travelStartDate);
		    				var date2 = new Date(api.dataDictionary.travelEndDate);
		    				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		    				api.dataDictionary.lenStay = Math.ceil(timeDiff / (1000 * 3600 * 24));
		    				dkey.push('lenStay'); 
		    			} catch (err3) {}
					}	
					if ((key=='origAirportCode' || key=='destAirportCode' || key=='origCityName' || key == 'destCityName') && api.dataDictionary.productId==8) {
						if (api.dataDictionary.origAirportCode!='') {
							api.dataDictionary.carPickupLocType = 'airport';
							if (api.dataDictionary.tripType == '')
								if (api.dataDictionary.origAirportCode == api.dataDictionary.destAirportCode)
									api.dataDictionary.tripType = 'RT';
								else
									api.dataDictionary.tripType = 'OW';
						}
						else {
							api.dataDictionary.carPickupLocType = 'city';
							if (api.dataDictionary.tripType == '')
								if (api.dataDictionary.origCityName == api.dataDictionary.destCityName)
									api.dataDictionary.tripType = 'RT';
								else
									api.dataDictionary.tripType = 'OW';
						}
						if (api.dataDictionary.destAirportCode!='')
							api.dataDictionary.carDropoffLocType = 'airport';
						else
							api.dataDictionary.carDropoffLocType = 'city';
						dkey.push('carPickupLocType', 'carDropoffLocType', 'tripType');
					}
				}
				
				if (typeof(utag_data)!="undefined" && typeof(utag)!="undefined") {
					for ( var key in p_data) {
						utag_data[key] = p_data[key];
					}
					for ( var index in dkey) {
						utag_data[dkey[index]] = api.dataDictionary[dkey[index]];
					}
					
					if (p_data.emailAddress != undefined && p_data.emailAddress!='') {
						callEMSvcs();
					} else {
						utag.view(utag_data);
					}
				}
				
	 		}
		} catch (err) {
		   	if (typeof (console) != 'undefined')
				console.log(err);
		}
	}
	
	function setCookie(c_name, value, expiredays) {
		var exdate=new Date();
	    if (expiredays)
	    	exdate.setDate(exdate.getDate()+expiredays);
	    document.cookie=c_name+ "=" +escape(value)+
	    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";domain=.priceline.com;path=/";
	}
	function updateEM(response)  {
	 	if (response!=null && response.resultCode == "200") {
			if (typeof(response.lre)!="undefined") {
				api.dataDictionary.lre = response.lre;
			}
			if (typeof(response.lrv)!="undefined") {
				api.dataDictionary.lrv = response.lrv;
			}
			if (typeof(response.mhe)!="undefined") {
				api.dataDictionary.mhe = response.mhe;
			}
		}
		if (typeof(utag_data)=="undefined" && typeof(utag)=="undefined") 
			loadTMS();
		else if (api.dataDictionary.lre !='' && api.dataDictionary.lrv!='')  {
			var event=document.createEvent('CustomEvent');
			event.initEvent('TMS_meAvail',false,true);
			document.dispatchEvent(event);
		}
		
	}
	function updateSignedInStatus(status) {
		api.dataDictionary.signedIn = status;
		if (utag_data)
			utag_data.signedIn = status;
	}
 	function updateEP(response)  {
	 	if (response!=null && 
	 		( response.resultCode == "200" || response.resultCode=="OK")
			&& typeof(response.ipDetail)!="undefined" && typeof(response.ipDetail.countryCode)!="undefined" ) {
				api.dataDictionary.clientCountryCode = response.ipDetail.countryCode;
				setCookie("TMS_EP", response.ipDetail.countryCode);
		} else {
			api.dataDictionary.clientCountryCode = "";
			setCookie("TMS_EP", "");
		}
		postEP();
	}
	function optOutOptionsClicked() {
		if (typeof __tealiumMo2Div == 'undefined') {
			__tealiumMo2Div = document.createElement('SCRIPT');
			__tealiumMo2Div.type = 'text/javascript';
			if (api.dataDictionary.appCode=='MOBILEWEB' && api.tagSwitches.PLATFORM_MOBILE=='true' || ''=='mweb')
				__tealiumMo2Div.src = '//tags.tiqcdn.com/utag/pcln/mweb/prod/utag.tagsOptOut.js?cb='+Math.random();
			else
				__tealiumMo2Div.src = '//tags.tiqcdn.com/utag/pcln/main/prod/utag.tagsOptOut.js?cb='+Math.random();
			document.getElementsByTagName('head')[0].appendChild(__tealiumMo2Div);}
		else{
			if (typeof __tealium!='undefined')
				__tealium.load();
		}
	}
	api.config = config;
	api.dateToYMD = dateToYMD;
	api.getCookie = getCookie;
	api.optOutOptionsClicked = optOutOptionsClicked;
	api.push = push;
	api.updateEM = updateEM;
	return api;
})();
