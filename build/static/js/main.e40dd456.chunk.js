(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{156:function(e,t,a){e.exports=a(375)},161:function(e,t,a){},162:function(e,t,a){},163:function(e,t,a){},164:function(e,t,a){},179:function(e,t){},181:function(e,t){},213:function(e,t){},214:function(e,t){},279:function(e,t){},370:function(e,t,a){},371:function(e,t,a){},372:function(e,t,a){},373:function(e,t,a){},374:function(e,t,a){},375:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(155),c=a.n(r),o=(a(161),a(162),a(163),a(164),a(26)),i=a(48),s=a.n(i),m=a(60),u=a.n(m),d=(a(370),a(371),function(){return l.a.createElement("span",{className:"Loading"},"Loading...")}),f=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),i=Object(o.a)(c,2),m=i[0],f=i[1],E=Object(n.useState)(!0),h=Object(o.a)(E,2),w=h[0],p=h[1];return Object(n.useEffect)(function(){u()("http://localhost:5000/shows",function(e,t,a){if(e)f(!0);else{var n=JSON.parse(a);r(n),p(!1)}})},[]),m?l.a.createElement("p",null,"Something Borked"):w?l.a.createElement(d,null):l.a.createElement("div",{className:"Shows"},l.a.createElement("h2",null,"Shows"),l.a.createElement("ul",{className:"__list"},s.a.size(a)?s.a.map(a,function(e,t){return l.a.createElement("li",{className:"__item",key:t},l.a.createElement("span",null,l.a.createElement("i",{className:"icon ion-md-calendar"})," ",e.date),l.a.createElement("span",null,l.a.createElement("i",{className:"icon ion-md-people"})," ",e.roster," \\\\"," "),l.a.createElement("br",null),l.a.createElement("span",null,l.a.createElement("i",{className:"icon ion-md-compass"})," ",e.venue," \\\\"," "),l.a.createElement("span",null,e.location),l.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},l.a.createElement("span",null," more info...")))}):l.a.createElement("p",null,"No Upcoming Shows || Check Facebook, I probably forgot to update!")))},E=function(){var e=l.a.useRef(null),t=function(e){return window.devicePixelRatio>1?e*window.devicePixelRatio:e};return l.a.useEffect(function(){var a=!0,n=e.current;if(n){var l=n.getContext("2d");n.width=window.innerWidth/10,n.height=window.innerHeight/10,function(e,t,a,n){window.devicePixelRatio>1&&(e.width=a*window.devicePixelRatio,e.height=n*window.devicePixelRatio,e.setAttribute("style","width:".concat(a,"px;height:").concat(n,"px")),t.scale(window.devicePixelRatio,window.devicePixelRatio))}(n,l,n.width,n.height);var r=0;setInterval(function(){var e=Math.floor(10*Math.random());e%2===0&&l.clearRect(0,0,n.width,n.height),l.beginPath(),l.moveTo(r*e,0),l.lineTo(t(n.width),t(n.height)),l.lineWidth=1,l.closePath(),l.strokeStyle="#ff39a1",l.shadowColor="#ff39a1",l.shadowBlur=8,l.stroke(),100===r?a=!1:0===r&&(a=!0),r=a?r+1:r-1},200)}}),l.a.createElement("canvas",{ref:e,width:window.innerWidth,height:window.innerHeight})},h=(a(372),function(){return l.a.createElement("div",{className:"Console"},l.a.createElement("div",{className:"__crt"}),l.a.createElement("div",{className:"__glare"}),l.a.createElement("div",{className:"__line"}),l.a.createElement(E,null),l.a.createElement(E,null))}),w=(a(373),function(){return l.a.createElement("nav",{className:"Navigation"},l.a.createElement("ul",{className:"__list"},l.a.createElement("li",{className:"__item"},l.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//instagram.com/curse_words"},l.a.createElement("i",{className:"icon ion-logo-instagram"})," Instagram")),l.a.createElement("li",{className:"__item"},l.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//twitter.com/CurseWordsBand"},l.a.createElement("i",{className:"icon ion-md-trash"})," Twitter")),l.a.createElement("li",{className:"__item"},l.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//www.facebook.com/DontSayCurseWords/"},l.a.createElement("i",{className:"icon ion-logo-facebook"})," Facebook")),l.a.createElement("li",{className:"__item"},l.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"//dontsaycursewords.bandcamp.com/"},l.a.createElement("i",{className:"icon ion-md-radio"})," Bandcamp")),l.a.createElement("li",{className:"__item"},l.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"javascript:window.location.href = 'mailto:' + ['dontsaycursewords','gmail.com'].join('@')"},l.a.createElement("i",{className:"icon ion-md-mail"})," Email"))))}),p=(a(374),function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),i=Object(o.a)(c,2),m=i[0],f=i[1],E=Object(n.useState)(!0),h=Object(o.a)(E,2),w=h[0],p=h[1];return Object(n.useEffect)(function(){u()("http://localhost:5000/posts",function(e,t,a){if(e)f(!0);else{var n=JSON.parse(a);r(n),p(!1)}})},[]),m?l.a.createElement("p",null,"Something Borked"):w?l.a.createElement(d,null):l.a.createElement("div",{className:"Posts"},l.a.createElement("h2",null,"Posts"),l.a.createElement("ul",{className:"__list"},s.a.map(a,function(e,t){return l.a.createElement("li",{className:"__item",key:t},l.a.createElement("span",null,e.title," \\\\ "),l.a.createElement("span",null,e.content," \\\\ "),l.a.createElement("span",null,e.link))})))}),g=function(){return l.a.createElement("div",{className:"Prompt"},l.a.createElement(h,null),l.a.createElement(w,null),l.a.createElement("header",{className:"Prompt-header"},l.a.createElement("h1",null,"Curse Words")),l.a.createElement(p,null),l.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[156,1,2]]]);
//# sourceMappingURL=main.e40dd456.chunk.js.map