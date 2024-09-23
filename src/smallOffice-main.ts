/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

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

export {};
