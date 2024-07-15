/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

type FloorName = 'top' | 'middle' | 'bottom';
const LAYERS = {
    'top': [
        'top/fg-lights',
        'top/fg-anim',
        'top/fg',
        'top/bg-anim',
        'top/bg',
        'collisions/top'
    ],
    'middle': [
        'middle/fg',
        'middle/bg-anim',
        'middle/bg',
        'collisions/middle'
    ],
    'bottom': [
        'bottom/fg-anim',
        'bottom/fg',
        'bottom/bg-anim',
        'bottom/bg',
        'collisions/bottom'
    ]

}
let currentFloor: FloorName;
const FLOOR_TOP = 'top'
const FLOOR_MIDDLE = 'middle'
const FLOOR_BOTTOM = 'bottom'

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);

    // Player is at the top floor by default
    currentFloor = FLOOR_TOP
    showTopFloor()

    // Event listeners for stairs
    // From bottom to middle
    WA.room.area.onEnter('stairBottomToMiddle').subscribe(() => {
        transitionToFloor(FLOOR_BOTTOM, FLOOR_MIDDLE)
    });

    // From middle to bottom
    WA.room.area.onEnter('stairMiddleToBottom').subscribe(() => {
        transitionToFloor(FLOOR_MIDDLE, FLOOR_BOTTOM)
    });

    // From middle to top
    WA.room.area.onEnter('stairMiddleToTopLeft').subscribe(() => {
        transitionToFloor(FLOOR_MIDDLE, FLOOR_TOP)
    });
    WA.room.area.onEnter('stairMiddleToTopRight').subscribe(() => {
        transitionToFloor(FLOOR_MIDDLE, FLOOR_TOP)
    });

    // From top to middle
    WA.room.area.onEnter('stairTopToMiddleLeft').subscribe(() => {
        transitionToFloor(FLOOR_TOP, FLOOR_MIDDLE)
    });
    WA.room.area.onEnter('stairTopToMiddleRight').subscribe(() => {
        transitionToFloor(FLOOR_TOP, FLOOR_MIDDLE)
    });
}).catch(e => console.error(e));

function transitionToFloor(fromFloor: FloorName, toFloor: FloorName): void {
    if (currentFloor === fromFloor) {
        // Hide layers of the current floor
        LAYERS[fromFloor].forEach(layer => {
            WA.room.hideLayer(layer);
        });

        // Show layers of the new floor
        LAYERS[toFloor].forEach(layer => {
            WA.room.showLayer(layer);
        });

        // Update the current floor after 1 sec because otherwise it triggers the next room area immediatly
        setTimeout(() => {
            currentFloor = toFloor;
        }, 1000)
    }
}

function showTopFloor() {
    // Hide middle and bottom layers
    LAYERS.middle.forEach(layer => {
        WA.room.hideLayer(layer);
    });
    LAYERS.bottom.forEach(layer => {
        WA.room.hideLayer(layer);
    });

    // Show top layers
    LAYERS.top.forEach(layer => {
        WA.room.showLayer(layer);
    });
}

export {};
