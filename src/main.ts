/// <reference types="@workadventure/iframe-api-typings" />


import { bootstrapExtra } from "@workadventure/scripting-api-extra";

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

console.log('plain main script loaded');
WA.onInit().then(() => {
    WA.state.onVariableChange('infoText').subscribe(() => {
        const infoText = WA.state.infoText;
        if (infoText !== 'empty') {
            WA.chat.sendChatMessage(infoText as string, 'Workadventure-Helper');
        }
    });
}).catch(e => console.error(e));
export {};
