(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[24],{159:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var c=n(2),a=n(38),r=n(3),i=n(1),o=function(e){return function(t){return null!==Object(a.c)((function(e){return e.user})).token?Object(i.jsx)(e,Object(c.a)({},t)):Object(i.jsx)(r.a,{to:"/login"})}}},221:function(e,t,n){"use strict";n.r(t);var c=n(5),a=n(0),r=n(3),i=n(167),o=n(53),j=n(147),s=n(165),b=n(187),u=n(182),l=n(38),O=n(159),d=n(57),h=n(161),f=n(162),x=n(1);t.default=Object(O.a)((function(){var e=Object(l.c)((function(e){return e.user})),t=Object(l.b)(),n=Object(r.g)(),O=Object(a.useState)(0),p=Object(c.a)(O,2),v=p[0],g=p[1],m=Object(a.useState)(0),S=Object(c.a)(m,2),w=S[0],y=S[1],k=Object(a.useState)(0),A=Object(c.a)(k,2),C=A[0],T=A[1],B=Object(a.useState)(!0),F=Object(c.a)(B,2),I=F[0],J=F[1],L=Object(a.useState)(null),N=Object(c.a)(L,2),U=N[0],D=N[1],E=Object(a.useState)(""),G=Object(c.a)(E,2),H=G[0],P=G[1],R=Object(a.useState)(!1),q=Object(c.a)(R,2),z=q[0],K=q[1];return Object(a.useEffect)((function(){return Object(h.a)().then((function(e){void 0!==e&&g(e.length)})),Object(h.b)().then((function(e){void 0!==e&&y(e.length)})),Object(h.d)().then((function(e){void 0!==e&&T(e.length)})),Object(f.b)(localStorage.getItem("username")).then((function(e){P(e)})).catch((function(e){})),function(){J(!1)}}),[I,H]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(i.a,{style:{width:"300px",marginTop:"2%"},children:[Object(x.jsxs)(i.a.Header,{children:[Object(x.jsx)("h1",{children:"Profile info"}),Object(x.jsxs)("p",{children:["Username: ",e.username]})]}),Object(x.jsxs)(i.a.Body,{children:[Object(x.jsx)("div",{children:Object(x.jsxs)("p",{children:["Avatar preview: ",Object(x.jsx)(s.a,{src:H,alt:"No avatar",className:"avatar"})]})}),Object(x.jsxs)("p",{children:["Created books: ",v]}),Object(x.jsxs)("p",{children:["Liked books: ",w]}),Object(x.jsxs)("p",{children:["Favourite books: ",C]}),Object(x.jsx)(o.a,{variant:"danger",onClick:function(){Object(u.confirm)("Are you sure you want to remove your profile? The action is irreversible!").then((function(e){e&&Object(h.f)().then((function(e){t(Object(d.c)()),n("/")}))}))},children:"Remove profile"})]})]}),Object(x.jsxs)(j.a,{onSubmit:function(e){e.preventDefault(),null!==U&&(K(!0),Object(f.e)(localStorage.getItem("username"),U).then((function(){K(!1),window.location.reload()})))},children:[Object(x.jsxs)(j.a.Group,{children:[Object(x.jsx)(j.a.Label,{children:"Set Avatar (optional)"}),Object(x.jsx)(j.a.Control,{type:"file",onChange:function(e){return D(e.target.files[0])}})]}),Object(x.jsx)(o.a,{type:"submit",style:{marginTop:"5%"},children:"Upload new avatar"})]}),Object(x.jsx)(b.a,{show:z,children:Object(x.jsx)(b.a.Body,{children:"Avatar is loading..."})})]})}))}}]);
//# sourceMappingURL=24.337cac48.chunk.js.map