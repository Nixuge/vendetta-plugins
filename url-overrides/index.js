(function(s,t,d,R,E){"use strict";let o=R.storage.overrideArray||[],l=[];const h=function(){l.forEach(function(e){return e([...o])}),R.storage.overrideArray=o};function w(){const e={index:o.length,from:"",to:"",bypassInApp:!1,useRegex:!1};o.push(e),h()}function I(){for(let e=0;e<o.length;e++)o[e].index=e}function j(e){const n=e.index;n>-1&&(o=[...o.slice(0,n),...o.slice(n+1)],n!=o.length&&I(),h())}const v=function(){return[...o]};function L(e){return l.push(e),function(){l=l.filter(function(n){return n!==e})}}function g(e){if(!e.useRegex)return e.regexPattern=void 0,!0;try{return e.regexPattern=new RegExp(e.from),!0}catch{return e.regexPattern=void 0,!1}}const{View:V,Text:p,TouchableOpacity:O,Animated:b}=d.General,{FormSwitchRow:y}=d.Forms,{TextInput:x,StyleSheet:C}=t.ReactNative,{useState:A,useEffect:S,useRef:U}=t.React,c=C.create({view:{backgroundColor:"#08080A",borderRadius:15,margin:10,padding:10},title:{color:"#fff",textAlign:"center",fontSize:15},text:{color:"#fff",textAlign:"center",transform:"rotate(90deg)"},fromInputWrap:{height:40,margin:12,borderWidth:1,padding:10,color:"#fff",borderColor:"#222",borderRadius:7},fromInput:{color:"#fff"},toInput:{height:40,margin:12,borderWidth:1,padding:10,color:"#fff",borderColor:"#222",borderRadius:7},crossView:{position:"absolute",right:0,top:0,width:30,height:30,backgroundColor:"#111",borderTopRightRadius:10,borderBottomLeftRadius:10},cross:{color:"white",fontSize:15,textAlign:"center",lineHeight:28}});function m(e){const[n,a]=A(e.object),[r,f]=A(g(e.object)),i=U(new b.Value(0)).current;S(function(){b.timing(i,{toValue:r?0:1,duration:150,useNativeDriver:!1}).start()},[r]);const q=i.interpolate({inputRange:[0,1],outputRange:["#08080A","#ff5757"]});function J(u){e.object.from=u.nativeEvent.text,f(g(e.object))}function K(u){e.object.to=u.nativeEvent.text}function M(){a({...n,useRegex:!n.useRegex}),e.object.useRegex=!e.object.useRegex,f(g(e.object))}function Q(){a({...n,bypassInApp:!n.bypassInApp}),e.object.bypassInApp=!e.object.bypassInApp}return t.React.createElement(V,{style:c.view},t.React.createElement(O,{style:c.crossView,onPress:function(){return j(e.object)}},t.React.createElement(p,{style:c.cross},"x")),t.React.createElement(p,{style:c.title},"Override n\xB0",e.count+1),t.React.createElement(b.View,{style:[c.fromInputWrap,{backgroundColor:q}]},t.React.createElement(x,{style:c.fromInput,onChange:function(u){return J(u)},defaultValue:e.object.from})),t.React.createElement(p,{style:c.text},"->"),t.React.createElement(x,{style:c.toInput,onChange:function(u){return K(u)},defaultValue:e.object.to}),t.React.createElement(y,{label:"Bypass in-app browser",subLabel:"Enable to open the link in your default browser/in app directly",value:n.bypassInApp,onValueChange:Q}),t.React.createElement(y,{label:"Regex",subLabel:"Use Regex instead of normal string matching",value:n.useRegex,onValueChange:M}))}const{ScrollView:k}=d.General,{StyleSheet:P,Button:B}=t.ReactNative,{useState:N,useEffect:T}=t.React,W=P.create({scrollview:{marginBottom:20}});function $(){const[e,n]=N(v);return T(function(){const a=L(n);return function(){return a()}},[]),t.React.createElement(k,{style:W.scrollview},e.map(function(a,r){return t.React.createElement(m,{object:a,count:r})}),t.React.createElement(B,{title:"Add more?",onPress:w}))}const{Linking:z}=t.ReactNative,F=$,G=function(){return console.log("URL Overrides loaded.")},D=function(){console.log("URL Overrides unloaded."),H()},H=E.instead("openURL",t.url,function(e,n){let a;try{a=e[0]}catch{return}let r=a;const f=v();for(const i of f)if(i.useRegex?r=r.replaceAll(i.regexPattern,i.to):r=r.replaceAll(i.from,i.to),r!=a){i.bypassInApp?(console.debug("Override found - skipping in-app browser while opening URL"),z.openURL(r)):(console.debug("Override found - Opening URL normally"),n(r,e[1],e[2]));return}console.debug("Opening URL normally"),n(a,e[1],e[2])});return s.onLoad=G,s.onUnload=D,s.settings=F,s})({},vendetta.metro.common,vendetta.ui.components,vendetta.plugin,vendetta.patcher);
