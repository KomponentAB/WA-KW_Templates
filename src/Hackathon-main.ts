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
export {};



