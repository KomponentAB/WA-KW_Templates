class A{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const z="https://unpkg.com/@workadventure/scripting-api-extra@1.9.1/dist";class ne{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new A(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function U(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(z+"/configuration.html"+e,!0)}async function re(t,e){const n=await WA.room.getTiledMap(),r=new Map;return X(n.layers,r,t,e),r}function X(t,e,n,r){for(const s of t)if(s.type==="objectgroup"){for(const o of s.objects)if(o.type==="variable"||o.class==="variable"){if(n&&s.name!==n||r&&!r.includes(o.name))continue;e.set(o.name,new ne(o))}}else s.type==="group"&&X(s.layers,e,n,r)}let R;async function P(){return R===void 0&&(R=se()),R}async function se(){return oe(await WA.room.getTiledMap())}function oe(t){const e=new Map;return Y(t.layers,"",e),e}function Y(t,e,n){for(const r of t)r.type==="group"?Y(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function J(){const t=await P(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ie(t){let e=1/0,n=1/0,r=0,s=0;const o=t.data;if(typeof o=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let i=0;i<t.height;i++)for(let a=0;a<t.width;a++)o[a+i*t.width]!==0&&(e=Math.min(e,a),s=Math.max(s,a),n=Math.min(n,i),r=Math.max(r,i));return{top:n,left:e,right:s+1,bottom:r+1}}function Q(t){let e=1/0,n=1/0,r=0,s=0;for(const o of t){const i=ie(o);i.left<e&&(e=i.left),i.top<n&&(n=i.top),i.right>s&&(s=i.right),i.bottom>r&&(r=i.bottom)}return{top:n,left:e,right:s,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ae=Object.prototype.toString,S=Array.isArray||function(e){return ae.call(e)==="[object Array]"};function j(t){return typeof t=="function"}function ue(t){return S(t)?"array":typeof t}function x(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(t,e){return t!=null&&typeof t=="object"&&e in t}function ce(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var le=RegExp.prototype.test;function fe(t,e){return le.call(t,e)}var pe=/\S/;function ge(t){return!fe(pe,t)}var he={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function de(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return he[n]})}var ye=/\s*/,me=/\s+/,_=/\s*=/,ve=/\s*\}/,be=/#|\^|\/|>|\{|&|=|!/;function we(t,e){if(!t)return[];var n=!1,r=[],s=[],o=[],i=!1,a=!1,u="",l=0;function p(){if(i&&!a)for(;o.length;)delete s[o.pop()];else o=[];i=!1,a=!1}var d,m,T;function C(b){if(typeof b=="string"&&(b=b.split(me,2)),!S(b)||b.length!==2)throw new Error("Invalid tags: "+b);d=new RegExp(x(b[0])+"\\s*"),m=new RegExp("\\s*"+x(b[1])),T=new RegExp("\\s*"+x("}"+b[1]))}C(e||h.tags);for(var f=new M(t),v,c,y,L,k,w;!f.eos();){if(v=f.pos,y=f.scanUntil(d),y)for(var B=0,te=y.length;B<te;++B)L=y.charAt(B),ge(L)?(o.push(s.length),u+=L):(a=!0,n=!0,u+=" "),s.push(["text",L,v,v+1]),v+=1,L===`
`&&(p(),u="",l=0,n=!1);if(!f.scan(d))break;if(i=!0,c=f.scan(be)||"name",f.scan(ye),c==="="?(y=f.scanUntil(_),f.scan(_),f.scanUntil(m)):c==="{"?(y=f.scanUntil(T),f.scan(ve),f.scanUntil(m),c="&"):y=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(c==">"?k=[c,y,v,f.pos,u,l,n]:k=[c,y,v,f.pos],l++,s.push(k),c==="#"||c==="^")r.push(k);else if(c==="/"){if(w=r.pop(),!w)throw new Error('Unopened section "'+y+'" at '+v);if(w[1]!==y)throw new Error('Unclosed section "'+w[1]+'" at '+v)}else c==="name"||c==="{"||c==="&"?a=!0:c==="="&&C(y)}if(p(),w=r.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+f.pos);return We(Ae(s))}function Ae(t){for(var e=[],n,r,s=0,o=t.length;s<o;++s)n=t[s],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function We(t){for(var e=[],n=e,r=[],s,o,i=0,a=t.length;i<a;++i)switch(s=t[i],s[0]){case"#":case"^":n.push(s),r.push(s),n=s[4]=[];break;case"/":o=r.pop(),o[5]=s[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(s)}return e}function M(t){this.string=t,this.tail=t,this.pos=0}M.prototype.eos=function(){return this.tail===""};M.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};M.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function W(t,e){this.view=t,this.cache={".":this.view},this.parent=e}W.prototype.push=function(e){return new W(e,this)};W.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var s=this,o,i,a,u=!1;s;){if(e.indexOf(".")>0)for(o=s.view,i=e.split("."),a=0;o!=null&&a<i.length;)a===i.length-1&&(u=O(o,i[a])||ce(o,i[a])),o=o[i[a++]];else o=s.view[e],u=O(s.view,e);if(u){r=o;break}s=s.parent}n[e]=r}return j(r)&&(r=r.call(this.view)),r};function g(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,n){var r=this.templateCache,s=e+":"+(n||h.tags).join(":"),o=typeof r<"u",i=o?r.get(s):void 0;return i==null&&(i=we(e,n),o&&r.set(s,i)),i};g.prototype.render=function(e,n,r,s){var o=this.getConfigTags(s),i=this.parse(e,o),a=n instanceof W?n:new W(n,void 0);return this.renderTokens(i,a,r,e,s)};g.prototype.renderTokens=function(e,n,r,s,o){for(var i="",a,u,l,p=0,d=e.length;p<d;++p)l=void 0,a=e[p],u=a[0],u==="#"?l=this.renderSection(a,n,r,s,o):u==="^"?l=this.renderInverted(a,n,r,s,o):u===">"?l=this.renderPartial(a,n,r,o):u==="&"?l=this.unescapedValue(a,n):u==="name"?l=this.escapedValue(a,n,o):u==="text"&&(l=this.rawValue(a)),l!==void 0&&(i+=l);return i};g.prototype.renderSection=function(e,n,r,s,o){var i=this,a="",u=n.lookup(e[1]);function l(m){return i.render(m,n,r,o)}if(u){if(S(u))for(var p=0,d=u.length;p<d;++p)a+=this.renderTokens(e[4],n.push(u[p]),r,s,o);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")a+=this.renderTokens(e[4],n.push(u),r,s,o);else if(j(u)){if(typeof s!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(n.view,s.slice(e[3],e[5]),l),u!=null&&(a+=u)}else a+=this.renderTokens(e[4],n,r,s,o);return a}};g.prototype.renderInverted=function(e,n,r,s,o){var i=n.lookup(e[1]);if(!i||S(i)&&i.length===0)return this.renderTokens(e[4],n,r,s,o)};g.prototype.indentPartial=function(e,n,r){for(var s=n.replace(/[^ \t]/g,""),o=e.split(`
`),i=0;i<o.length;i++)o[i].length&&(i>0||!r)&&(o[i]=s+o[i]);return o.join(`
`)};g.prototype.renderPartial=function(e,n,r,s){if(r){var o=this.getConfigTags(s),i=j(r)?r(e[1]):r[e[1]];if(i!=null){var a=e[6],u=e[5],l=e[4],p=i;u==0&&l&&(p=this.indentPartial(i,l,a));var d=this.parse(p,o);return this.renderTokens(d,n,r,p,s)}}};g.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};g.prototype.escapedValue=function(e,n,r){var s=this.getConfigEscape(r)||h.escape,o=n.lookup(e[1]);if(o!=null)return typeof o=="number"&&s===h.escape?String(o):s(o)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return S(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!S(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){E.templateCache=t},get templateCache(){return E.templateCache}},E=new g;h.clearCache=function(){return E.clearCache()};h.parse=function(e,n){return E.parse(e,n)};h.render=function(e,n,r,s){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+ue(e)+'" was given as the first argument for mustache#render(template, view, partials)');return E.render(e,n,r,s)};h.escape=de;h.Scanner=M;h.Context=W;h.Writer=g;class F{constructor(e,n){this.template=e,this.state=n,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const s=h.render(this.template,this.state);s!==this.value&&(this.value=s,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const s=r[0],o=r[1],i=r[4];["name","&","#","^"].includes(s)&&n.add(o),i!==void 0&&typeof i!="string"&&this.recursiveGetUsedVariables(i,n)}}}async function Se(){var t;const e=await J();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const s of r){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const o=new F(s.value,WA.state);if(o.isPureString())continue;const i=o.getValue();await D(n.name,s.name,i),o.onChange(async a=>{await D(n.name,s.name,a)})}}}async function Ce(){var t;const e=await P();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const s=(t=r.properties)!==null&&t!==void 0?t:[];for(const o of s){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const i=new F(o.value,WA.state);if(i.isPureString())continue;const a=i.getValue();N(n,o.name,a),i.onChange(u=>{N(n,o.name,u)})}}}async function D(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function N(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}const Le="https://admin.workadventu.re/html";let V,G=0,I=0;function q(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function Ee(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const s=ee(t.properties.mustGetString("openLayer").split(`
`));if(s>n)return;r=1-s/n}e&&WA.sound.loadSound(e).play({volume:r})}function Pe(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const s=ee(t.properties.mustGetString("closeLayer").split(`
`));if(s>n)return;r=1-s/n}e&&WA.sound.loadSound(e).play({volume:r})}function Z(t){return t.map(e=>V.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ee(t){const e=Z(t),n=Q(e),r=((n.right-n.left)/2+n.left)*32,s=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(G-r,2)+Math.pow(I-s,2))}function Me(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Ee(t):Pe(t),q(t)}),q(t)}function K(t,e,n,r){const s=t.name;let o,i,a=!1;const u=n.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const p=!!u;function d(){var c;o&&o.remove(),o=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;o&&o.remove(),o=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function T(){let c;if(t.type==="tilelayer")c=Q(Z(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);c={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}i=WA.room.website.create({name:"doorKeypad"+s,url:r+"/keypad.html#"+encodeURIComponent(s),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){i&&(WA.room.website.delete(i.name),i=void 0)}function f(){if(a=!0,n.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!l||!p)&&(n.getString("code")||n.getString("codeVariable"))){T();return}l&&(WA.state[e.name]?d():m())}function v(){a=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),o&&o.remove(),C()}t.type==="tilelayer"?(WA.room.onEnterLayer(s).subscribe(f),WA.room.onLeaveLayer(s).subscribe(v)):(WA.room.area.onEnter(s).subscribe(f),WA.room.area.onLeave(s).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{a&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),i&&WA.state[e.name]===!0&&C(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Te(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const s=Math.sqrt(Math.pow(t.x-G,2)+Math.pow(t.y-I,2));if(s>n)return;r=1-s/n}WA.sound.loadSound(e).play({volume:r})}function ke(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Te(t)})}function $(t,e,n){let r;const s=e.getString("bellPopup");if(n.type==="tilelayer"){const o=n.name;WA.room.onEnterLayer(o).subscribe(()=>{var i;s?r=WA.ui.openPopup(s,"",[{label:(i=e.getString("bellButtonText"))!==null&&i!==void 0?i:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(o).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const o=n.name;WA.room.area.onEnter(o).subscribe(()=>{var i;s?r=WA.ui.openPopup(s,"",[{label:(i=e.getString("bellButtonText"))!==null&&i!==void 0?i:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(o).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function Be(t){t=t??Le;const e=await re();V=await P();for(const n of e.values())n.properties.get("door")&&Me(n),n.properties.get("bell")&&ke(n);for(const n of V.values()){const r=new A(n.properties),s=r.getString("doorVariable");if(s&&n.type==="tilelayer"){const i=e.get(s);if(i===void 0)throw new Error('Cannot find variable "'+s+'" referred in the "doorVariable" property of layer "'+n.name+'"');K(n,i,r,t)}const o=r.getString("bellVariable");o&&n.type==="tilelayer"&&$(o,r,n)}for(const n of await J()){const r=new A(n.properties),s=r.getString("doorVariable");if(s){const i=e.get(s);if(i===void 0)throw new Error('Cannot find variable "'+s+'" referred in the "doorVariable" property of object "'+n.name+'"');K(n,i,r,t)}const o=r.getString("bellVariable");o&&$(o,r,n)}WA.player.onPlayerMove(n=>{G=n.x,I=n.y})}function Re(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),s=t.get("leaveValue"),o=t.getString("triggerMessage"),i=t.getString("tag");xe(n,e,r,s,o,i)}}function xe(t,e,n,r,s,o){o&&!WA.player.tags.includes(o)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{s||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function Ve(){const t=await P();for(const e of t.values()){const n=new A(e.properties);Re(n,e.name)}}let H;async function je(t){const e=await WA.room.getTiledMap();t=t??z,H=await P();const n=e.layers.find(r=>r.name==="configuration");if(n){const s=new A(n.properties).getString("tag");(!s||WA.player.tags.includes(s))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const o of H.values()){const i=new A(o.properties),a=i.getString("openConfig");a&&o.type==="tilelayer"&&Ge(a.split(","),o.name,i)}}}function Ge(t,e,n){let r;const s=n.getString("openConfigAdminTag");let o=!0;s&&!WA.player.tags.includes(s)&&(o=!1);function i(){var u;r&&r.remove(),r=WA.ui.displayActionMessage({message:(u=n.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>U(t)})}function a(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=n.getString("openConfigTrigger");o&&(u&&u==="onaction"?i():U(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),a()})}function Ie(){return WA.onInit().then(()=>{Be().catch(t=>console.error(t)),Ve().catch(t=>console.error(t)),je().catch(t=>console.error(t)),Ce().catch(t=>console.error(t)),Se().catch(t=>console.error(t))}).catch(t=>console.error(t))}export{A as P,Ie as b,P as g};
//# sourceMappingURL=init-45730ad6.js.map