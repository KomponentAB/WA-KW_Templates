import{b as d}from"./init-ad207eca.js";console.log("Script started successfully");let r;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("clock").subscribe(()=>{const o=new Date,e=o.getHours()+":"+o.getMinutes();r=WA.ui.openPopup("clockPopup","It's "+e,[])}),WA.room.area.onLeave("clock").subscribe(m),d().then(()=>{console.log("Scripting API Extra ready")}).catch(o=>console.error(o)),WA.onInit().then(()=>{WA.room.area.onEnter("inside").subscribe(()=>{WA.room.hideLayer("hide/inside"),WA.room.showLayer("hide/outside")}),WA.room.area.onEnter("outside").subscribe(()=>{WA.room.hideLayer("hide/outside"),WA.room.showLayer("hide/inside")})}).catch(o=>console.error(o))}).catch(o=>console.error(o));function m(){r!==void 0&&(r.close(),r=void 0)}WA.onInit().then(()=>{const o=()=>{let n=!1;return WA.player.onPlayerMove(async({moving:i})=>{if(!i||n)return;n=!0,WA.controls.disablePlayerControls();const t=1200,l=1800,s=800,u=1200,a=Math.random()*(l-t)+t,c=Math.random()*(u-s)+s;console.log(`Moving to random position: x=${a}, y=${c}`),WA.player.moveTo(a,c,30).then(({})=>{WA.controls.restorePlayerControls(),n=!1})})};let e;WA.room.area.onEnter("ice").subscribe(()=>{console.log("enter"),e=o()}),WA.room.area.onLeave("ice").subscribe(()=>{console.log("leave"),e.unsubscribe()})}).catch(o=>console.error(o));
//# sourceMappingURL=winterevent-main-4d64b280.js.map