(function(c){var e=window.AmazonUIPageJS||window.P,k=e._namespace||e.attributeErrors,b=k?k("AmazonGatewayHerotatorJS"):e;b.guardFatal?b.guardFatal(c)(b,window):b.execute(function(){c(b,window)})})(function(c,e,k){c.when("generic-observable").register("gw-herotator-controller",function(b){var c=function(){};return function(e){function h(){t.notifyObservers("delayBegin")}function g(){t.notifyObservers("delayInterrupted")}function m(d){for(var a=0;a<z.length;a++)if(z[a]===d)return a+1}function a(d){d=
d||{};return{delay_complete:d.delay_complete||c,js_ready:d.js_ready||c,fg_loaded:d.fg_loaded||c,mouse_move:d.mouse_move||c,mouse_leave:d.mouse_leave||c,delay_interrupted_timeout:d.delay_interrupted_timeout||c,rotation_complete:d.rotation_complete||c,goto_card:function(d){d!==C&&q.user_navigation(z[d-1])},user_navigation:d.user_navigation||function(d){q=new u(d)},user_interaction:d.user_interaction||function(){q.user_navigation(z[C-1])},stop_autorotation:d.stop_autorotation||function(){q.user_navigation(z[C-
1])},pause:d.pause||c,resume:d.resume||c}}function f(){function d(){!b&&E[f]&&(q=1===B?new A:new k)}h();var f=z[(C-1+1)%B+1-1],b=!0;return new a({fg_loaded:function(a){a===f&&d()},delay_complete:function(){b=!1;d()},mouse_move:function(){q=new l},pause:function(){q=new r}})}function l(){g();return new a({mouse_move:g,mouse_leave:function(){q=new f},delay_interrupted_timeout:function(){q.mouse_leave()},pause:function(){q=new r(!0)}})}function r(d){g();return new a({mouse_move:function(){d=!0;g()},
mouse_leave:function(){d=!1},resume:function(){q=d?new l:0<H?new f:new A}})}function k(){t.notifyObservers("autorotating");C=(C-1+1)%B+1;t.notifyObservers("gotoCard",C);H--;return new a({rotation_complete:function(){q=0<H?new f:new A},mouse_move:function(){q=0<H?new d:new A},pause:function(){q=new x}})}function d(d){var f=!1;return new a({rotation_complete:function(){h();q=f?new r:new l},pause:function(){f=!0},resume:function(){f=!1}})}function x(){var d=!1;return new a({rotation_complete:function(){h();
q=new r(d)},mouse_move:function(){d=!0},mouse_leave:function(){d=!1}})}function u(d){t.notifyObservers("userNavigation");C=m(d);t.notifyObservers("gotoCard",C);return new a({rotation_complete:function(){q=new A},user_navigation:function(d){q=new y(d)},user_interaction:c})}function y(d){return new a({rotation_complete:function(){q=new u(d)},user_navigation:function(a){d=a},user_interaction:c})}function A(){t.notifyObservers("stopAutorotation");return new a({})}e=e||{};var t=new b,q=new function(){function d(){E[D]&&
b&&(t.notifyObservers("ready"),q=new f,g&&q.pause(),h&&q.stop_autorotation())}var b=!1,h=!1,g=!1;return new a({fg_loaded:function(a){a===D&&d()},js_ready:function(){b=!0;d()},user_navigation:c,stop_autorotation:function(){h=!0},pause:function(){g=!0},resume:function(){g=!1}})},z=e.fgIDs||[],B=z.length,D=z[0],C=e.card_num||1,E={},H=e.circular?Infinity:B;return{delayComplete:function(){q.delay_complete()},jsReady:function(){q.js_ready()},fgLoaded:function(d){E[d]=!0;D===d&&t.notifyObservers("atfLoaded");
q.fg_loaded(d)},mouseMove:function(){q.mouse_move()},mouseLeave:function(){q.mouse_leave()},delayInterruptedTimeout:function(){q.delay_interrupted_timeout()},rotationComplete:function(){q.rotation_complete()},gotoCard:function(d){q.goto_card(d)},userInteraction:function(){q.user_interaction()},userNavigation:function(d){q.user_navigation(d)},stopAutorotation:function(){q.stop_autorotation()},pause:function(){q.pause()},resume:function(){q.resume()},addObserver:t.addObserver,removeObserver:t.removeObserver}}});
c.when("herotator-btf").register("herotator",function(b){return b});c.register("herotator-btf",function(){return function(b,n){function p(d){return function(){c.when("gw-desktop-herotator/controller").execute(function(){F[d]()})}}function h(d,a,f){d.addEventListener?d.addEventListener(a,f,!1):d.attachEvent("on"+a,f)}function g(a,f){B[a]=[];var b=f.length;if(0<b)for(var q=0;q<b;q++)(function(b){var q=new Image;q.onload=function(){B[a].splice(d(B[a],q),1);B[a]&&0===B[a].length&&
c.when("gw-desktop-herotator/controller").execute(function(){var d=document.getElementById("gw-ftGr-"+a),f=d.className,f=f.replace(/\s*\ba\-lazy\-loaded\b\s*/,"");d.className=f;F.fgLoaded(a)});c.when("A").execute(function(d){var f=d.$("#gw-ftGr-"+a+" img.a-dynamic-image");d.loadDynamicImage(f)})};B[a].push(q);q.src=f[b].src})(q);else c.when("gw-desktop-herotator/controller").execute(function(){F.fgLoaded(a)})}function m(){z=Date.now()}function a(){E||r()}function f(){I=I?Math.min(I,Date.now()):Date.now();
clearTimeout(t.timeout_id);clearTimeout(f.timeout_id);f.timeout_id=setTimeout(function(){f.timeout_id=0;F.delayInterruptedTimeout()},3E3)}function l(){E=!0}function r(){r.sent||(clearTimeout(r.timeout),r.timeout=setTimeout(function(){k(b.uri,b.data);r.sent=!0},2E3))}function k(d,a){c.when("A").execute(function(f){f.$.ajax(d,{async:!1,cache:!1,type:"post",data:a})})}function d(d,a){if(d.indexOf)return d.indexOf(a);for(var f=0;f<d.length;f++)if(d[f]===a)return f}function x(){return R=R||y()}function u(d){"object"===
typeof e.ue&&"function"===typeof e.ue.count&&e.ue.count(d,(e.ue.count(d)||0)+1)}function y(){var d=L(".a-carousel-rounded-buttons .a-carousel-left,.a-carousel-rounded-buttons .a-carousel-right");L(".a-carousel-rounded-buttons .a-carousel-left").attr("cel_widget_id","gw-desktop-hero-left-cel");L(".a-carousel-rounded-buttons .a-carousel-right").attr("cel_widget_id","gw-desktop-hero-right-cel");L(".a-carousel-rounded-buttons .a-carousel-left").addClass("celwidget");L(".a-carousel-rounded-buttons .a-carousel-right").addClass("celwidget");
L(".a-carousel-rounded-buttons .a-carousel-left").click(function(d){u("gw-desktop-hero-left")});L(".a-carousel-rounded-buttons .a-carousel-right").click(function(d){u("gw-desktop-hero-right")});return{show:function(){d.show();L(".a-carousel-left").css("z-index",10);L(".a-carousel-right").css("z-index",10)},hide:function(){d.hide()}}}function A(){var d=L("#gw-desktop-herotator");d.addClass("gw-desktop-herotator-ready");c.register("herotator-controls",function(){1<d.find(".a-carousel-card").length?
(x().show(),e.GWI&&e.GWI.recordLatency("gwHerotatorActive")):x().hide()})}function t(d){H<I&&(C-=I-H,I=0);H=Date.now();t.timeout_id=setTimeout(function(){C=D;F.delayComplete()},C)}function q(d,a){q.current_card!==a&&(q.current_card=a,w.gotoPage(a),T.notifyObservers("page_changed"));setTimeout(function(){F.rotationComplete()},250)}var z=Date.now(),B={},D=5E3,C=D,E=!1,H=0,I=0,w,L,K=document.getElementById("gw-desktop-herotator").getElementsByTagName("ol")[0],T,F,R;h(K,"click",p("userInteraction"));
h(K,"mouseenter",p("mouseMove"));h(K,"mousemove",p("mouseMove"));h(K,"mouseleave",p("mouseLeave"));h(K,"touchstart",p("userInteraction"));h(K,"touchmove",p("userInteraction"));h(K,"touchend",p("userInteraction"));h(K,"touchcancel",p("userInteraction"));for(var K=document.getElementById("gw-desktop-herotator").getElementsByTagName("li")[0],M=0,U=K.childNodes[M];U&&"div"!==String(U.nodeName).toLowerCase();)M++,U=K.childNodes[M];M=U;K=String(M.id).replace(/^gw-ftGr-/,"");M=M.getElementsByTagName("img");
g(K,M||[]);for(var N=[K],K=0;n[K];)N.push(n[K].fgID),K++;c.when("gw-herotator-controller").execute(function(d){F=new d({fgIDs:N});F.addObserver("atfLoaded",m);F.addObserver("delayBegin",t);F.addObserver("delayInterrupted",f);F.addObserver("gotoCard",q);F.addObserver("userNavigation",a);F.addObserver("stopAutorotation",l);F.addObserver("ready",function(){var d=Date.now()-z;C=Math.max(D-d,1);A();L("#gw-desktop-herotator").addClass("gw-desktop-herotator-ready")});c.register("gw-desktop-herotator/controller");
c.when("generic-observable").register("gw-desktop-herotator",function(d){T=new d;return{getAutorotationDelay:function(){return D},setAutorotationDelay:function(d){d=parseInt(d,10);C=d-(D-C);D=d},stopAutorotation:function(){F.stopAutorotation()},disableNavigation:function(){x().hide();w.pause()},enableNavigation:function(){x().show();w.resume()},pause:function(){F.pause()},resume:function(){F.resume()},addObserver:T.addObserver,removeObserver:T.removeObserver}})});c.when("A","a-carousel-framework",
"gwAjax").execute(function(d,a,f){function b(){var d=0;for(e.GWI&&e.GWI.recordLatency("gw-hero-btf-populate");n[d];){var a=n[d].fgID,f=n[d].content,q=document.getElementById("gw-ftGr-"+a);L(q).html(f);f=q.getElementsByTagName("img");g(a,f);d++}}L=d.$;a.onInit("gateway-desktop-layout.herotator",function(){var q=d.$("#gw-desktop-herotator > .a-carousel-container");w=a.getCarousel(q);w.onChange("pageNumber",function(){var d=w.getAttr("pageNumber");F.gotoCard(d);d-=2;n[d]&&n[d].callbackUrl&&(f(n[d].callbackUrl,
{type:"POST",id:"desktop-herotator-btf-"+n[d].fgID}),delete n[d].callbackUrl)});b();c.when("gw-desktop-herotator").register("gw-desktop-herotator/dom-ready");c.when("gw-desktop-herotator/controller","gw-desktop-herotator").execute(function(){F.jsReady()})})})}})});