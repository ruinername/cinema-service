(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);a(64),a(89);var n=a(0),i=a.n(n),r=a(33),l=a.n(r),c=a(34),o=a.n(c),m=a(57),u=a(58),s=a(61),d=a(59),h=a(62),p=a(1),f=(a(111),a(10)),g=a(60),v=a.n(g),E={flexShrink:0,width:130,height:"auto",flexDirection:"column",alignItems:"center",fontSize:16,paddingLeft:4},y={width:110,height:150,borderRadius:20},b={width:100,marginTop:0,marginBottom:0,padding:3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},w={color:"grey",fontSize:14},k=function(e){var t=e.id,a=e.openFilm,n=e.activePreview,r=e.go,l=e.futurePreview;e.setid;return i.a.createElement(p.Panel,{id:t},i.a.createElement(p.PanelHeader,null,"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),i.a.createElement(p.Gallery,{slideWidth:"100%",style:{height:150,borderRadius:10,marginLeft:15,marginRight:15,marginTop:15,marginBottom:15},bullets:"dark",autoplay:3e3},i.a.createElement(p.Link,{onClick:r,"data-to":"popular"},i.a.createElement("img",{style:{height:150,width:"100%"},src:v.a}))),i.a.createElement(p.Group,{style:{paddingBottom:8}},i.a.createElement(p.Header,{level:"2",aside:i.a.createElement(p.Link,null,"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435")},"\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u043a\u0438\u043d\u043e"),i.a.createElement(p.HorizontalScroll,null,i.a.createElement("div",{style:{display:"flex"}},n&&n.map(function(e,t){return i.a.createElement(p.Link,{onClick:a,"data-fid":e._id,"data-to":"film",key:t,style:Object(f.a)({},E)},i.a.createElement("img",{src:e.image,size:64,style:Object(f.a)({},y,{marginBottom:8})}),i.a.createElement("p",{style:Object(f.a)({},b,w)},e.genre),i.a.createElement("p",{style:b},e.title))})))),i.a.createElement(p.Group,{style:{paddingBottom:8}},i.a.createElement(p.Header,{level:"2",aside:i.a.createElement(p.Link,null,"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435")},"\u0421\u043a\u043e\u0440\u043e \u0432 \u043a\u0438\u043d\u043e"),i.a.createElement(p.HorizontalScroll,null,i.a.createElement("div",{style:{display:"flex"}},l&&l.map(function(e,t){return i.a.createElement(p.Link,{onClick:a,"data-fid":e._id,"data-to":"film",key:t,style:Object(f.a)({},E)},i.a.createElement("img",{src:e.image,size:64,style:Object(f.a)({},y,{marginBottom:8})}),i.a.createElement("p",{style:Object(f.a)({},b,w)},e.genre),i.a.createElement("p",{style:b},e.title))})))))},P=a(23),j=a.n(P),O=a(18),S=a.n(O),B=Object(p.platform)(),F=function(e){var t=e.id,a=e.go;return i.a.createElement(p.Panel,{id:t},i.a.createElement(p.PanelHeader,{left:i.a.createElement(p.HeaderButton,{onClick:a,"data-to":"home"},B===p.IOS?i.a.createElement(j.a,null):i.a.createElement(S.a,null))},"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0435"))},x={image_url:"https://image.tmdb.org/t/p/original",server_url:"https://cinema.voloshinskii.ru"},H=Object(p.platform)(),L=function(e){var t=e.id,a=e.go,n=e.currentFilm;return i.a.createElement(p.Panel,{id:t,theme:"white"},i.a.createElement(p.PanelHeader,{left:i.a.createElement(p.HeaderButton,{onClick:a,"data-to":"home"},H===p.IOS?i.a.createElement(j.a,null):i.a.createElement(S.a,null))},n&&n.title),n&&i.a.createElement(p.Group,{style:{marginTop:0}},i.a.createElement("img",{src:x.image_url+n.tmdbFullData.poster_path,style:{width:"100%"}})),i.a.createElement(p.Button,{size:"xl",style:{width:"90%",margin:"auto"},level:"secondary"},"\u0418\u0434\u0443 \u043d\u0430 \u0444\u0438\u043b\u044c\u043c"))},z=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).go=function(e){a.setState({activePanel:e.currentTarget.dataset.to})},a.openFilm=function(e){a.setState({activePanel:e.currentTarget.dataset.to,filmid:e.currentTarget.dataset.fid}),fetch("https://cinema.voloshinskii.ru/film/".concat(e.currentTarget.dataset.fid)).then(function(e){return e.json()}).then(function(e){return a.setState({currentFilm:e})})},a.state={activePanel:"home",activePreview:null,futurePreview:null,currentFilm:null},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://cinema.voloshinskii.ru/active/preview").then(function(e){return e.json()}).then(function(t){return e.setState({activePreview:t})}),fetch("https://cinema.voloshinskii.ru/future/preview").then(function(e){return e.json()}).then(function(t){return e.setState({futurePreview:t})})}},{key:"render",value:function(){return i.a.createElement(p.View,{activePanel:this.state.activePanel},i.a.createElement(k,{id:"home",activePreview:this.state.activePreview,futurePreview:this.state.futurePreview,go:this.go,openFilm:this.openFilm,setid:this.setid}),i.a.createElement(F,{id:"popular",go:this.go}),i.a.createElement(L,{currentFilm:this.state.currentFilm,id:"film",go:this.go}))}}]),t}(i.a.Component);o.a.send("VKWebAppInit",{}),l.a.render(i.a.createElement(z,null),document.getElementById("root"))},60:function(e,t,a){e.exports=a.p+"static/media/banner-1.be3b55c6.png"},63:function(e,t,a){e.exports=a(112)}},[[63,1,2]]]);
//# sourceMappingURL=main.50e26f1d.chunk.js.map