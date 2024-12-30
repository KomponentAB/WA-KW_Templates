/// <reference types="@workadventure/iframe-api-typings" />
/// <reference types="vite/client" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import {ActionMessage} from "@workadventure/iframe-api-typings";
import { setupFireworks } from "./fireworks";
setupFireworks();
console.log('Script started successfully');

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

// Get an existing website object where 'my_website' is the name of the object (on any layer object of the map)
async function updateTitle() {
    var text: string = WA.state.textVariable as string;
    console.log('Text is configured as ' + text);
    var color: string = WA.state.colorVariable as string;
    console.log('Color is configured as ' + color);
    var newTitle = `https://iw6tkif7th7yp5ax2ufzkl3kce0bcuys.lambda-url.us-east-1.on.aws/?text=${encodeURIComponent(text)}&imageType=caption&width=88&height=24&color=${encodeURIComponent(color)}`;
    console.log('New img-url of title is ' + newTitle);
    const website = await WA.room.website.get("titleScreen");
    website.url = newTitle;
    website.visible = true;
    console.log(`Title has been changed to ${website.url}`);
};
WA.onInit().then(() => { updateTitle(); });

// Listen for changes to the textVariable
WA.state.onVariableChange('textVariable').subscribe(() => {
    console.log(`Text variable changed`);
    updateTitle();
});

// Listen for changes to the colorVariable
WA.state.onVariableChange('colorVariable').subscribe(() => {
    console.log(`Color variable changed`);
    updateTitle();
});
WA.onInit().then(() => {
WA.room.area.onEnter('hideRoofZone').subscribe(() => {
    WA.room.hideLayer('above-roof/above-roof1')
    WA.room.hideLayer('above-roof/above-roof2')
    WA.room.hideLayer('above-roof/above-roof3');
})
WA.room.area.onLeave('hideRoofZone').subscribe(() => {
    WA.room.showLayer('above-roof/above-roof1')
    WA.room.showLayer('above-roof/above-roof2')
    WA.room.showLayer('above-roof/above-roof3');
})})

//alternative way to hide the roof

WA.onInit().then(() => {
    WA.room.onEnterLayer('hideRoof').subscribe(() => {
        WA.room.hideLayer('above-roof/above-roof1')
        WA.room.hideLayer('above-roof/above-roof2')
        WA.room.hideLayer('above-roof/above-roof3');
    })
    WA.room.onLeaveLayer('hideRoof').subscribe(() => {
        WA.room.showLayer('above-roof/above-roof1')
        WA.room.showLayer('above-roof/above-roof2')
        WA.room.showLayer('above-roof/above-roof3');
    })})
    
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

  
// Waiting for the API to be ready
WA.onInit().then(() => {
    let actionMessage: ActionMessage | undefined;
    let name: string;

    // When someone enters the bellZone area
    WA.room.area.onEnter("bellZone").subscribe(() => {
        name = WA.player.name;
        // Display the action message
        actionMessage = WA.ui.displayActionMessage({
            type: "message",
            message: "Press SPACE to ring the bell",
            callback: () => {
                // When space is pressed, we send a "bell-rang" signal to everyone on the map.
                WA.event.broadcast("bell-rang", `${name}` );
            }
        });
    });

    // When someone leaves the bellZone area
    WA.room.area.onLeave("bellZone").subscribe(() => {
        if (actionMessage !== undefined) {
            // Hide the action message
            actionMessage.remove();
            actionMessage = undefined;
        }
    });

    
        


WA.onInit().then(() => {
    const bellSound = WA.sound.loadSound("./error2.wav");
    WA.event.on("bell-rang").subscribe(async (eventData: { data?: unknown; senderId?: number; name: string }) => {
        bellSound.play({});
        WA.ui.banner.openBanner({
            id: "bellNotification",
            text: `${eventData.data} has rang the bell!`,
            bgColor: "#ffcc00",
            textColor: "#000000",
            closable: true,

        });
    });
});

}).catch(e => console.error(e));

export {};
