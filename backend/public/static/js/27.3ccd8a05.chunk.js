(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[27],{169:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return b})),n.d(t,"c",(function(){return j}));var r=n(6),a=n.n(r),c=n(15),s=n(13),u=n(96);function i(e){return o.apply(this,arguments)}function o(){return(o=Object(s.a)(a.a.mark((function e(t){var n,r,s,i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.f)();case 2:if(n=e.sent,r=[],null!==n){s=Object(c.a)(n);try{for(s.s();!(i=s.n()).done;)(o=i.value).title.toLowerCase().includes(t.toLowerCase())&&r.push(o)}catch(a){s.e(a)}finally{s.f()}r.sort((function(e,t){return e.title.localeCompare(t.title)}))}return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e){return l.apply(this,arguments)}function l(){return(l=Object(s.a)(a.a.mark((function e(t){var n,r,s,i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.f)();case 2:if(n=e.sent,r=[],null!==n){s=Object(c.a)(n);try{for(s.s();!(i=s.n()).done;)(o=i.value).author.toLowerCase().includes(t.toLowerCase())&&r.push(o)}catch(a){s.e(a)}finally{s.f()}r.sort((function(e,t){return e.title.localeCompare(t.title)}))}return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){return p.apply(this,arguments)}function p(){return(p=Object(s.a)(a.a.mark((function e(t){var n,r,s,i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.f)();case 2:if(n=e.sent,r=[],null!==n){s=Object(c.a)(n);try{for(s.s();!(i=s.n()).done;)o=i.value,o.genres.map((function(e){return e.toLowerCase()})).filter((function(e){return e.includes(t.toLowerCase())})).length>0&&r.push(o)}catch(a){s.e(a)}finally{s.f()}r.sort((function(e,t){return e.title.localeCompare(t.title)}))}return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e){return h.apply(this,arguments)}function h(){return(h=Object(s.a)(a.a.mark((function e(t){var n,r,s,i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.f)();case 2:if(n=e.sent,r=[],null!==n){s=Object(c.a)(n);try{for(s.s();!(i=s.n()).done;)(o=i.value).series&&o.series.toLowerCase().includes(t.toLowerCase())&&r.push(o)}catch(a){s.e(a)}finally{s.f()}r.sort((function(e,t){return e.seriesRow-t.seriesRow}))}return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},179:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(5),a=n(53),c=n(9),s=n(1),u=function(e){return function(t){return null!==Object(a.c)((function(e){return e.user})).token?Object(s.jsx)(e,Object(r.a)({},t)):Object(s.jsx)(c.a,{to:"/login"})}}},181:function(e,t,n){"use strict";n.d(t,"d",(function(){return j})),n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return x})),n.d(t,"g",(function(){return k})),n.d(t,"e",(function(){return g})),n.d(t,"c",(function(){return w})),n.d(t,"f",(function(){return C}));var r=n(6),a=n.n(r),c=n(15),s=n(13),u=n(7),i=n(54),o=n(96),f=n(169),l=n(98),b=Object(u.c)(i.a),p=Object(u.g)(b);function j(){return h.apply(this,arguments)}function h(){return(h=Object(s.a)(a.a.mark((function e(){var t,n,r,s,i,f,l,b,j,h;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.b)(Object(u.a)(p,"/users"));case 2:for(i in t=e.sent,n=t.val(),s=[],n)n[i]._id===localStorage.getItem("token")&&(f=n[i],r=i,f.favourites&&(s=f.favourites));l=Object(c.a)(s),e.prev=7,l.s();case 9:if((b=l.n()).done){e.next=21;break}return j=b.value,e.next=13,Object(o.g)(j);case 13:return void 0===e.sent&&s.splice(s.indexOf(j),1),(h=n[r]).favourites=s,e.next=19,Object(u.i)(Object(u.a)(p,"/users/"+r),h);case 19:e.next=9;break;case 21:e.next=26;break;case 23:e.prev=23,e.t0=e.catch(7),l.e(e.t0);case 26:return e.prev=26,l.f(),e.finish(26);case 29:return e.abrupt("return",s);case 30:case"end":return e.stop()}}),e,null,[[7,23,26,29]])})))).apply(this,arguments)}function O(){return d.apply(this,arguments)}function d(){return(d=Object(s.a)(a.a.mark((function e(){var t,n,r,s,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.f)();case 2:if(t=e.sent,n=[],null!==t){r=Object(c.a)(t);try{for(r.s();!(s=r.n()).done;)(u=s.value).creator===localStorage.getItem("username")&&n.push(u)}catch(a){r.e(a)}finally{r.f()}}return e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return v.apply(this,arguments)}function v(){return(v=Object(s.a)(a.a.mark((function e(){var t,n,r,s,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.f)();case 2:if(t=e.sent,n=[],null!==t){r=Object(c.a)(t);try{for(r.s();!(s=r.n()).done;)void 0!==(u=s.value).likes&&u.likes.includes(localStorage.getItem("username"))&&n.push(u)}catch(a){r.e(a)}finally{r.f()}}return e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){return m.apply(this,arguments)}function m(){return(m=Object(s.a)(a.a.mark((function e(t){var n,r,c,s,i,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.authors,r=t.genres,e.next=3,Object(u.b)(Object(u.a)(p,"/users"));case 3:c=e.sent,s=c.val(),e.t0=a.a.keys(s);case 6:if((e.t1=e.t0()).done){e.next=15;break}if(i=e.t1.value,s[i]._id!==localStorage.getItem("token")){e.next=13;break}return(o=s[i]).preferences={authors:n,genres:r},e.next=13,Object(u.i)(Object(u.a)(p,"/users/"+i),o);case 13:e.next=6;break;case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(){return y.apply(this,arguments)}function y(){return(y=Object(s.a)(a.a.mark((function e(){var t,n,r,c,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.b)(Object(u.a)(p,"/users"));case 2:for(c in t=e.sent,n=t.val(),r={},n)n[c]._id===localStorage.getItem("token")&&(s=n[c],r=s.preferences?s.preferences:{authors:[],genres:[]});return e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return S.apply(this,arguments)}function S(){return(S=Object(s.a)(a.a.mark((function e(){var t,n,r,s,u,i,l,b,p,j,h,O;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:return t=e.sent,n=t.genres,r=t.authors,e.next=7,Object(o.f)();case 7:if(s=e.sent,u=[],null===s){e.next=50;break}if(!(n&&n.length>0)){e.next=30;break}i=Object(c.a)(n),e.prev=12,i.s();case 14:if((l=i.n()).done){e.next=22;break}return b=l.value,e.next=18,Object(f.b)(b);case 18:e.sent.map((function(e){return u.push(e),e}));case 20:e.next=14;break;case 22:e.next=27;break;case 24:e.prev=24,e.t0=e.catch(12),i.e(e.t0);case 27:return e.prev=27,i.f(),e.finish(27);case 30:if(!(r&&r.length>0)){e.next=50;break}p=Object(c.a)(r),e.prev=32,p.s();case 34:if((j=p.n()).done){e.next=42;break}return h=j.value,e.next=38,Object(f.a)(h);case 38:e.sent.map((function(e){return u.push(e),e}));case 40:e.next=34;break;case 42:e.next=47;break;case 44:e.prev=44,e.t1=e.catch(32),p.e(e.t1);case 47:return e.prev=47,p.f(),e.finish(47);case 50:return O=new Set(u),e.abrupt("return",Array.from(O));case 52:case"end":return e.stop()}}),e,null,[[12,24,27,30],[32,44,47,50]])})))).apply(this,arguments)}function C(){return I.apply(this,arguments)}function I(){return(I=Object(s.a)(a.a.mark((function e(){var t,n,r,s,i,f,b,j,h,O,d;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.f)();case 2:return t=e.sent,e.next=5,Object(u.b)(p,"/users");case 5:return n=e.sent,r=n.val(),e.next=9,Object(l.c)();case 9:s=e.sent,i=Object(c.a)(t),e.prev=11,i.s();case 13:if((f=i.n()).done){e.next=26;break}if((b=f.value).creator!==localStorage.getItem("username")){e.next=18;break}return e.next=18,Object(o.n)(b._id);case 18:if(!b.likes||!b.likes.includes(localStorage.getItem("username"))){e.next=22;break}return b.likes.splice(b.likes.indexOf(localStorage.getItem("username")),1),e.next=22,Object(o.e)(b._id,b);case 22:return e.next=24,Object(l.e)(b._id);case 24:e.next=13;break;case 26:e.next=31;break;case 28:e.prev=28,e.t0=e.catch(11),i.e(e.t0);case 31:return e.prev=31,i.f(),e.finish(31);case 34:j=Object(c.a)(s),e.prev=35,j.s();case 37:if((h=j.n()).done){e.next=44;break}if((O=h.value).creator!==localStorage.getItem("username")){e.next=42;break}return e.next=42,Object(l.f)(O._id);case 42:e.next=37;break;case 44:e.next=49;break;case 46:e.prev=46,e.t1=e.catch(35),j.e(e.t1);case 49:return e.prev=49,j.f(),e.finish(49);case 52:e.t2=a.a.keys(r);case 53:if((e.t3=e.t2()).done){e.next=61;break}if(d=e.t3.value,r[d]._id!==localStorage.getItem("token")){e.next=59;break}return e.next=59,Object(u.h)(Object(u.a)(p,"/users/"+d));case 59:e.next=53;break;case 61:case"end":return e.stop()}}),e,null,[[11,28,31,34],[35,46,49,52]])})))).apply(this,arguments)}},223:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n.n(r),c=n(13),s=n(10),u=n(0),i=n(9),o=n(170),f=n(52),l=n(168),b=n(97),p=n(190),j=n(200),h=n(53),O=n(179),d=n(71),x=n(181),v=n(69),k=n(1);function m(e){return e&&"image"===e.type.split("/")[0]}t.default=Object(O.a)((function(){var e=Object(h.c)((function(e){return e.user})),t=Object(h.b)(),n=Object(i.g)(),r=Object(u.useState)(0),O=Object(s.a)(r,2),g=O[0],y=O[1],w=Object(u.useState)(0),S=Object(s.a)(w,2),C=S[0],I=S[1],L=Object(u.useState)(0),_=Object(s.a)(L,2),A=_[0],T=_[1],F=Object(u.useState)(!0),G=Object(s.a)(F,2),N=G[0],R=G[1],U=Object(u.useState)(null),Z=Object(s.a)(U,2),B=Z[0],D=Z[1],H=Object(u.useState)(""),J=Object(s.a)(H,2),K=J[0],X=J[1],q=Object(u.useState)(!1),z=Object(s.a)(q,2),E=z[0],P=z[1];Object(u.useEffect)((function(){return Object(x.a)().then((function(e){void 0!==e&&y(e.length)})),Object(x.b)().then((function(e){void 0!==e&&I(e.length)})),Object(x.d)().then((function(e){void 0!==e&&T(e.length)})),Object(v.b)(localStorage.getItem("username")).then((function(e){X(e)})).catch((function(e){X("https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png")})),function(){R(!1)}}),[N,K]);var M=function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),null!==B&&(P(!0),m(B)||fetch("https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok=").then((function(e){return e.blob()})).then((function(e){var t=new File([e],"avatar.jpg",{type:e.type});Object(v.e)(localStorage.getItem("username"),t).then((function(){P(!1),window.location.reload()}))})),Object(v.e)(localStorage.getItem("username"),B).then((function(){P(!1),window.location.reload()})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return N?Object(k.jsx)("p",{children:"Loading your info..."}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(o.a,{style:{width:"300px",marginTop:"2%"},children:[Object(k.jsxs)(o.a.Header,{children:[Object(k.jsx)("h1",{style:{marginTop:"0.5%"},children:"Profile info"}),Object(k.jsxs)("p",{children:["Username: ",e.username]})]}),Object(k.jsxs)(o.a.Body,{children:[Object(k.jsx)("div",{children:Object(k.jsxs)("p",{children:["Avatar preview: ",Object(k.jsx)(b.a,{src:K,alt:"No avatar",className:"avatar"})]})}),Object(k.jsxs)("p",{children:["Created books: ",g]}),Object(k.jsxs)("p",{children:["Liked books: ",C]}),Object(k.jsxs)("p",{children:["Favourite books: ",A]}),Object(k.jsx)(f.a,{variant:"danger",onClick:function(){Object(j.confirm)("Are you sure you want to remove your profile? The action is irreversible!").then((function(e){e&&Object(x.f)().then((function(e){t(Object(d.c)()),n("/")}))}))},children:"Remove profile"})]})]}),Object(k.jsxs)(l.a,{onSubmit:M,children:[Object(k.jsxs)(l.a.Group,{children:[Object(k.jsx)(l.a.Label,{children:"Set Avatar"}),Object(k.jsx)(l.a.Control,{type:"file",onChange:function(e){return D(e.target.files[0])}})]}),Object(k.jsx)(f.a,{type:"submit",style:{marginTop:"5%"},children:"Upload new avatar"})]}),Object(k.jsx)(p.a,{show:E,children:Object(k.jsx)(p.a.Body,{children:"Avatar is loading..."})})]})}))}}]);
//# sourceMappingURL=27.3ccd8a05.chunk.js.map