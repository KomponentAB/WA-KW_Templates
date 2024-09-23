/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { Subscription } from "rxjs";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.area.onLeave('clock').subscribe(closePopup);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
    WA.onInit().then(() => {
    WA.room.area.onEnter('inside').subscribe(() => {
        WA.room.hideLayer('hide/inside');
        WA.room.showLayer('hide/outside');
    });

    WA.room.area.onEnter('outside').subscribe(() => {
        WA.room.hideLayer('hide/outside');
        WA.room.showLayer('hide/inside');
    });
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
WA.onInit()
  .then(() => {
    const startIceSkating = () => {
      let isMoving = false;
      return WA.player.onPlayerMove(async ({ moving }) => {
        if (!moving || isMoving) return;
        isMoving = true;
        WA.controls.disablePlayerControls();
        
        // Define the ice area coordinate ranges
        const minX = 1200;
        const maxX = 1800;
        const minY = 800;
        const maxY = 1200;

        // Generate random coordinates within the ice area
        const randomX = Math.random() * (maxX - minX) + minX;
        const randomY = Math.random() * (maxY - minY) + minY;

        console.log(`Moving to random position: x=${randomX}, y=${randomY}`);
        
        WA.player.moveTo(randomX, randomY, 30).then(({ }) => {
          WA.controls.restorePlayerControls();
          isMoving = false;
        });
      });
    };


    let skatingSub: Subscription;

    WA.room.area.onEnter("ice").subscribe(() => {
      console.log("enter");
      skatingSub = startIceSkating();
    });

    WA.room.area.onLeave("ice").subscribe(() => {
      console.log("leave");
      skatingSub.unsubscribe();
    });
  })
  .catch((e) => console.error(e));
export {};