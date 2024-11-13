/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));


console.log('Script started successfully');

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        WA.ui.openPopup("clockPopup", "It's " + time, []);
    })




let helpPopup: any;
WA.onInit().then(() => {WA.room.area.onEnter('needHelpPopup').subscribe, () => {
helpPopup = WA.ui.openPopup('hopupHelp','Do you wanna know more about us? Explore our Hub!',[{
    label: 'Go to hub',
    className: 'primary',
    callback: () => WA.nav.openTab('https://world.cocreation.world')
}] )} 

WA.room.area.onLeave('needHelp').subscribe(() => {
    helpPopup.close();
})})




})

async function updateTitle(variableName: string) {
    var text: string = WA.state[variableName] as string;
    console.log(`Text for ${variableName} is configured as ` + text);
  var color = variableName.split('-')[0];
    var newTitle = `https://iw6tkif7th7yp5ax2ufzkl3kce0bcuys.lambda-url.us-east-1.on.aws/?text=${encodeURIComponent(text)}&imageType=caption&width=78&height=50&color=${(color)}`;
    console.log('New img-url of title is ' + newTitle);
    const website = await WA.room.website.get(variableName.replace('text', 'display'));
    website.url = newTitle;
    website.visible = true;
    console.log(`Title for ${variableName} has been changed to ${website.url}`);
};

WA.onInit().then(() => {
    updateTitle('purple-text');
    updateTitle('blue-text');
    updateTitle('red-text');
    updateTitle('green-text');
    updateTitle('yellow-text');
    updateTitle('orange-text');
    updateTitle('black-text');
});

// Listen for changes to each text variable
['purple-text', 'blue-text', 'red-text', 'green-text', 'yellow-text', 'orange-text', 'black-text'].forEach(variableName => {
    WA.state.onVariableChange(variableName).subscribe(() => {
        console.log(`${variableName} variable changed`);
        updateTitle(variableName);
    });
});



export {};



