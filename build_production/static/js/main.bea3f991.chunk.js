(this["webpackJsonpreact-project"]=this["webpackJsonpreact-project"]||[]).push([[0],{179:function(e,t,a){},218:function(e,t,a){},424:function(e,t,a){},499:function(e,t,a){"use strict";a.r(t);var n=a(4),s=a(0),r=a(44),c=a.n(r),i=(a(179),a(33)),o=a(45),l=a(60),d=a.n(l),u=a(219),j=a(512),m=Object(s.createContext)();function b(e){var t=e.children,a=function(){var e="http://socket.xemboi.today",t="http://chat.xemboi.today";return{signin:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.post("".concat(t,"/api/user/login"),{email:e.email,password:e.password}).then((function(e){localStorage.setItem("token",e.data.token),localStorage.setItem("user",JSON.stringify(e.data.user)),"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},signup:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s={headers:{"content-type":"multipart/form-data"}};d.a.post("".concat(t,"/api/user"),e,s).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},signout:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n={headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}};d.a.post("".concat(t,"/api/user/logout"),{},n).then((function(t){"function"==typeof e&&e(t)})).catch((function(e){"function"==typeof a&&a(e)}))},sendPasswordResetEmail:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.post("".concat(t,"/api/user/reset-password"),{email:e}).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},confirmPasswordReset:function(e,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;d.a.put("".concat(t,"/api/user/reset-password/").concat(e),{password:a}).then((function(e){"function"==typeof n&&n(e)})).catch((function(e){"function"==typeof s&&s(e)}))},remove:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.delete("".concat(t,"/api/user/").concat(e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},update:function(e,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r={headers:{"content-type":"multipart/form-data",Authorization:"Bearer ".concat(localStorage.getItem("token"))}};d.a.put("".concat(t,"/api/user/").concat(e),a,r).then((function(e){"function"==typeof n&&(localStorage.setItem("user",JSON.stringify(e.data.user)),n(e))})).catch((function(e){"function"==typeof s&&s(e)}))},paginate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.get("".concat(t,"/api/user/").concat(e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},detail:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.get("".concat(t,"/api/user/").concat(e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},socket:Object(u.io)(e,{transports:["websocket"],allowUpgrades:!1,reconnect:!1,secure:!0,rejectUnauthorized:!1}),index:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.get("".concat(t,"/api/user/all/").concat(e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},chat:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;d.a.get("".concat(t,"/api/chat/").concat(e),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},createdChat:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s={headers:{"content-type":"multipart/form-data",Authorization:"Bearer ".concat(localStorage.getItem("token"))}};d.a.post("".concat(t,"/api/chat"),e,s).then((function(e){"function"==typeof a&&a(e)})).catch((function(e){"function"==typeof n&&n(e)}))},handleError:function(e,t){if(401===e.response.status)localStorage.removeItem("token"),t.replace("/login");else if(404===e.response.status)t.replace("/404");else if(500===e.response.status)t.replace("/500");else if(400===e.response.status||403===e.response.status){var a="";a=Array.isArray(e.response.data.message)?e.response.data.message[0].msg:e.response.data.message,j.a.error({message:a})}}}}();return Object(n.jsx)(m.Provider,{value:a,children:t})}var h=function(){return Object(s.useContext)(m)};var p=a(23),g=a(507),f=a(511),O=a(124),x=a(50),y=a(531),v=a(517);function w(){var e=h(),t=Object(o.g)(),a=Object(o.h)(),s=g.a.useForm(),r=Object(p.a)(s,1)[0],c=localStorage.getItem("email");c&&r.setFieldsValue({email:c});return Object(n.jsxs)(g.a,{form:r,name:"normal_login",className:"login-form",initialValues:{remember:!0},onFinish:function(n){var s=(a.state||{from:{pathname:"/"}}).from;e.signin(n,(function(e){j.a.success({message:e.data.message}),n.remember?localStorage.setItem("email",n.email):localStorage.removeItem("email"),t.replace(s)}),(function(a){e.handleError(a,t)}))},children:[Object(n.jsx)(g.a.Item,{name:"email",rules:[{required:!0,message:"Please input your email!"}],children:Object(n.jsx)(f.a,{prefix:Object(n.jsx)(y.a,{className:"site-form-item-icon"}),placeholder:"Email"})}),Object(n.jsx)(g.a.Item,{name:"password",rules:[{required:!0,message:"Please input your Password!"}],children:Object(n.jsx)(f.a.Password,{prefix:Object(n.jsx)(v.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Password"})}),Object(n.jsxs)(g.a.Item,{children:[Object(n.jsx)(g.a.Item,{name:"remember",valuePropName:"checked",noStyle:!0,children:Object(n.jsx)(O.a,{children:"Remember me"})}),Object(n.jsx)(i.b,{className:"login-form-forgot",to:"/forgot-password",children:"Forgot password"})]}),Object(n.jsxs)(g.a.Item,{children:[Object(n.jsx)(x.a,{type:"primary",htmlType:"submit",className:"login-form-button",children:"Log in"}),"Or ",Object(n.jsx)(i.b,{to:"/signup",children:"register now!"})]})]})}var I=a(32),S=a(259);function k(e){var t=e.children,a=Object(S.a)(e,["children"]),s=h(),r=localStorage.getItem("token");if(r){var c=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user"))._id:"";c&&s.socket.emit("login",c)}return Object(n.jsx)(o.b,Object(I.a)(Object(I.a)({},a),{},{render:function(e){var a=e.location;return r?t:Object(n.jsx)(o.a,{to:{pathname:"/login",state:{from:a}}})}}))}a(218),a(424);var C=a(501),P=a(98),F=a(157),E=a(513),N=a(528),_=a(527),A=a(525),R=a(524),U=a(522),Y=C.a.Header,D=C.a.Sider,L=C.a.Content;function M(e){var t=e.children,a=h(),r=Object(o.g)(),c=Object(o.h)(),l=Object(s.useState)(!1),d=Object(p.a)(l,2),u=d[0],m=d[1],b=[{key:"1",label:"Users",path:"/user",icon:Object(n.jsx)(N.a,{})},{key:"2",label:"Chat",path:"/",icon:Object(n.jsx)(_.a,{})}],g=Object(s.useState)(b.find((function(e){return c.pathname.startsWith(e.path)})).key),f=Object(p.a)(g,1)[0],O=JSON.parse(localStorage.getItem("user")),x="".concat("http://chat.xemboi.today","/images/").concat(O.avatar),y=function(){m(!u)},v=Object(n.jsxs)(P.a,{style:{width:200},theme:"light",children:[Object(n.jsx)(P.a.Item,{children:Object(n.jsx)(i.b,{to:"/user/profile/".concat(O._id),children:"Detail Profile"})},"1"),Object(n.jsx)(P.a.Divider,{}),Object(n.jsx)(P.a.Item,{onClick:function(){a.signout((function(e){j.a.success({message:e.data.message}),localStorage.removeItem("token"),localStorage.removeItem("user"),a.socket.emit("logout",O._id,(function(e){e&&r.replace("/login")}))}))},children:"Log out"},"2")]});return Object(n.jsxs)(C.a,{children:[Object(n.jsxs)(D,{trigger:null,collapsible:!0,collapsed:u,children:[Object(n.jsx)("div",{className:"logo"}),Object(n.jsx)(P.a,{theme:"dark",mode:"inline",selectedKeys:[f],onClick:function(e){var t=b.find((function(t){return t.key===e.key}));r.push(t.path)},children:b.map((function(e){return Object(n.jsx)(P.a.Item,{icon:e.icon,children:e.label},e.key)}))})]}),Object(n.jsxs)(C.a,{className:"site-layout",children:[Object(n.jsxs)(Y,{className:"site-layout-background",style:{padding:0},children:[u?Object(n.jsx)(A.a,{className:"trigger",onClick:y}):Object(n.jsx)(R.a,{className:"trigger",onClick:y}),Object(n.jsx)(F.a,{className:"dropdown-header",overlay:v,trigger:["click"],placement:"topLeft",children:Object(n.jsxs)(i.b,{to:"/#",className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()},children:[Object(n.jsx)(E.a,{src:x,style:{backgroundColor:"#87d068",cursor:"pointer"}})," ",Object(n.jsx)(U.a,{})]})})]}),Object(n.jsx)(L,{className:"site-layout-background",children:t})]})]})}var B=a(502),z=a(503),V=a(505),T=a(518),q=a(38),J=a.n(q);function H(e){var t=Object(o.g)(),a="DD-MM-YYYY",r=Object(s.useState)(""),c=Object(p.a)(r,2),i=c[0],l=c[1],d=Object(s.useState)(""),u=Object(p.a)(d,2),j=u[0],m=u[1],b=Object(s.useState)(""),h=Object(p.a)(b,2),g=h[0],O=h[1],y=Object(s.useState)(""),v=Object(p.a)(y,2),w=v[0],I=v[1],S=Object(s.useState)(""),k=Object(p.a)(S,2),C=k[0],P=k[1],F=new URLSearchParams(e.param);Object(s.useEffect)((function(){var t=new URLSearchParams(e.param);if(t.has("username")?l(t.get("username")):l(""),t.has("email")?m(t.get("email")):m(""),t.has("address")?O(t.get("address")):O(""),t.has("phone")?I(t.get("phone")):I(""),t.has("created_at")){var n=t.get("created_at");P(n?J()(t.get("created_at"),a):"")}else P("")}),[e.param]);var E=function(e,t){"name"===t&&l(e.target.value),"email"===t&&m(e.target.value),"address"===t&&O(e.target.value),"phone"===t&&I(e.target.value)},N=function(a){var n="?"+a.toString();t.push({pathname:"/user",search:n}),e.onFilterUser(n)},_=function(e,t){i.trim()&&"name"===t?F.set("username",i.trim()):F.delete("username"),j.trim()&&"email"===t?F.set("email",j.trim()):F.delete("email"),g.trim()&&"address"===t?F.set("address",g.trim()):F.delete("address"),w.trim()&&"phone"===t?F.set("phone",w.trim()):F.delete("phone"),N(F)};return Object(n.jsxs)("div",{className:"user-filter",children:[Object(n.jsxs)(B.a,{children:[Object(n.jsx)(z.a,{span:6,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(f.a,{placeholder:"Search name",value:i,onChange:function(e){E(e,"name")},onPressEnter:function(e){_(0,"name")}})}),Object(n.jsx)(z.a,{span:6,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(f.a,{placeholder:"Search email",value:j,onChange:function(e){E(e,"email")},onPressEnter:function(e){_(0,"email")}})}),Object(n.jsx)(z.a,{span:6,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(f.a,{placeholder:"Search address",value:g,onChange:function(e){E(e,"address")},onPressEnter:function(e){_(0,"address")}})}),Object(n.jsx)(z.a,{span:6,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(f.a,{placeholder:"Search phone",value:w,onChange:function(e){E(e,"phone")},onPressEnter:function(e){_(0,"phone")}})})]}),Object(n.jsx)(z.a,{span:24,style:{marginTop:"10px",marginBottom:"10px"}}),Object(n.jsxs)(B.a,{children:[Object(n.jsx)(z.a,{span:6,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(V.a,{style:{width:"100%"},format:a,value:C,onChange:function(e){P(e)}})}),Object(n.jsx)(z.a,{span:3,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(x.a,{style:{width:"100%"},type:"primary",icon:Object(n.jsx)(T.a,{}),onClick:function(){if(i.trim()&&F.set("username",i.trim()),j.trim()&&F.set("email",j.trim()),g.trim()&&F.set("address",g.trim()),w.trim()&&F.set("phone",w.trim()),C){var e=C.format(a);F.set("created_at",e)}(i.trim()||j.trim()||g.trim()||w.trim()||C)&&N(F)},children:"Search"})}),Object(n.jsx)(z.a,{span:3,style:{paddingRight:"10px",paddingLeft:"10px"},children:Object(n.jsx)(x.a,{style:{width:"100%"},onClick:function(){var e=new URLSearchParams;N(e)},children:"Clear"})})]})]})}var G=a(510),W=a(532),K=a(63),Q=a(504),X=a(506),Z=a(519),$=a(529);function ee(e){var t=Object(o.g)(),a=h(),r=Object(s.useState)([]),c=Object(p.a)(r,2),l=c[0],d=c[1],u=e.users,j=e.page,m=e.pageSize,b=e.total,g=e.loading,f=e.param,O=e.removeUser,x=e.onFilterUser,y=new URLSearchParams(f);Object(s.useEffect)((function(){a.socket.on("online",(function(e){d(e)})),a.socket.on("offline",(function(e){d(e)}))}),[a.socket]);var v=[{title:"Avatar",dataIndex:"avatar",key:"avatar",render:function(e,t){return Object(n.jsx)(E.a,{src:Object(n.jsx)(G.a,{src:"".concat("http://chat.xemboi.today","/images/").concat(t.avatar)})})},width:"5%"},{title:"Username",dataIndex:"username",key:"username",sorter:function(e,t){return e.username.localeCompare(t.username)},render:function(e,t){return Object(n.jsx)(n.Fragment,{children:Object(n.jsxs)(W.b,{children:[l.includes(t._id)?Object(n.jsx)(K.a,{placement:"topRight",title:"Online",children:Object(n.jsx)("div",{style:{width:7,height:7,background:"#25c325",borderRadius:"50%"}})}):Object(n.jsx)(K.a,{placement:"topRight",title:"Offline",children:Object(n.jsx)("div",{style:{width:7,height:7,background:"grey",borderRadius:"50%"}})}),Object(n.jsx)(i.b,{to:"user/profile/".concat(t._id),children:Object(n.jsx)(K.a,{placement:"topRight",title:"View Profile",children:e})})]})})},width:"20%"},{title:"Age",dataIndex:"age",key:"age",width:"10%",sorter:function(e,t){return e.age-t.age}},{title:"Address",dataIndex:"address",key:"address",width:"20%"},{title:"Email",key:"email",dataIndex:"email",width:"15%"},{title:"Phone",key:"phone",dataIndex:"phone",width:"10%"},{title:"Created At",key:"created_at",dataIndex:"createdAt",width:"15%",sorter:function(e,t){return J()(e.createdAt).unix()-J()(t.createdAt).unix()},render:function(e){return Object(n.jsx)(n.Fragment,{children:J()(e,"YYYY-MM-DD").format("DD-MM-YYYY")})}},{title:"Action",key:"action",width:"5%",render:function(e,t){return Object(n.jsxs)(W.b,{size:"middle",children:[Object(n.jsx)(i.b,{to:"user/".concat(t._id),children:Object(n.jsx)(K.a,{placement:"topRight",title:"Edit Profile",children:Object(n.jsx)(Z.a,{})})}),Object(n.jsx)(Q.a,{title:"Sure to delete?",onConfirm:function(e){return O(t._id)},children:Object(n.jsx)(i.b,{to:"#",children:Object(n.jsx)(K.a,{placement:"topRight",title:"Remove User",children:Object(n.jsx)($.a,{})})})})]})}}];return Object(n.jsx)(X.a,{loading:g,style:{paddingLeft:10,paddingRight:10},columns:v,dataSource:u,rowKey:function(e){return e._id},onChange:function(e){e.current===j&&e.pageSize===m||(y.set("page",e.current),y.set("page_size",e.pageSize),function(e){var a="?"+e.toString();t.push({pathname:"/user",search:a}),x(a)}(y))},pagination:{current:j,pageSize:m,total:b,showSizeChanger:!0}})}function te(){var e=h(),t=Object(o.g)(),a=Object(s.useState)(!0),r=Object(p.a)(a,2),c=r[0],i=r[1],l=Object(s.useState)([]),d=Object(p.a)(l,2),u=d[0],m=d[1],b=Object(s.useState)(0),g=Object(p.a)(b,2),f=g[0],O=g[1],x=Object(s.useState)(1),y=Object(p.a)(x,2),v=y[0],w=y[1],I=Object(s.useState)(10),S=Object(p.a)(I,2),k=S[0],C=S[1],P=Object(s.useState)(window.location.search),F=Object(p.a)(P,2),E=F[0],N=F[1],_=function(){N(window.location.search)};Object(s.useEffect)((function(){return window.addEventListener("popstate",_),function(){return window.removeEventListener("popstate",_)}}),[]),Object(s.useEffect)((function(){i(!0),e.paginate(E,(function(e){i(!1),m(e.data.users),O(e.data.total),w(e.data.page),C(e.data.page_size)}),(function(a){e.handleError(a,t)}))}),[E,e,t]);var A=function(e){N(e)};return Object(n.jsxs)(M,{children:[Object(n.jsx)(H,{onFilterUser:A,param:E}),Object(n.jsx)(ee,{loading:c,users:u,total:f,page:v,pageSize:k,param:E,removeUser:function(a){e.remove(a,(function(a){i(!0),j.a.success({message:a.data.message}),e.paginate(E,(function(e){i(!1),m(e.data.users),O(e.data.total),w(e.data.page),C(e.data.page_size)}),(function(a){e.handleError(a,t)}))}),(function(a){e.handleError(a,t)}))},onFilterUser:A})]})}var ae=a(508),ne=a(154),se=a(516),re=a(523),ce=a(521),ie=a(520);function oe(){var e=h(),t=Object(o.g)(),a=Object(o.h)(),r=g.a.useForm(),c=Object(p.a)(r,1)[0],i={onRemove:function(){c.setFieldsValue({avatar:[]})},beforeUpload:function(e){var t=new FileReader;return t.readAsDataURL(e),t.onload=function(){e.url=t.result,c.setFieldsValue({avatar:[e]})},!1},listType:"picture",maxCount:1},l={labelCol:{span:8},wrapperCol:{span:8}},d={wrapperCol:{xs:{span:8},sm:{span:8,offset:8}}};return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h1",{style:{textAlign:"center",margin:"50px 0px 20px 0px"},children:"Create your account"}),Object(n.jsxs)(g.a,Object(I.a)(Object(I.a)({},l),{},{form:c,name:"basic",onFinish:function(n){var s=(a.state||{from:{pathname:"/login"}}).from,r=n.email,c=n.password,i=n.age,o=n.phone,l=n.address,d=n.username,u=n.gender,m=n.avatar,b=n.birthday,h=n.hobbies,p=new FormData;r&&p.append("email",r),c&&p.append("password",c),i&&p.append("age",i),o&&p.append("phone",o),l&&p.append("address",l),d&&p.append("username",d),u&&p.append("gender",u),m&&p.append("avatar",m[0]),h&&h.length&&h.forEach((function(e){return p.append("hobbies[]",e)})),b instanceof J.a&&p.append("birthday",b.format()),e.signup(p,(function(e){j.a.success({message:e.data.message}),t.replace(s)}),(function(a){e.handleError(a,t)}))},children:[Object(n.jsx)(g.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your name!"},{min:8}],children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Please input your email!"}],children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(n.jsx)(f.a.Password,{})}),Object(n.jsx)(g.a.Item,{label:"Avatar",name:"avatar",valuePropName:"fileList",getValueFromEvent:function(){},children:Object(n.jsx)(ae.a,Object(I.a)(Object(I.a)({},i),{},{children:Object(n.jsx)(x.a,{icon:Object(n.jsx)(re.a,{}),children:"Upload avatar"})}))}),Object(n.jsx)(g.a.Item,{label:"Gender",name:"gender",initialValue:"other",children:Object(n.jsx)(ne.a.Group,{options:[{label:"Male",value:"male"},{label:"Female",value:"female"},{label:"Other",value:"other"}],onChange:function(e){c.setFieldsValue({gender:e.target.value})}})}),Object(n.jsx)(g.a.Item,{label:"Age",name:"age",rules:[{type:"number",min:0,max:99}],children:Object(n.jsx)(se.a,{})}),Object(n.jsx)(g.a.Item,{label:"Birthday",name:"birthday",children:Object(n.jsx)(V.a,{format:"DD-MM-YYYY"})}),Object(n.jsx)(g.a.Item,{label:"Address",name:"address",children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.Item,{label:"Phone",name:"phone",children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.List,{name:"hobbies",children:function(e,t,a){var r=t.add,c=t.remove;a.errors;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(g.a.Item,Object(I.a)(Object(I.a)({},l),{},{label:"Hobbies",children:Object(n.jsx)(x.a,{type:"dashed",onClick:function(){return r()},style:{width:"60%"},icon:Object(n.jsx)(ce.a,{}),children:"Add your hobby"})})),e.map((function(e,t){return Object(s.createElement)(g.a.Item,Object(I.a)(Object(I.a)({},d),{},{key:e.key}),Object(n.jsx)(g.a.Item,Object(I.a)(Object(I.a)({},e),{},{rules:[{max:10,message:"Your hobby max 50 characters"},{required:!0,message:"Please input your hobby!"}],noStyle:!0,children:Object(n.jsx)(f.a,{style:{width:"60%"}})})),Object(n.jsx)(ie.a,{className:"dynamic-delete-button",onClick:function(){return c(e.name)}}))}))]})}}),Object(n.jsx)(g.a.Item,Object(I.a)(Object(I.a)({},d),{},{children:Object(n.jsxs)(W.b,{children:[Object(n.jsx)(x.a,{type:"primary",htmlType:"submit",children:"Signup"}),Object(n.jsx)(x.a,{htmlType:"button",onClick:function(){c.resetFields()},children:"Reset"})]})}))]}))]})}var le=a(514),de=a(258);function ue(){var e=h(),t="http://chat.xemboi.today",a=Object(o.g)(),r=Object(s.useState)(""),c=Object(p.a)(r,2),i=c[0],l=c[1],d=Object(s.useState)(""),u=Object(p.a)(d,2),j=u[0],m=u[1],b=Object(o.i)("").id;return Object(s.useEffect)((function(){e.detail(b,(function(e){l(e.data.user),e.data.user.avatar&&m("".concat(t,"/images/").concat(e.data.user.avatar))}),(function(t){e.handleError(t,a)}))}),[e,t,b,a]),Object(n.jsx)(M,{children:Object(n.jsxs)(le.b,{title:"".concat(i.username,"'s Profile"),column:1,style:{padding:15},bordered:!0,children:[Object(n.jsx)(le.b.Item,{label:"Avatar",children:Object(n.jsx)(G.a,{width:200,src:j})}),Object(n.jsx)(le.b.Item,{label:"Username",children:i.username}),Object(n.jsx)(le.b.Item,{label:"Phone",children:i.phone}),Object(n.jsx)(le.b.Item,{label:"Adress",children:i.address}),Object(n.jsx)(le.b.Item,{label:"Email",children:i.email}),Object(n.jsx)(le.b.Item,{label:"Age",children:i.age}),Object(n.jsx)(le.b.Item,{label:"Gender",children:i.gender}),Object(n.jsx)(le.b.Item,{label:"Birthday",children:J()(i.birthday).format("DD-MM-YYYY")}),Object(n.jsx)(le.b.Item,{label:"Hobbies",children:i.hobbies&&i.hobbies.map((function(e){return Object(n.jsx)(de.a,{color:"geekblue",children:e.toUpperCase()},e)}))})]})})}function je(){var e=Object(o.i)().id,t=h(),a="http://chat.xemboi.today",r=Object(o.g)(),c=Object(s.useState)({}),i=Object(p.a)(c,2),l=i[0],d=i[1],u=Object(s.useState)(!1),m=Object(p.a)(u,2),b=m[0],O=m[1],y=g.a.useForm(),v=Object(p.a)(y,1)[0];Object(s.useEffect)((function(){t.detail(e,(function(e){d(e.data.user),v.setFieldsValue({username:e.data.user.username,email:e.data.user.email,age:e.data.user.age,birthday:e.data.user.birthday?J()(e.data.user.birthday,"DD-MM-YYYY"):void 0,hobbies:e.data.user.hobbies,phone:e.data.user.phone,address:e.data.user.address,gender:e.data.user.gender?e.data.user.gender:"other",avatar:e.data.user.avatar?[{uid:"-1",name:e.data.user.avatar,status:"done",url:"".concat(a,"/images/").concat(e.data.user.avatar)}]:[{uid:"-1",status:"done",name:"choose file to upload"}]})}))}),[t,a,e,v]),Object(s.useEffect)((function(){if(b){var a=new FormData,n=v.getFieldsValue(),s=n.email,c=n.age,i=n.phone,o=n.address,l=n.username,d=n.gender,u=n.avatar,m=n.birthday,h=n.hobbies;a.append("phone",i),a.append("address",o),a.append("username",l),a.append("email",s),a.append("gender",d),null!==c?a.append("age",c):a.append("age",""),h&&h.length&&h.forEach((function(e){return a.append("hobbies[]",e)})),m instanceof J.a&&a.append("birthday",m.format()),u?u[0]instanceof File&&a.append("avatar",u[0]):a.append("default_avatar",!0),t.update(e,a,(function(e){O(!1),j.a.success({message:e.data.message})}),(function(e){O(!1),t.handleError(e,r)}))}}),[t,r,e,b,v]);var w={onRemove:function(){v.setFieldsValue({avatar:[]})},beforeUpload:function(e){var t=new FileReader;return t.readAsDataURL(e),t.onload=function(){e.url=t.result,v.setFieldsValue({avatar:[e]})},!1},listType:"picture",maxCount:1},S={labelCol:{span:8},wrapperCol:{span:8}},k={wrapperCol:{xs:{span:8},sm:{span:8,offset:8}}};return Object(n.jsxs)(M,{children:[Object(n.jsx)("h1",{style:{textAlign:"center",margin:"15px 0px 20px 0px"},children:"Update your account"}),Object(n.jsxs)(g.a,Object(I.a)(Object(I.a)({},S),{},{form:v,name:"basic",onFinish:function(){O(!0)},children:[Object(n.jsx)(g.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your name!"}],children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Please input your email!"}],children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.Item,{label:"Avatar",name:"avatar",valuePropName:"fileList",getValueFromEvent:function(){},children:Object(n.jsx)(ae.a,Object(I.a)(Object(I.a)({},w),{},{children:Object(n.jsx)(x.a,{icon:Object(n.jsx)(re.a,{}),children:"Upload avatar"})}))}),Object(n.jsx)(g.a.Item,{label:"Gender",name:"gender",children:Object(n.jsx)(ne.a.Group,{options:[{label:"Male",value:"male"},{label:"Female",value:"female"},{label:"Other",value:"other"}],onChange:function(e){v.setFieldsValue({gender:e.target.value})}})}),Object(n.jsx)(g.a.Item,{label:"Birthday",name:"birthday",children:Object(n.jsx)(V.a,{format:"DD-MM-YYYY"})}),Object(n.jsx)(g.a.Item,{label:"Age",name:"age",rules:[{type:"number",min:0,max:99}],children:Object(n.jsx)(se.a,{})}),Object(n.jsx)(g.a.Item,{label:"Address",name:"address",children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.Item,{label:"Phone",name:"phone",children:Object(n.jsx)(f.a,{})}),Object(n.jsx)(g.a.List,{name:"hobbies",children:function(e,t,a){var r=t.add,c=t.remove;a.errors;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(g.a.Item,Object(I.a)(Object(I.a)({},S),{},{label:"Hobbies",children:Object(n.jsx)(x.a,{type:"dashed",onClick:function(){return r()},style:{width:"60%"},icon:Object(n.jsx)(ce.a,{}),children:"Add your hobby"})})),e.map((function(e,t){return Object(s.createElement)(g.a.Item,Object(I.a)(Object(I.a)({},k),{},{key:e.key}),Object(n.jsx)(g.a.Item,Object(I.a)(Object(I.a)({},e),{},{rules:[{max:10,message:"Your hobby max 50 characters"},{required:!0,message:"Please input your hobby!"}],noStyle:!0,children:Object(n.jsx)(f.a,{style:{width:"60%"}})})),Object(n.jsx)(ie.a,{className:"dynamic-delete-button",onClick:function(){return c(e.name)}}))}))]})}}),Object(n.jsx)(g.a.Item,Object(I.a)(Object(I.a)({},k),{},{children:Object(n.jsxs)(W.b,{children:[Object(n.jsx)(x.a,{type:"primary",htmlType:"submit",loading:b,children:"Update"}),Object(n.jsx)(x.a,{htmlType:"button",onClick:function(){v.setFieldsValue({username:l.username,email:l.email,age:l.age,birthday:l.birthday?J()(l.birthday,"DD-MM-YYYY"):void 0,hobbies:l.hobbies,phone:l.phone,address:l.address,gender:l.gender?l.gender:"other",avatar:l.avatar?[{uid:"-1",name:l.avatar,status:"done",url:"".concat(a,"/images/").concat(l.avatar)}]:[{uid:"-1",status:"done",name:"choose file to upload"}]})},children:"Reset"})]})}))]}))]})}var me=a(530);function be(){var e=h(),t=Object(o.g)(),a=g.a.useForm(),s=Object(p.a)(a,1)[0];return Object(n.jsxs)(g.a,{form:s,name:"normal_login",className:"login-form",onFinish:function(){var a=s.getFieldValue("email");e.sendPasswordResetEmail(a,(function(e){j.a.success({message:e.data.message}),t.replace("/login")}),(function(a){e.handleError(a,t)}))},children:[Object(n.jsxs)(g.a.Item,{children:[Object(n.jsx)("h2",{className:"text-center",children:"Forgot Password?"}),Object(n.jsx)("p",{className:"text-center",children:"You can reset your password here."})]}),Object(n.jsx)(g.a.Item,{name:"email",rules:[{required:!0,message:"Please input your email!"}],children:Object(n.jsx)(f.a,{prefix:Object(n.jsx)(me.a,{className:"site-form-item-icon"}),placeholder:"Email address"})}),Object(n.jsx)(g.a.Item,{children:Object(n.jsx)(x.a,{type:"primary",htmlType:"submit",className:"login-form-button",children:"Reset Password"})})]})}function he(){var e=h(),t=Object(o.g)(),a=g.a.useForm(),s=Object(p.a)(a,1)[0],r=Object(o.i)("").token;return Object(n.jsxs)(g.a,{form:s,name:"normal_login",className:"login-form",onFinish:function(){var a=s.getFieldValue("password");e.confirmPasswordReset(r,a,(function(e){j.a.success({message:e.data.message}),t.replace("/login")}),(function(a){e.handleError(a,t)}))},children:[Object(n.jsx)(g.a.Item,{children:Object(n.jsx)("h1",{style:{fontSize:24,fontWeight:300,letterSpacing:-.5,textAlign:"center"},children:"Change password for BinhDang"})}),Object(n.jsx)(g.a.Item,{name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(n.jsx)(f.a.Password,{prefix:Object(n.jsx)(v.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Password"})}),Object(n.jsx)(g.a.Item,{name:"password-confirm",rules:[{required:!0,message:"Please input your confirm password!"}],children:Object(n.jsx)(f.a.Password,{prefix:Object(n.jsx)(v.a,{className:"site-form-item-icon"}),type:"password",placeholder:"Confirm password"})}),Object(n.jsx)(g.a.Item,{children:Object(n.jsx)(x.a,{type:"primary",htmlType:"submit",className:"login-form-button",children:"Reset Password"})})]})}var pe=a(72),ge=a(111),fe=a(152),Oe=a(509),xe=a(526),ye=["Api: Create, update, delete, detail, pagination base on MVC model","Database mongodb: Use mongoose to save user and chat message","Authentication: JWT register, login, logout, refresh token, reset password by email","Redis: Save black list token when user logout","Validator: Use Express-validator to validate data","Upload image: Use Multer to upload avatar for user when create, update profile and send image through chat","Permission: Check permision by role, default is user, Binh is admin","SocketIO: Realtime online status when user login, realtime chat messege bettwen user and admin"],ve=["React: Use react Hook to write function component with useState, useEffect, useMemo, UseAuth","Library: Use antdesign for my project: component, icon, handle form data","Api: Use axios to get data from server","Users: Create, update, delete, detail, pagination users show online status, sorter, filter base on url: refresh page, back and next browser","Chat: User after register can only chat with admin is Binh, Binh can reply to everyone"];function we(e){var t=Oe.a.TabPane,a=e.users,r=h(),c="http://chat.xemboi.today",o=a.filter((function(e){return"admin"===e.role}))[0],l=Object(s.useState)([]),d=Object(p.a)(l,2),u=d[0],j=d[1],m=Object(s.useState)(!1),b=Object(p.a)(m,2),g=b[0],f=b[1],O=Object(s.useState)(JSON.parse(localStorage.getItem("user"))._id),x=Object(p.a)(O,1)[0],y=Object(s.useState)(o._id),v=Object(p.a)(y,1)[0];Object(s.useEffect)((function(){r.socket.on("chat",(function(e){if(g){var t=Object(ge.a)(u);"file"===e.message_type?t.push({author:"them",data:{url:"".concat(c,"/images/").concat(e.message),fileName:e.message},type:e.message_type}):t.push({author:"them",data:Object(pe.a)({},e.message_type,e.message),type:e.message_type}),j(t)}else f(!0)}))}),[r.socket,c,g,u]),Object(s.useEffect)((function(){g&&r.chat("?sender=".concat(x,"&receiver=").concat(v),(function(e){for(var t=[],a=0;a<e.data.chats.length;a++)"file"===e.data.chats[a].message_type?e.data.chats[a].sender===x?t.push({author:"me",data:{url:"".concat(c,"/images/").concat(e.data.chats[a].message),fileName:e.data.chats[a].message},type:e.data.chats[a].message_type}):t.push({author:"them",data:{url:"".concat(c,"images/").concat(e.data.chats[a].message),fileName:e.data.chats[a].message},type:e.data.chats[a].message_type}):e.data.chats[a].sender===x?t.push({author:"me",data:Object(pe.a)({},e.data.chats[a].message_type,e.data.chats[a].message),type:e.data.chats[a].message_type}):t.push({author:"them",data:Object(pe.a)({},e.data.chats[a].message_type,e.data.chats[a].message),type:e.data.chats[a].message_type});j(t)}))}),[r,c,g,x,v]);var w=function(e){if(x&&v){var t=Object(ge.a)(u);t.push(e),j(t),"text"===e.type?r.socket.emit("chat",{sender:x,receiver:v,message:e.data.text,type:"text"}):"emoji"===e.type?r.socket.emit("chat",{sender:x,receiver:v,message:e.data.emoji,type:"emoji"}):"file"===e.type&&r.socket.emit("chat",{sender:x,receiver:v,message:e.data.fileName,type:"file"})}};return Object(n.jsxs)(Oe.a,{defaultActiveKey:"1",type:"card",children:[Object(n.jsxs)(t,{tab:"Profile",children:[Object(n.jsxs)(le.b,{title:"Personality",column:1,style:{padding:15},bordered:!0,children:[Object(n.jsx)(le.b.Item,{label:"Avatar",children:Object(n.jsx)(G.a,{width:200,src:"".concat(c,"images/").concat(o.avatar)})}),Object(n.jsx)(le.b.Item,{label:"Username",children:o.username}),Object(n.jsx)(le.b.Item,{label:"Phone",children:o.phone}),Object(n.jsx)(le.b.Item,{label:"Adress",children:o.address}),Object(n.jsx)(le.b.Item,{label:"Email",children:o.email}),Object(n.jsx)(le.b.Item,{label:"Age",children:o.age}),Object(n.jsx)(le.b.Item,{label:"Gender",children:o.gender}),Object(n.jsx)(le.b.Item,{label:"Birthday",children:J()(o.birthday).format("DD-MM-YYYY")}),Object(n.jsx)(le.b.Item,{label:"Hobbies",children:o.hobbies&&o.hobbies.map((function(e){return Object(n.jsx)(de.a,{color:"geekblue",children:e.toUpperCase()},e)}))})]}),Object(n.jsx)(fe.a,{agentProfile:{teamName:"Chat to ".concat(o.username),imageUrl:"".concat(c,"images/").concat(o.avatar)},messageList:u,onMessageWasSent:w,handleClick:function(){f(!g)},isOpen:g,onFilesSelected:function(e){var t=new FormData;t.append("avatar",e[0]),t.append("sender",x),t.append("receiver",v),t.append("type","file"),r.createdChat(t,(function(e){w({author:"me",type:"file",data:{url:"".concat(c,"images/").concat(e.data.chat.message),fileName:e.data.chat.message}})}))},mute:!0})]},"1"),Object(n.jsxs)(t,{tab:"Describe Project",children:[Object(n.jsx)(xe.b,{size:"large",header:Object(n.jsx)(i.b,{to:"#",children:"Backend - Nodejs Express"}),bordered:!0,dataSource:ye,renderItem:function(e){return Object(n.jsx)(xe.b.Item,{children:e})}}),Object(n.jsx)(xe.b,{style:{marginTop:15},size:"large",header:Object(n.jsx)(i.b,{to:"#",children:"Frontend - Reactjs"}),bordered:!0,dataSource:ve,renderItem:function(e){return Object(n.jsx)(xe.b.Item,{children:e})}})]},"2")]})}function Ie(e){var t=h(),a="http://chat.xemboi.today",r=e.users,c=Object(s.useState)([]),o=Object(p.a)(c,2),l=o[0],d=o[1],u=Object(s.useState)(JSON.parse(localStorage.getItem("user"))._id),j=Object(p.a)(u,1)[0],m=Object(s.useState)(""),b=Object(p.a)(m,2),g=b[0],f=b[1],O=r.filter((function(e){return e._id===g}))[0];Object(s.useEffect)((function(){t.socket.on("chat",(function(e){if(g&&e.sender===g){var t=Object(ge.a)(l);"file"===e.message_type?t.push({author:"them",data:{url:"".concat(a,"/images/").concat(e.message),fileName:e.message},type:e.message_type}):t.push({author:"them",data:Object(pe.a)({},e.message_type,e.message),type:e.message_type}),d(t)}else f(e.sender)}))}),[t.socket,a,g,l]),Object(s.useEffect)((function(){g&&t.chat("?sender=".concat(j,"&receiver=").concat(g),(function(e){for(var t=[],n=0;n<e.data.chats.length;n++)"file"===e.data.chats[n].message_type?e.data.chats[n].sender===j?t.push({author:"me",data:{url:"".concat(a,"/images/").concat(e.data.chats[n].message),fileName:e.data.chats[n].message},type:e.data.chats[n].message_type}):t.push({author:"them",data:{url:"".concat(a,"/images/").concat(e.data.chats[n].message),fileName:e.data.chats[n].message},type:e.data.chats[n].message_type}):e.data.chats[n].sender===j?t.push({author:"me",data:Object(pe.a)({},e.data.chats[n].message_type,e.data.chats[n].message),type:e.data.chats[n].message_type}):t.push({author:"them",data:Object(pe.a)({},e.data.chats[n].message_type,e.data.chats[n].message),type:e.data.chats[n].message_type});d(t)}))}),[t,a,j,g]);var x=function(e){if(j&&g){var a=Object(ge.a)(l);a.push(e),d(a),"text"===e.type?t.socket.emit("chat",{sender:j,receiver:g,message:e.data.text,type:"text"}):"emoji"===e.type?t.socket.emit("chat",{sender:j,receiver:g,message:e.data.emoji,type:"emoji"}):"file"===e.type&&t.socket.emit("chat",{sender:j,receiver:g,message:e.data.fileName,type:"file"})}};return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(xe.b,{itemLayout:"vertical",dataSource:r.filter((function(e){return"admin"!==e.role})),style:{paddingLeft:20},renderItem:function(e){return Object(n.jsx)(xe.b.Item,{actions:[Object(n.jsx)(W.b,{onClick:function(){!function(e){g!==e._id&&f(e._id)}(e)},children:Object(n.jsxs)(i.b,{to:"/#",children:[Object(n.jsx)(_.a,{}),Object(n.jsx)("span",{style:{paddingLeft:10},children:"Reply"})]})})],children:Object(n.jsx)(xe.b.Item.Meta,{avatar:Object(n.jsx)(E.a,{src:"".concat(a,"/images/").concat(e.avatar)}),title:e.username,description:e.email})})}}),g&&Object(n.jsx)(fe.a,{agentProfile:{teamName:"Reply to ".concat(O.username),imageUrl:"".concat(a,"/images/").concat(O.avatar)},messageList:l,onMessageWasSent:x,handleClick:function(){f("")},isOpen:Boolean(g),onFilesSelected:function(e){var n=new FormData;n.append("avatar",e[0]),n.append("sender",j),n.append("receiver",g),n.append("type","file"),t.createdChat(n,(function(e){x({author:"me",type:"file",data:{url:"".concat(a,"/images/").concat(e.data.chat.message),fileName:e.data.chat.message}})}))},mute:!0})]})}var Se=a(151);function ke(){var e=Object(s.useState)([]),t=Object(p.a)(e,2),a=t[0],r=t[1],c=Object(s.useState)(JSON.parse(localStorage.getItem("user"))),i=Object(p.a)(c,1)[0],l=Object(s.useState)(!1),d=Object(p.a)(l,2),u=d[0],j=d[1],m=h(),b=Object(o.g)();return Object(s.useEffect)((function(){m.index("",(function(e){r(e.data.users),j(!0)}),(function(e){m.handleError(e,b)}))}),[m,b]),Object(n.jsxs)(M,{children:["admin"!==i.role&&u&&Object(n.jsx)(we,{users:a}),"admin"===i.role&&u&&Object(n.jsx)(Ie,{users:a}),!u&&Object(n.jsx)("div",{className:"spin",children:Object(n.jsx)(Se.a,{})})]})}var Ce=a(515);function Pe(){return Object(n.jsx)(Ce.a,{status:"404",title:"404",subTitle:"Sorry, the page you visited does not exist.",extra:Object(n.jsx)(x.a,{type:"primary",children:"Back Home"})})}function Fe(){return Object(n.jsx)(Ce.a,{status:"500",title:"500",subTitle:"Sorry, something went wrong.",extra:Object(n.jsx)(x.a,{type:"primary",children:"Back Home"})})}function Ee(){return Object(n.jsx)(b,{children:Object(n.jsx)(i.a,{children:Object(n.jsxs)(o.d,{children:[Object(n.jsx)(o.b,{exact:!0,path:"/login",children:Object(n.jsx)(w,{})}),Object(n.jsx)(o.b,{exact:!0,path:"/signup",children:Object(n.jsx)(oe,{})}),Object(n.jsx)(o.b,{exact:!0,path:"/forgot-password",children:Object(n.jsx)(be,{})}),Object(n.jsx)(o.b,{exact:!0,path:"/reset-password/:token",children:Object(n.jsx)(he,{})}),Object(n.jsx)(k,{exact:!0,path:"/",children:Object(n.jsx)(ke,{})}),Object(n.jsx)(k,{exact:!0,path:"/user",children:Object(n.jsx)(te,{})}),Object(n.jsx)(k,{exact:!0,path:"/user/profile/:id",children:Object(n.jsx)(ue,{})}),Object(n.jsx)(k,{exact:!0,path:"/user/:id",children:Object(n.jsx)(je,{})}),Object(n.jsx)(o.b,{exact:!0,path:"/404",children:Object(n.jsx)(Pe,{})}),Object(n.jsx)(o.b,{exact:!0,path:"/500",children:Object(n.jsx)(Fe,{})})]})})})}var Ne=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,533)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),s(e),r(e),c(e)}))};a(498);c.a.render(Object(n.jsx)(Ee,{}),document.getElementById("root")),Ne()}},[[499,1,2]]]);
//# sourceMappingURL=main.bea3f991.chunk.js.map