(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[22],{162:function(e,t,n){},163:function(e,t,n){e.exports={card:"BookItem_card__3WB3x"}},164:function(e,t,n){e.exports={"books-row":"BooksList_books-row__2-grT"}},165:function(e,t,n){"use strict";n.d(t,"a",(function(){return k}));var a=n(10),c=n(0),r=n(160),o=n.n(r);function i(e){var t=Object(c.useState)(1),n=Object(a.a)(t,2),r=n[0],i=n[1],s=function(){var t=function(e,t,n){var a=(t-1)*n;return o()(e).slice(a).take(n).value()}(e,r,9);return{totalCount:e.length,data:t}}(),l=s.totalCount;return{data:s.data,totalCount:l,pageSize:9,currentPage:r,handlePageChange:function(e){i(e)}}}n(162);var s=n(1),l=function(e){var t=e.itemsCount,n=e.pageSize,a=e.currentPage,c=e.onPageChange,r=Math.ceil(t/n);if(1===r)return null;var i=o.a.range(1,r+1);return Object(s.jsx)("div",{className:"pagination",style:{marginTop:"5%"},children:i.map((function(e){return Object(s.jsx)("div",{href:null,onClick:function(){return c(e)},className:e===a?"active":"page-item",children:e},e)}))})},u=n(170),b=n(97),j=n(180),d=n(18),h=n(69),f=n(163),O=n.n(f);function x(e){var t=e.book,n=Object(c.useState)(""),r=Object(a.a)(n,2),o=r[0],i=r[1],l=Object(c.useState)(!0),f=Object(a.a)(l,2),x=f[0],p=f[1],g=Object(c.useState)(""),k=Object(a.a)(g,2),m=k[0],v=k[1],S=j(t.createdOn).format("DD/MM/YYYY h:mm A");return Object(c.useEffect)((function(){return x&&(Object(h.c)(t._id).then((function(e){i(e)})),Object(h.b)(t.creator).then((function(e){v(e)}))),""===m&&v("https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok="),function(){p(!1)}}),[x,t._id,t.creator,m]),t.description.length>255&&(t.description=t.description.slice(0,256),t.description+="..."),Object(s.jsxs)(u.a,{className:O.a.card,children:[Object(s.jsx)(b.a,{src:m,alt:"No avatar",className:"avatar",style:{marginLeft:"36%",marginTop:"5%"}}),Object(s.jsxs)(u.a.Body,{children:[Object(s.jsx)(u.a.Img,{src:o,style:{width:"60%",height:"40%"},alt:"No image"}),Object(s.jsx)(u.a.Title,{style:{marginTop:"5%",textDecoration:"underline",fontSize:"20px"},children:Object(s.jsx)(d.b,{to:"/details/".concat(t._id),style:{color:"grey"},children:t.title})}),Object(s.jsxs)(u.a.Text,{style:{fontSize:"12px"},children:["Book added on ",S," ",Object(s.jsxs)(d.b,{to:"/user/".concat(t.creator),style:{fontSize:"12px",color:"black"},children:[" by ",t.creator]})]}),t.likes?Object(s.jsxs)(u.a.Text,{style:{fontSize:"12px"},children:[t.likes.length," like",t.likes.length>1?"s":""]}):Object(s.jsx)(u.a.Text,{style:{fontSize:"12px"},children:"0 likes"}),Object(s.jsx)(u.a.Text,{style:{wordBreak:"break-all",fontSize:"15px"},children:t.description}),Object(s.jsx)(u.a.Link,{as:d.b,to:"/details/".concat(t._id),style:{color:"grey",textDecoration:"none",fontSize:"15px"},children:"See more..."})]})]})}var p=n(164),g=n.n(p);function k(e){var t=e.books,n=i(t||[]),a=n.data,c=n.totalCount,r=n.pageSize,o=n.currentPage,u=n.handlePageChange,b=function(e,t){for(var n=[],a=0,c=e.length;a<c;)n.push(e.slice(a,a+=t));return n}(a,3);return Object(s.jsxs)(s.Fragment,{children:[b.map((function(e){return Object(s.jsx)("div",{className:g.a["books-row"],"data-testid":"booksrow",children:e.map((function(e){return Object(s.jsx)(x,{book:e},e._id)}))},e[0]._id)})),Object(s.jsx)(l,{itemsCount:c,pageSize:r,currentPage:o,onPageChange:u})]})}},216:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return l}));var a=n(10),c=n(0),r=n(9),o=n(165),i=n(96),s=n(1);function l(){var e=Object(r.h)().username,t=Object(c.useState)([]),n=Object(a.a)(t,2),l=n[0],u=n[1],b=Object(c.useState)(!0),j=Object(a.a)(b,2),d=j[0],h=j[1];return Object(c.useEffect)((function(){return d&&Object(i.h)(e).then((function(e){u(e)})),function(){h(!1)}})),d?Object(s.jsx)("p",{children:"Loading books"}):l&&l.length>0?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("h1",{children:[e,"'s books"]}),Object(s.jsx)(o.a,{books:l})]}):Object(s.jsx)("p",{children:"No books"})}}}]);
//# sourceMappingURL=22.b12fe64b.chunk.js.map