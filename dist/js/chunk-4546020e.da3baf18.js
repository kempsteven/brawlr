(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4546020e"],{"1bd2":function(e,t,n){e.exports=n.p+"media/bg-video.21eb4f4f.mp4"},7429:function(e,t,n){"use strict";var r=n("ccd3"),o=n.n(r);o.a},7958:function(e,t,n){e.exports=n.p+"img/brawlr-logo.ad95e203.png"},"839d":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login"},[e.isMobileData?e._e():r("div",{directives:[{name:"show",rawName:"v-show",value:e.videoBuffered,expression:"videoBuffered"}],staticClass:"video-container"},[r("video",{key:"1",ref:"video",staticClass:"video",attrs:{loop:"",muted:"",playsinline:"",oncontextmenu:"return false;"},domProps:{muted:!0},on:{canplaythrough:function(t){return e.videoHasBuffered()}}},[r("source",{attrs:{src:n("ceb9"),type:"video/webm"}}),r("source",{attrs:{src:n("1bd2"),type:"video/mp4"}})])]),r("div",{staticClass:"bg-img"}),r("section",{staticClass:"login-form"},[r("div",{staticClass:"logo-container"},[r("img",{attrs:{src:n("7958")}}),r("span",{staticClass:"slogan"},[e._v("\n                Match.   \n                Chat.    \n                Brawl.\n            ")])]),r("form",{staticClass:"form-container",on:{submit:function(t){return t.preventDefault(),e.login()}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"email",attrs:{type:"email",placeholder:"Email",autocomplete:"email",required:""},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"Password",autocomplete:"current-password",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("button",{staticClass:"login-btn"},[e._v("\n                Login\n            ")])])])])},o=[],a=(n("8e6e"),n("ac6a"),n("456d"),n("96cf"),n("3b8d")),i=n("bd86"),s=n("5935");function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={data:function(){return{videoBuffered:!1,isMobileData:!1}},computed:l({},Object(s["b"])("authentication",["email","password","loading"])),beforeCreate:function(){var e=this,t=navigator.connection||navigator.mozConnection||navigator.webkitConnection;"cellular"===t.effectiveType&&(this.isMobileData=!0),console.log(1,t.effectiveType),t.addEventListener("change",(function(){console.log(1,t.effectiveType),"cellular"===t.effectiveType&&(e.isMobileData=!0)}))},methods:{login:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.loading){e.next=2;break}return e.abrupt("return");case 2:return t=new FormData,t.append("email",this.email),t.append("password",this.password),e.next=7,this.$store.dispatch("authentication/login",t);case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),videoHasBuffered:function(){this.videoBuffered=!0,this.$refs.video.play()}}},p=u,d=(n("7429"),n("2877")),f=Object(d["a"])(p,r,o,!1,null,"42cd80c2",null);t["default"]=f.exports},ccd3:function(e,t,n){},ceb9:function(e,t,n){e.exports=n.p+"media/bg-video.c8ca91c8.webm"}}]);
//# sourceMappingURL=chunk-4546020e.da3baf18.js.map