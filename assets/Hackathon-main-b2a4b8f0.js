import{b as A}from"./init-1e608982.js";WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),A().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(e=>console.error(e));console.log("Script started successfully");WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("clock").subscribe(()=>{const n=new Date,t=n.getHours()+":"+n.getMinutes();WA.ui.openPopup("clockPopup","It's "+t,[])});let e;WA.onInit().then(()=>{WA.room.area.onEnter("needHelpPopup").subscribe,WA.room.area.onLeave("needHelp").subscribe(()=>{e.close()})})});async function i(e){var n=WA.state[e];console.log(`Text for ${e} is configured as `+n);var t=e.split("-")[0],s=`https://iw6tkif7th7yp5ax2ufzkl3kce0bcuys.lambda-url.us-east-1.on.aws/?text=${encodeURIComponent(n)}&imageType=caption&width=78&height=50&color=${t}`;console.log("New img-url of title is "+s);const o=await WA.room.website.get(e.replace("text","display"));o.url=s,o.visible=!0,console.log(`Title for ${e} has been changed to ${o.url}`)}WA.onInit().then(()=>{i("purple-text"),i("blue-text"),i("red-text"),i("green-text"),i("yellow-text"),i("orange-text"),i("black-text")});["purple-text","blue-text","red-text","green-text","yellow-text","orange-text","black-text"].forEach(e=>{WA.state.onVariableChange(e).subscribe(()=>{console.log(`${e} variable changed`),i(e)})});WA.onInit().then(()=>{console.log("Initializing grouping..."),p();function e(){WA.state.codingStyle==="random"&&Number(WA.state.grouping)===1&&n()}function n(){["Blue","Green","Orange","Red","Yellow","Purple"].forEach(o=>{const a=Math.floor(1e3+Math.random()*9e3).toString();WA.state[`code${o}`]=a,console.log(`Generated code for ${o}: ${a}`)})}WA.state.onVariableChange("codingStyle").subscribe(()=>{console.log("Coding style variable changed"),e()}),WA.state.onVariableChange("grouping").subscribe(()=>{WA.state.codingStyle==="random"&&Number(WA.state.grouping)===1&&n()});async function t(){if(["admin","editor","moderator","hackmod"].some(o=>WA.player.tags.includes(o))){const o=Math.floor(Math.random()*2001)+1e3;await new Promise(l=>setTimeout(l,o));const a=Date.now(),c=Number(WA.state.lastPWEdit);a>c+500?(WA.state.lastPWEdit=a,["Blue","Green","Orange","Red","Yellow","Purple"].forEach(r=>{const g=Math.floor(1e3+Math.random()*9e3).toString();WA.state[`code${r}`]=g,console.log(`Generated code for ${r}: ${g}`)})):await new Promise(l=>{const r=WA.state.onVariableChange("lastPWEdit").subscribe(()=>{r.unsubscribe(),l(void 0)})})}else await new Promise(a=>setTimeout(a,3e3)),["Blue","Green","Orange","Red","Yellow","Purple"].forEach(a=>{const c=WA.state[`code${a}`];console.log(`Code for ${a}: ${c}`)})}WA.state.onVariableChange("codingStyle").subscribe(()=>{console.log("Coding style variable changed"),e()}),WA.state.onVariableChange("grouping").subscribe(()=>{WA.state.codingStyle==="random"&&Number(WA.state.grouping)===1&&t()}),WA.state.onVariableChange("grouping").subscribe(()=>{console.log("Grouping variable changed"),p()})}).catch(e=>console.error("Error during WA.onInit:",e));async function p(){try{const e=Number(WA.state.grouping);console.log("Current grouping state:",e),v(e)}catch(e){console.error("Error in updateGrouping:",e)}}const f={Yellow:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23FFD43B" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',Orange:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff6600" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',Green:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%2339fa14" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',Blue:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%230078ff" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',Purple:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff1493" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>',Red:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23ff1a1a" d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>'},W={Yellow:{x:1260,y:1370},Orange:{x:1260,y:1800},Green:{x:1260,y:900},Blue:{x:500,y:1330},Purple:{x:500,y:1760},Red:{x:500,y:900},Auditorium:{x:600,y:1550}};function w(e){WA.ui.actionBar.addButton({id:"roomNavigate-btn",type:"action",imageSrc:f[e],toolTip:"Go to your Breakout-Room.",callback:()=>{m();const n=W[e];WA.player.moveTo(n.x,n.y,10).then(t=>{if(!t.cancelled){const s=`code${e}`,o=WA.state[s];WA.ui.banner.openBanner({id:"room-code",text:`🔐 🚪 The Code to the ${e} is: ${o}.`,bgColor:"#25222d",textColor:"#ffffff",closable:!0,timeToClose:1e5})}})}})}function m(){WA.ui.actionBar.removeButton("roomNavigate-btn")}async function v(e){const n=[{name:"Blue",color:{r:0,g:120,b:255}},{name:"Green",color:{r:57,g:255,b:20}},{name:"Orange",color:{r:255,g:102,b:0}},{name:"Red",color:{r:255,g:26,b:26}},{name:"Yellow",color:{r:255,g:255,b:0}},{name:"Purple",color:{r:255,g:20,b:147}}];if(e===1){const t=n[Math.floor(Math.random()*n.length)];console.log("Selected group:",t.name),WA.player.setOutlineColor(t.color.r,t.color.g,t.color.b);const o=`${{Yellow:"🟨",Orange:"🟧",Green:"🟩",Blue:"🟦",Purple:"🟪",Red:"🟥"}[t.name]} ${WA.state[`${t.name.toLowerCase()}-text`]||`${t.name} Room`}`,a={"en-US":`You're in the ${o} Group.`,"fr-FR":`Vous êtes dans le groupe ${o}.`,"it-IT":`Sei nel gruppo ${o}.`,"pt-BR":`Você está no grupo ${o}.`,"es-ES":`Estás en el grupo ${o}.`,"zh-CN":`你在${o}组。`,"ar-SA":`أنت في مجموعة ${o}.`,"de-DE":`Du bist in der Gruppe ${o}.`},c=WA.player.language,l=a[c]||a["en-US"];WA.ui.banner.openBanner({id:"group-assignment",text:l,bgColor:`rgb(${t.color.r}, ${t.color.g}, ${t.color.b})`,textColor:"#000000",closable:!0,timeToClose:1e4}),w(t.name),await new Promise(b=>setTimeout(b,3e3));const r=WA.state[`code${t.name}`],g={"en-US":`You have been assigned to the ${o}. The fastest way to get there is by clicking on the colored button at the bottom of your screen. The password code for the room is: ${r}.`,"fr-FR":`Vous avez été assigné au ${o}. Le moyen le plus rapide de vous y rendre est de cliquer sur le bouton coloré en bas de votre écran. Le code de la salle est : ${r}.`,"it-IT":`Sei stato assegnato al ${o}. Il modo più veloce per arrivarci è cliccare sul pulsante colorato in fondo allo schermo. Il codice della stanza è: ${r}.`,"pt-BR":`Você foi designado para o ${o}. A maneira mais rápida de chegar lá é clicando no botão colorido na parte inferior da sua tela. O código da sala é: ${r}.`,"es-ES":`Has sido asignado al ${o}. La forma más rápida de llegar es haciendo clic en el botón de color en la parte inferior de tu pantalla. El código de la sala es: ${r}.`,"zh-CN":`你已被分配到${o}。最快的方法是点击屏幕底部的彩色按钮。房间密码是：${r}。`,"ar-SA":`لقد تم تعيينك إلى ${o}. أسرع طريقة للوصول إلى هناك هي النقر على الزر الملون في أسفل الشاشة. رمز الغرفة هو: ${r}.`,"de-DE":`Du wurdest dem ${o} zugewiesen. Der schnellste Weg dorthin ist, auf den farbigen Knopf unten auf deinem Bildschirm zu klicken. Der Raumcode lautet: ${r}.`},h=g[c]||g["en-US"];WA.chat.sendChatMessage(h,"system")}else if(e===0){await new Promise(o=>setTimeout(o,3e3)),console.log("Removing outline color"),WA.player.removeOutlineColor(),m();const t={"en-US":"Grouping has ended. Please return to the plenum.","fr-FR":"Le regroupement est terminé. Veuillez retourner au plénum.","it-IT":"Il raggruppamento è terminato. Si prega di tornare al plenum.","pt-BR":"O agrupamento terminou. Por favor, volte ao plenário.","es-ES":"El agrupamiento ha terminado. Por favor, regrese al plenario.","zh-CN":"分组已结束。请返回全体会议。","ar-SA":"انتهى التجميع. يرجى العودة إلى الجلسة العامة.","de-DE":"Die Gruppierung ist beendet. Bitte kehren Sie zum Plenum zurück."},s=t[WA.player.language]||t["en-US"];WA.chat.sendChatMessage(s,"system")}else console.warn("Unknown grouping state:",e)}function u(){const e='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="%23ff0019" d="M132.7 212.3 36.2 137.8A63.4 63.4 0 0 0 32 160a63.8 63.8 0 0 0 100.7 52.3zm40.4 62.3A63.8 63.8 0 0 0 128 256H64A64.1 64.1 0 0 0 0 320v32a32 32 0 0 0 32 32H97.9A146.6 146.6 0 0 1 173.1 274.6zM544 224a64 64 0 1 0 -64-64A64.1 64.1 0 0 0 544 224zM500.6 355.1a114.2 114.2 0 0 0 -84.5-65.3L361 247.2c41.5-16.3 71-55.9 71-103.2A111.9 111.9 0 0 0 320 32c-57.1 0-103.7 42.8-110.6 98.1L45.5 3.4A16 16 0 0 0 23 6.2L3.4 31.5A16 16 0 0 0 6.2 53.9L594.5 508.6A16 16 0 0 0 617 505.8l19.6-25.3a16 16 0 0 0 -2.8-22.5zM128 403.2V432a48 48 0 0 0 48 48H464a47.5 47.5 0 0 0 12.6-1.9L232 289.1C173.7 294.8 128 343.4 128 403.2zM576 256H512a63.8 63.8 0 0 0 -45.1 18.6A146.3 146.3 0 0 1 542 384h66a32 32 0 0 0 32-32V320A64.1 64.1 0 0 0 576 256z"/></svg>';WA.ui.actionBar.removeButton("startGrouping-btn"),WA.ui.actionBar.addButton({id:"endGrouping-btn",type:"action",imageSrc:e,toolTip:"End Breakout Grouping",callback:()=>{WA.state.grouping=0,WA.ui.actionBar.removeButton("endGrouping-btn"),d(),WA.event.broadcast("addGroupingButton","pressed")}})}function d(){const e='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="%2363E6BE" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"/></svg>';WA.ui.actionBar.removeButton("endGrouping-btn"),WA.ui.actionBar.addButton({id:"startGrouping-btn",type:"action",imageSrc:e,toolTip:"Start Breakout Grouping",callback:()=>{WA.state.grouping=1,WA.ui.actionBar.removeButton("startGrouping-btn"),u(),WA.event.broadcast("endGroupingButton","pressed")}})}WA.event.on("addGroupingButton").subscribe(e=>{["admin","editor","moderator","hackmod"].some(n=>WA.player.tags.includes(n))&&e.data==="pressed"&&(WA.ui.actionBar.removeButton("startGrouping-btn"),d())});WA.event.on("endGroupingButton").subscribe(e=>{["admin","editor","moderator","hackmod"].some(n=>WA.player.tags.includes(n))&&e.data==="pressed"&&(WA.ui.actionBar.removeButton("endGrouping-btn"),u())});WA.onInit().then(()=>{if(WA.player.tags.includes("editor")){WA.state.onVariableChange("showGroupingButton").subscribe({next:()=>{const n=WA.state.showGroupingButton,t=Number(WA.state.grouping);n==="show"?t===1?u():t===0&&d():n==="hide"&&(WA.ui.actionBar.removeButton("startGrouping-btn"),WA.ui.actionBar.removeButton("endGrouping-btn"))}});const e=Number(WA.state.grouping);e===1?u():e===0&&d()}});WA.onInit().then(()=>{const e=()=>{const n=WA.state.lockAll;n==="locked"?(WA.room.hideLayer("above_opened"),WA.room.hideLayer("rooms_opened"),WA.room.showLayer("rooms_closed")):n==="open"&&(WA.room.showLayer("above_opened"),WA.room.showLayer("rooms_opened"),WA.room.hideLayer("rooms_closed"))};e(),WA.state.onVariableChange("lockAll").subscribe(()=>{e()})});
//# sourceMappingURL=Hackathon-main-b2a4b8f0.js.map