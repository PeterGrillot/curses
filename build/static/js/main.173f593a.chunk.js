(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{161:function(e,t,a){e.exports=a(380)},166:function(e,t,a){},167:function(e,t,a){},168:function(e,t,a){},169:function(e,t,a){},184:function(e,t){},186:function(e,t){},218:function(e,t){},219:function(e,t){},284:function(e,t){},375:function(e,t,a){},376:function(e,t,a){},377:function(e,t,a){},378:function(e,t,a){},379:function(e,t,a){},380:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(160),o=a.n(l),c=(a(166),a(167),a(168),a(169),a(27)),i=a(17),s=a.n(i),m=a(60),u=a.n(m),d=a(61),f=a(62),h=a(64),E=a(63),w=a(65),g=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(h.a)(this,Object(E.a)(t).call(this,e))).data=void 0,a.data=s.a.get(e,"feed.entry"),a}return Object(w.a)(t,e),Object(f.a)(t,[{key:"toUI",value:function(){return s.a.map(this.data,function(e){return{date:e.gsx$date.$t,url:e.gsx$url.$t,venue:e.gsx$venue.$t,roster:e.gsx$roster.$t,location:e.gsx$location.$t}})}}]),t}(n.Component),p=(a(375),a(376),function(){return r.a.createElement("span",{className:"Loading"},"Loading...")}),b=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(!1),i=Object(c.a)(o,2),m=i[0],d=i[1],f=Object(n.useState)(!0),h=Object(c.a)(f,2),E=h[0],w=h[1];return Object(n.useEffect)(function(){u()("https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/1/public/full?alt=json",function(e,t,a){if(e)d(!0);else{var n=new g(JSON.parse(a)).toUI();l(n),w(!1)}})},[]),m?r.a.createElement("p",null,"Something Borked"):E?r.a.createElement(p,null):r.a.createElement("div",{className:"Shows --center"},r.a.createElement("h2",null,"Upcoming Shows"),r.a.createElement("ul",{className:"__list"},s.a.size(a)?s.a.map(a,function(e,t){return r.a.createElement("li",{className:"__item",key:t},r.a.createElement("span",null,r.a.createElement("i",{className:"icon ion-md-calendar"})," ",e.date),r.a.createElement("span",null,r.a.createElement("i",{className:"icon ion-md-people"})," ",e.roster," \\\\"," "),r.a.createElement("br",null),r.a.createElement("span",null,r.a.createElement("i",{className:"icon ion-md-compass"})," ",e.venue," \\\\"," "),r.a.createElement("span",null,e.location),r.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("span",null," more info...")))}):r.a.createElement("p",null,"No Upcoming Shows || Check Facebook, I probably forgot to update!")))},v=function(){var e=r.a.useRef(null),t=function(e){return window.devicePixelRatio>1?e*window.devicePixelRatio:e};return r.a.useEffect(function(){var a=!0,n=e.current;if(n){var r=n.getContext("2d");n.width=window.innerWidth,n.height=window.innerHeight,function(e,t,a,n){window.devicePixelRatio>1&&(e.width=a*window.devicePixelRatio,e.height=n*window.devicePixelRatio,e.setAttribute("style","width:".concat(a,"px;height:").concat(n,"px")),t.scale(window.devicePixelRatio,window.devicePixelRatio))}(n,r,n.width,n.height);var l=0;setInterval(function(){var e=Math.floor(10*Math.random());e%2===0&&r.clearRect(0,0,n.width,n.height),r.beginPath(),r.moveTo(l*e,0),r.lineTo(t(n.width),t(n.height)),r.lineWidth=1,r.closePath(),r.strokeStyle="#ff39a1",r.shadowColor="#ff39a1",r.shadowBlur=8,r.stroke(),100===l?a=!1:0===l&&(a=!0),l=a?l+1:l-1},200)}}),r.a.createElement("canvas",{ref:e,width:window.innerWidth,height:window.innerHeight})},N=(a(377),function(){return r.a.createElement("div",{className:"Console"},r.a.createElement("div",{className:"__crt"}),r.a.createElement("div",{className:"__glare"}),r.a.createElement("div",{className:"__line"}),r.a.createElement(v,null),r.a.createElement(v,null))}),_=(a(378),function(){return r.a.createElement("nav",{className:"Navigation"},r.a.createElement("ul",{className:"__list"},r.a.createElement("li",{className:"__item"},r.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//instagram.com/curse_words"},r.a.createElement("i",{className:"icon ion-logo-instagram"})," Instagram")),r.a.createElement("li",{className:"__item"},r.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//twitter.com/CurseWordsBand"},r.a.createElement("i",{className:"icon ion-md-trash"})," Twitter")),r.a.createElement("li",{className:"__item"},r.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//www.facebook.com/DontSayCurseWords/"},r.a.createElement("i",{className:"icon ion-logo-facebook"})," Facebook")),r.a.createElement("li",{className:"__item"},r.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//dontsaycursewords.bandcamp.com/"},r.a.createElement("i",{className:"icon ion-md-radio"})," Bandcamp")),r.a.createElement("li",{className:"__item"},r.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"javascript:window.location.href = 'mailto:' + ['dontsaycursewords','gmail.com'].join('@')"},r.a.createElement("i",{className:"icon ion-md-mail"})," Email"))))}),O=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(h.a)(this,Object(E.a)(t).call(this,e))).data=void 0,a.data=s.a.get(e,"feed.entry"),a}return Object(w.a)(t,e),Object(f.a)(t,[{key:"toUI",value:function(){return s.a.map(this.data,function(e){return{title:e.gsx$title.$t,content:e.gsx$content.$t,link:e.gsx$link.$t}})}}]),t}(n.Component),j=(a(379),function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],l=t[1],o=Object(n.useState)(!1),i=Object(c.a)(o,2),m=i[0],d=i[1],f=Object(n.useState)(!0),h=Object(c.a)(f,2),E=h[0],w=h[1];return Object(n.useEffect)(function(){u()("https://spreadsheets.google.com/feeds/list/1pstEHIoEiQiNtYlTTEIygRJaOVVRVUhAy6BGVzNGm20/2/public/full?alt=json",function(e,t,a){if(e)d(!0);else{var n=new O(JSON.parse(a)).toUI();l(n),w(!1)}})},[]),m?r.a.createElement("p",null,"Something Borked"):E?r.a.createElement(p,null):r.a.createElement("div",{className:"Posts --center"},r.a.createElement("h2",null,"What's Going On?"),r.a.createElement("ul",{className:"__list"},s.a.map(a,function(e,t){return r.a.createElement("li",{className:"__item",key:t},r.a.createElement("h3",null,e.title),r.a.createElement("p",null,e.content),r.a.createElement("p",null,r.a.createElement("a",{href:e.link}," more Info...")," "))})))}),k=function(){return r.a.createElement("div",{className:"Prompt"},r.a.createElement(N,null),r.a.createElement(_,null),r.a.createElement("header",{className:"Prompt-header --center"},r.a.createElement("h1",null,"Curse Words Web Portal")),r.a.createElement(j,null),r.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[161,1,2]]]);
//# sourceMappingURL=main.173f593a.chunk.js.map