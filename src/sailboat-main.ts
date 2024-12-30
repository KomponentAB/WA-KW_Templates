/// <reference types="@workadventure/iframe-api-typings" />
/// <reference types="vite/client" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { setupFireworks } from "./fireworks";
setupFireworks();
console.log('Script started successfully');

WA.onInit().then(() => {        WA.nav.goToRoom("#start")})

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    const stairMappings = {
        stairTopToMiddleLeft: "#entryMiddleLeft",
        stairTopToMiddleRight: "#entryMiddleRight",
        stairMiddleToTopLeft: "#entryTopLeft",
        stairMiddleToTopRight: "#entryTopRight",
        stairMiddleToBottom: "#entryBottom",
        stairBottomToMiddle: "#entryMiddleFromBottom"
    };

    Object.entries(stairMappings).forEach(([area, room]) => {
        WA.room.area.onEnter(area).subscribe(() => {
            WA.nav.goToRoom(room);
        });
    });
}).catch(e => console.error(e));

WA.onInit().then(async () => {
    WA.player.onPlayerMove(async ({ x, y, moving }) => {
      const material = await checkPlayerMaterial({ x, y });
      console.log(material);
  
      if (!material) {
        return mySound?.stop();
      }
  
      if (!moving && !material) {
        return mySound?.stop();
      } else {
        mySound?.stop();
        return playRandomSound(material);
      }
    });
  });


export {};
