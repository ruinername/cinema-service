(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{121:function(e,t,a){"use strict";a.r(t);a(72),a(97);var n=a(0),i=a.n(n),r=a(41),l=a.n(r),o=a(7),s=a.n(o),c=a(2),u=a(3),p=a(5),d=a(4),h=a(6),m=a(1),f=(a(118),a(65)),b=a.n(f),g=a(66),v=a.n(g),y=a(26),k=a(67),E=a.n(k),j=function(e){function t(){return Object(c.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement("span",{style:{padding:"2px 10px",borderRadius:15,backgroundColor:"white",position:"absolute",right:"20%",top:"2%",fontWeight:"bold",fontSize:14}},this.props.rating)}}]),t}(i.a.Component),O={flexShrink:0,width:130,height:"auto",flexDirection:"column",alignItems:"center",fontSize:16,paddingLeft:4},w={width:110,height:150,borderRadius:15},F={width:100,marginTop:0,marginBottom:0,padding:3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},C=function(e){var t=e.id,a=e.openFilm,n=e.activePreview,r=e.go,l=e.futurePreview;e.setid;return i.a.createElement(m.Panel,{id:t},i.a.createElement(m.PanelHeader,null,"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),i.a.createElement(m.Gallery,{slideWidth:"100%",style:{height:150,borderRadius:10,marginLeft:15,marginRight:15,marginTop:15,marginBottom:15},bullets:"dark",autoplay:3e3},i.a.createElement(m.Link,{onClick:r,"data-to":"popular"},i.a.createElement("img",{style:{height:150,width:"100%"},src:E.a}))),i.a.createElement(m.Group,{style:{paddingBottom:8}},i.a.createElement(m.Header,{level:"2",aside:i.a.createElement(m.Link,{"data-to":"active",onClick:r},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435")},"\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u043a\u0438\u043d\u043e"),i.a.createElement(m.HorizontalScroll,null,i.a.createElement("div",{style:{display:"flex"}},n&&n.map(function(e,t){return i.a.createElement(m.Link,{onClick:a,"data-fid":e.tmdbId,"data-to":"film",key:t,style:Object(y.a)({},O)},i.a.createElement("div",{style:{position:"relative"}},e.tmdbFullData.vote_average&&i.a.createElement(j,{rating:e.tmdbFullData.vote_average}),i.a.createElement("img",{src:e.image,size:64,style:Object(y.a)({},w,{marginBottom:8})})),i.a.createElement("p",{style:F},e.title))})))),i.a.createElement(m.Group,{style:{paddingBottom:8}},i.a.createElement(m.Header,{level:"2",aside:i.a.createElement(m.Link,{"data-to":"future",onClick:r},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435")},"\u0421\u043a\u043e\u0440\u043e \u0432 \u043a\u0438\u043d\u043e"),i.a.createElement(m.HorizontalScroll,null,i.a.createElement("div",{style:{display:"flex"}},l&&l.map(function(e,t){return i.a.createElement(m.Link,{onClick:a,"data-fid":e.tmdbId,"data-to":"film",key:t,style:Object(y.a)({},O)},i.a.createElement("div",{style:{display:"relative"}},i.a.createElement("img",{src:e.image,size:64,style:Object(y.a)({},w,{marginBottom:8})})),i.a.createElement("p",{style:F},e.title))})))))},x=a(16),S=a.n(x),T=a(14),P=a.n(T),I=a(31),A=a.n(I),W=function(e){function t(){return Object(c.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:"#656565",textAlign:"center"}},this.props.children)}}]),t}(i.a.Component),R=function(e){function t(e){return Object(c.a)(this,t),Object(p.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"s",value:function(e,t){var a=(e=Math.abs(e)%100)%10;return e>10&&e<20?t[2]:a>1&&a<5?t[1]:1==a?t[0]:t[2]}},{key:"render",value:function(){return i.a.createElement("div",{"data-fid":this.props.datafid,onClick:this.props.onClick,style:{padding:"10px",gridGap:"20px",display:"grid",gridTemplateColumns:"23% 60%"}},i.a.createElement("img",{style:{width:"100%",marginRight:10,verticalAlign:"top",borderRadius:10},src:this.props.image}),i.a.createElement("div",null,i.a.createElement("div",{style:{verticalAlign:"top",fontWeight:"bold",fontSize:16}},this.props.title),this.props.popularCount&&i.a.createElement("div",{style:{fontSize:14,color:"grey"}},this.props.popularCount," ",this.s(this.props.popularCount,["\u0434\u0440\u0443\u0433 \u0445\u043e\u0447\u0435\u0442","\u0434\u0440\u0443\u0433\u0430 \u0445\u043e\u0442\u044f\u0442","\u0434\u0440\u0443\u0437\u0435\u0439 \u0445\u043e\u0442\u044f\u0442"])," \u043f\u043e\u0439\u0442\u0438 \u043d\u0430 \u044d\u0442\u043e\u0442 \u0444\u0438\u043b\u044c\u043c")))}}]),t}(i.a.Component),D=Object(m.platform)(),L=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={error:!1,response:[]},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;s.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppAccessTokenReceived":e.setState({tokenWithScope:t.detail.data,error:!1}),s.a.send("VKWebAppCallAPIMethod",{method:"friends.getAppUsers",params:{access_token:t.detail.data.token}}),s.a.send("VKWebAppTapticNotificationOccurred",{type:"success"});break;case"VKWebAppCallAPIMethodResult":if(e.state.loaded)break;var a=t.detail.data.response;fetch("https://cinema.voloshinskii.ru/popular/friends",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({friends:a})}).then(function(e){return e.json()}).then(function(t){return e.setState({response:Object.values(t.result),loaded:!0})});break;default:console.log(t.detail)}}),-1===this.props.token.scope.search("friends")?(this.setState({error:!0}),s.a.send("VKWebAppGetAuthToken",{app_id:6977050,scope:"friends"})):s.a.send("VKWebAppCallAPIMethod",{method:"friends.getAppUsers",params:{v:5.95,access_token:this.props.token.access_token}})}},{key:"componentDidUpdate",value:function(){console.log(this.state)}},{key:"share",value:function(){s.a.send("VKWebAppTapticNotificationOccurred",{type:"success"}),s.a.send("VKWebAppShowWallPostBox",{message:"\u042f \u043d\u0430\u0445\u043e\u0436\u0443 \u0445\u043e\u0440\u043e\u0448\u0438\u0435 \u0444\u0438\u043b\u044c\u043c\u044b \u043d\u0430 VKCinema, \u0430 \u0442\u044b? https://vk.com/app6977050"})}},{key:"render",value:function(){var e=this;return i.a.createElement(m.Panel,{theme:"white",id:this.props.id},i.a.createElement(m.PanelHeader,{left:i.a.createElement(m.HeaderButton,{onClick:this.props.go,"data-to":"home"},D===m.IOS?i.a.createElement(S.a,null):i.a.createElement(P.a,null))},"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0435 \u0441\u0440\u0435\u0434\u0438 \u0434\u0440\u0443\u0437\u0435\u0439"),!this.state.error&&!this.state.loaded&&i.a.createElement(m.Spinner,{size:"large",style:{marginTop:30}}),this.state.error&&i.a.createElement(W,null,"\u0414\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044e \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0438\u043c\u0435\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0441\u043f\u0438\u0441\u043a\u0443 \u0412\u0430\u0448\u0438\u0445 \u0434\u0440\u0443\u0437\u0435\u0439"),!this.state.error&&this.state.loaded&&0==this.state.response.length&&i.a.createElement(W,null,i.a.createElement("span",null,"\u041d\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u0412\u0430\u0448\u0438\u0445 \u0434\u0440\u0443\u0437\u0435\u0439 \u0435\u0449\u0451 \u043d\u0435 \u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043d\u0430\u0448\u0438\u043c \u0441\u0435\u0440\u0432\u0438\u0441\u043e\u043c. \u041d\u043e \u044d\u0442\u043e \u043c\u043e\u0436\u043d\u043e \u043b\u0435\u0433\u043a\u043e \u0438\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c!"),i.a.createElement(m.Button,{onClick:this.share,size:"xl",style:{width:"90%",margin:"auto"},level:"secondary"},"\u0414\u0430\u0432\u0430\u0439\u0442\u0435!")),!this.state.error&&this.state.loaded&&this.state.response.length>0&&i.a.createElement("div",{style:{paddingTop:"35px"}},this.state.response.map(function(t){return i.a.createElement(R,{"data-fid":t.data.tmdbId,datafid:t.data.tmdbId,onClick:e.props.openFilm,popularCount:t.count,key:t.data._id,title:t.data.title,image:t.data.image})})))}}]),t}(i.a.Component),z=a(12),V=a(68),_=a.n(V),B={image_url:"https://image.tmdb.org/t/p/original",server_url:"https://cinema.voloshinskii.ru"},K=a(69),M=a.n(K),H=(a(119),a(120),function(e){function t(e){return Object(c.a)(this,t),Object(p.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{position:"relative"}},"https://image.tmdb.org/t/p/originalnull"==this.props.back&&i.a.createElement("img",{src:"https://image.tmdb.org/t/p/original/pKDVywMKjM7TeU739z7cR9wu9Sf.jpg",style:{width:"100%",filter:"blur(15px)"}}),i.a.createElement("img",{src:this.props.back,style:{width:"100%",filter:"blur(2.2px)"}}),i.a.createElement("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"98%",backgroundColor:"rgba(0, 0, 0, 0.40)"}},i.a.createElement("img",{src:this.props.front,style:{width:"27%",position:"absolute",bottom:"-5%",left:"8%",borderRadius:10,boxShadow:"0 12px 30px 0 rgba(35,39,42,.4)",zIndex:1e3}}),i.a.createElement("span",{style:{position:"absolute",top:"40%",left:"40%",color:"white",fontWeight:"bold",fontSize:19}},this.props.title)))}}]),t}(i.a.Component)),G=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={expanded:!1},a.expand=a.expand.bind(Object(z.a)(Object(z.a)(a))),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"expand",value:function(){var e=!this.state.expanded;this.setState({expanded:e}),console.log(this.state.expanded)}},{key:"render",value:function(){return i.a.createElement(A.a,{line:this.state.expanded?9999999999:4,truncateText:this.state.expanded?"":"...",text:this.props.text,textTruncateChild:i.a.createElement("a",{style:{color:"#528bcc"},onClick:this.expand},"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435")})}}]),t}(i.a.Component),Q=a(70),N=a.n(Q),U=function(e){function t(){return Object(c.a)(this,t),Object(p.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{style:{position:"fixed",zIndex:"1999",background:"rgba(0, 0, 0, 0.55)",width:"100%",height:"100%",bottom:0}}),i.a.createElement("div",{style:{position:"fixed",bottom:0,borderRadius:"20px 20px 0 0",background:"white",width:"100%",zIndex:"2000"}},i.a.createElement("div",{style:{display:"relative",textAlign:"center",fontWeight:"bold",margin:"20px 0"}},this.props.title,i.a.createElement(N.a,{onClick:this.props.onClose,style:{position:"absolute",top:"10px",right:"25px"}}),i.a.createElement("div",{style:{marginTop:"15px",borderBottom:"1px solid grey"}})),this.props.children))}}]),t}(i.a.Component),q=Object(m.platform)(),J=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={qr:!1},a.watch=a.watch.bind(Object(z.a)(Object(z.a)(a))),a.QRModal=a.QRModal.bind(Object(z.a)(Object(z.a)(a))),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"watch",value:function(e,t){this.props.currentFilm.going?(s.a.send("VKWebAppTapticNotificationOccurred",{type:"success"}),fetch("https://cinema.voloshinskii.ru/unwatch?token=".concat(e,"&filmId=").concat(t)).then(function(e){return e.json()})):(s.a.send("VKWebAppTapticNotificationOccurred",{type:"success"}),fetch("https://cinema.voloshinskii.ru/watch?token=".concat(e,"&filmId=").concat(t)).then(function(e){return e.json()})),this.props.currentFilm.going=!this.props.currentFilm.going,this.setState({going:this.props.currentFilm.going})}},{key:"share",value:function(e){s.a.send("VKWebAppTapticNotificationOccurred",{type:"success"}),s.a.send("VKWebAppShowWallPostBox",{message:"https://vk.com/app6977050#".concat(e)})}},{key:"QRModal",value:function(){var e=!this.state.qr;this.setState({qr:e})}},{key:"render",value:function(){var e=this;return i.a.createElement(m.Panel,{id:this.props.id,theme:"white"},i.a.createElement(m.PanelHeader,{left:i.a.createElement(m.HeaderButton,{onClick:this.props.go,"data-to":"home"},q===m.IOS?i.a.createElement(S.a,null):i.a.createElement(P.a,null))},this.props.currentFilm&&this.props.currentFilm.title),!this.props.currentFilm&&i.a.createElement(m.Spinner,{size:"large",style:{marginTop:30}}),this.props.currentFilm&&i.a.createElement(H,{back:B.image_url+this.props.currentFilm.tmdbFullData.backdrop_path,front:this.props.currentFilm.image,title:this.props.currentFilm.title}),i.a.createElement(m.Group,{style:{marginTop:0,overflow:"auto"}},i.a.createElement(m.Div,null,this.props.currentFilm&&this.props.currentFilm.tmdbFullData.vote_average>0&&i.a.createElement(m.InfoRow,{style:{display:"inline-block"},title:"\u0420\u0435\u0439\u0442\u0438\u043d\u0433"},i.a.createElement("span",{style:{color:"#528bcc",fontWeight:"bold",fontSize:20}},this.props.currentFilm.tmdbFullData.vote_average)),this.props.currentFilm&&this.props.currentFilm.tmdbFullData.runtime>0&&i.a.createElement(m.InfoRow,{style:{display:"inline-block",float:"right"},title:"\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c"},i.a.createElement("span",{style:{color:"grey",fontWeight:"bold",fontSize:20}},this.props.currentFilm.tmdbFullData.runtime," \u043c\u0438\u043d")))),i.a.createElement(m.Div,null,this.props.currentFilm&&this.props.currentFilm.tmdbFullData.overview&&i.a.createElement(G,{text:this.props.currentFilm.tmdbFullData.overview})),i.a.createElement("div",{style:{width:"90%",margin:"auto",display:"flex",flexDirection:"row",justifyContent:"space-between"}},this.props.currentFilm&&!this.props.currentFilm.going&&i.a.createElement(m.Button,{size:"xl",style:{width:"48%",display:"inline-block"},level:"primary",onClick:function(){e.watch(e.props.authToken,e.props.currentFilm._id)}},"\u0418\u0434\u0443 \u043d\u0430 \u0444\u0438\u043b\u044c\u043c"),this.props.currentFilm&&this.props.currentFilm.going&&i.a.createElement(m.Button,{size:"xl",style:{width:"48%",display:"inline-block"},level:"primary",onClick:function(){e.watch(e.props.authToken,e.props.currentFilm._id)}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430"),this.props.currentFilm&&i.a.createElement(m.Button,{size:"xl",onClick:this.QRModal,style:{width:"48%",display:"inline-block"},level:"secondary",before:i.a.createElement(M.a,null)})),this.props.currentFilm&&this.props.currentFilm.video&&i.a.createElement(m.Group,{title:"\u0422\u0440\u0435\u0439\u043b\u0435\u0440"},i.a.createElement("iframe",{width:"100%",height:"204",style:{margin:"auto"},src:"https://www.youtube.com/embed/".concat(this.props.currentFilm.video),frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),i.a.createElement(m.Group,null,i.a.createElement(m.Div,null,this.props.currentFilm&&this.props.currentFilm.tmdbFullData.release_date&&i.a.createElement(m.InfoRow,{title:"\u041f\u0440\u0435\u043c\u044c\u0435\u0440\u0430"},new Date(this.props.currentFilm.tmdbFullData.release_date).toLocaleString("ru",{year:"numeric",month:"long",day:"numeric"}))),i.a.createElement(m.Div,null,this.props.currentFilm&&this.props.currentFilm.tmdbFullData.budget>0&&i.a.createElement(m.InfoRow,{title:"\u041e\u0431\u0449\u0438\u0439 \u0431\u044e\u0434\u0436\u0435\u0442"},this.props.currentFilm.tmdbFullData.budget.toLocaleString("ru"),"$")),i.a.createElement(m.Div,null,this.props.currentFilm&&this.props.currentFilm.tmdbFullData.revenue>0&&i.a.createElement(m.InfoRow,{title:"\u0421\u0431\u043e\u0440\u044b"},this.props.currentFilm.tmdbFullData.revenue.toLocaleString("ru"),"$"))),this.state.qr&&i.a.createElement(U,{title:"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0444\u0438\u043b\u044c\u043c\u043e\u043c",onClose:this.QRModal},i.a.createElement(m.Div,null,i.a.createElement(m.InfoRow,null,i.a.createElement("div",{style:{width:"256px",margin:"auto"},dangerouslySetInnerHTML:{__html:_.a.createQR("https://vk.com/app6977050#".concat(this.props.currentFilm.tmdbId),256,"qr-code-class",!0)}})),i.a.createElement("div",{style:{width:"256px",margin:"auto",textAlign:"center",color:"grey",marginBottom:"20px"}},"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0434\u0430\u043d\u043d\u043e\u0439 \u0441\u0442\u0430\u043d\u0438\u0446\u0435\u0439 \u0441\u043e \u0441\u0432\u043e\u0438\u043c\u0438 \u0434\u0440\u0443\u0437\u044c\u044f\u043c\u0438. \u041f\u0440\u0438 \u043d\u0430\u0432\u0435\u0434\u0435\u043d\u0438\u0438 \u043d\u0430 QR-\u043a\u043e\u0434 \u043e\u0442\u043a\u0440\u043e\u0435\u0442\u0441\u044f \u0434\u0430\u043d\u043d\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430"),i.a.createElement("div",{style:{width:"90%",margin:"auto",display:"flex",flexDirection:"row",justifyContent:"space-between"}},i.a.createElement(m.Button,{size:"xl",style:{width:"49%"},level:"primary",onClick:function(){e.share(e.props.currentFilm.tmdbId)}},"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f"),i.a.createElement(m.Button,{size:"xl",style:{width:"49%"},component:"a",href:"https://vk.com/wall-58810575_52712",level:"secondary"},"\u041a\u0430\u043a \u0441\u043a\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c?")))))}}]),t}(i.a.Component),$=Object(m.platform)(),X=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={search:"",futureList:[]},a.onChange=a.onChange.bind(Object(z.a)(Object(z.a)(a))),a.searchRes=a.searchRes.bind(Object(z.a)(Object(z.a)(a))),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"onChange",value:function(e){this.setState({search:e})}},{key:"searchRes",value:function(){var e=this.state.search.toLowerCase();return this.state.futureList.filter(function(t){return t.title.toLowerCase().indexOf(e)>-1})}},{key:"componentDidMount",value:function(){var e=this;fetch("https://cinema.voloshinskii.ru/future/preview?limit=10000").then(function(e){return e.json()}).then(function(t){return e.setState({futureList:t})})}},{key:"render",value:function(){var e=this;return i.a.createElement(m.Panel,{id:this.props.id},i.a.createElement(m.PanelHeader,{left:i.a.createElement(m.HeaderButton,{onClick:this.props.go,"data-to":"home"},$===m.IOS?i.a.createElement(S.a,null):i.a.createElement(P.a,null))},"\u0421\u043a\u043e\u0440\u043e \u0432 \u043a\u0438\u043d\u043e"),i.a.createElement(m.Search,{value:this.state.search,onChange:this.onChange}),this.state.futureList.length>0&&i.a.createElement(m.List,null,this.searchRes().map(function(t){return i.a.createElement(m.Cell,{"data-fid":t.tmdbId,key:t.tmdbId,onClick:e.props.openFilm},t.title)})))}}]),t}(i.a.Component),Y=Object(m.platform)(),Z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={search:"",activeList:[]},a.onChange=a.onChange.bind(Object(z.a)(Object(z.a)(a))),a.searchRes=a.searchRes.bind(Object(z.a)(Object(z.a)(a))),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"onChange",value:function(e){this.setState({search:e})}},{key:"searchRes",value:function(){var e=this.state.search.toLowerCase();return this.state.activeList.filter(function(t){return t.title.toLowerCase().indexOf(e)>-1})}},{key:"componentDidMount",value:function(){var e=this;fetch("https://cinema.voloshinskii.ru/active/preview?limit=10000").then(function(e){return e.json()}).then(function(t){return e.setState({activeList:t})})}},{key:"render",value:function(){var e=this;return i.a.createElement(m.Panel,{id:this.props.id},i.a.createElement(m.PanelHeader,{left:i.a.createElement(m.HeaderButton,{onClick:this.props.go,"data-to":"home"},Y===m.IOS?i.a.createElement(S.a,null):i.a.createElement(P.a,null))},"\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u043a\u0438\u043d\u043e"),i.a.createElement(m.Search,{value:this.state.search,onChange:this.onChange}),this.state.activeList.length>0&&i.a.createElement(m.List,null,this.searchRes().map(function(t){return i.a.createElement(m.Cell,{"data-fid":t.tmdbId,key:t.tmdbId,onClick:e.props.openFilm},t.title)})))}}]),t}(i.a.Component),ee=(Object(m.platform)(),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={list:[],loaded:!1},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://cinema.voloshinskii.ru/user/getwishlist?token=".concat(this.props.token)).then(function(e){return e.json()}).then(function(t){return e.setState({list:t.user&&t.user.films,loaded:!0})})}},{key:"render",value:function(){var e=this;return i.a.createElement(m.Panel,{theme:"white",id:this.props.id},i.a.createElement(m.PanelHeader,null,"\u041c\u043e\u0439 \u0441\u043f\u0438\u0441\u043e\u043a"),!this.state.loaded&&i.a.createElement(m.Spinner,{size:"large",style:{marginTop:30}}),this.state.loaded&&0==this.state.list.length&&i.a.createElement(W,null,"\u0412 \u0412\u0430\u0448\u0435\u043c \u0441\u043f\u0438\u0441\u043a\u0435 \u043f\u043e\u043a\u0430 \u0447\u0442\u043e \u043d\u0435\u0442 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u0444\u0438\u043b\u044c\u043c\u0430"),this.state.list&&this.state.list.length>0&&i.a.createElement("div",{style:{paddingTop:"35px"}},this.state.list.map(function(t){return i.a.createElement(R,{datafid:t.tmdbId,"data-fid":t.tmdbId,onClick:e.props.openFilm,key:t._id,title:t.title,image:t.image})})))}}]),t}(i.a.Component)),te=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).go=function(e){a.setState({activePanel:e.currentTarget.dataset.to})},a.onStoryChange=function(e){a.setState({activePanel:e.currentTarget.dataset.story})},a.updateToken=function(e){console.log(e)},a.openFilm=function(e){a.setState({activePanel:"film",filmid:e.currentTarget.dataset.fid}),fetch("https://cinema.voloshinskii.ru/film/gettmdb/".concat(e.currentTarget.dataset.fid,"?id=").concat(a.state.user.id)).then(function(e){return e.json()}).then(function(e){return a.setState({currentFilm:e})})},a.state={activePanel:"home",activePreview:null,futurePreview:null,currentFilm:null,authToken:null,tokenWithScope:null,loaded:!1},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;s.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppGetUserInfoResult":e.setState({user:t.detail.data});break;case"VKWebAppAccessTokenReceived":e.setState({authToken:t.detail.data.access_token,tokenWithScope:t.detail.data});break;case"VKWebAppAccessTokenFailed":s.a.send("VKWebAppGetAuthToken",{app_id:6977050});break;default:console.log(t.detail.type)}var a=window.location.href.split("#");a[1]&&!1===e.state.loaded&&(fetch("https://cinema.voloshinskii.ru/film/gettmdb/".concat(a[1])).then(function(e){return e.json()}).then(function(t){return e.setState({currentFilm:t})}),e.setState({loaded:!0,activePanel:"film",filmid:a[1]}),s.a.send("VKWebAppSetLocation",{location:"hash"}))}),s.a.send("VKWebAppGetUserInfo",{}),s.a.send("VKWebAppGetAuthToken",{app_id:6977050,scope:"friends"}),fetch("https://cinema.voloshinskii.ru/active/preview").then(function(e){return e.json()}).then(function(t){return e.setState({activePreview:t})}),fetch("https://cinema.voloshinskii.ru/future/preview").then(function(e){return e.json()}).then(function(t){return e.setState({futurePreview:t})})}},{key:"render",value:function(){return i.a.createElement(m.Epic,{activeStory:this.state.activePanel,tabbar:["home","featured"].includes(this.state.activePanel)&&i.a.createElement(m.Tabbar,null,i.a.createElement(m.TabbarItem,{onClick:this.onStoryChange,selected:"home"===this.state.activePanel,"data-story":"home",text:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"},i.a.createElement(v.a,null)),i.a.createElement(m.TabbarItem,{onClick:this.onStoryChange,selected:"featured"===this.state.activePanel,"data-story":"featured",text:"\u0421\u043f\u0438\u0441\u043e\u043a"},i.a.createElement(b.a,null)))},i.a.createElement(m.View,{id:"featured",activePanel:"featured"},i.a.createElement(ee,{openFilm:this.openFilm,token:this.state.authToken,id:"featured",go:this.go})),i.a.createElement(m.View,{id:this.state.activePanel,activePanel:this.state.activePanel},i.a.createElement(C,{id:"home",activePreview:this.state.activePreview,futurePreview:this.state.futurePreview,go:this.go,openFilm:this.openFilm,setid:this.setid}),i.a.createElement(J,{authToken:this.state.authToken,currentFilm:this.state.currentFilm,id:"film",go:this.go}),i.a.createElement(X,{id:"future",go:this.go,openFilm:this.openFilm}),i.a.createElement(Z,{id:"active",go:this.go,openFilm:this.openFilm}),i.a.createElement(L,{openFilm:this.openFilm,token:this.state.tokenWithScope,updateToken:this.updateToken,id:"popular",go:this.go})))}}]),t}(i.a.Component);s.a.send("VKWebAppInit",{}),l.a.render(i.a.createElement(te,null),document.getElementById("root"))},67:function(e,t,a){e.exports=a.p+"static/media/banner-1.be3b55c6.png"},71:function(e,t,a){e.exports=a(121)}},[[71,1,2]]]);
//# sourceMappingURL=main.c7f60454.chunk.js.map