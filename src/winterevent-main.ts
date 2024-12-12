/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra,Properties } from "@workadventure/scripting-api-extra";
import { Subscription } from "rxjs";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";

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

  WA.onInit().then(() => {
    console.log('WA.onInit called');
    WA.room.getTiledMap().then(map => {
        console.log('Tiled map retrieved');
        const mapProperties = new Properties(map.properties);
        const collisionLayerName = mapProperties.getString('collisionLayerName') || 'collisions';

        const collisionLayer = map.layers.find(layer => layer.name === collisionLayerName);
        if (collisionLayer && collisionLayer.type === 'tilelayer') {
            const tiles = collisionLayer.data;
            const width = collisionLayer.width;
            const height = collisionLayer.height;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const tileIndex = y * width + x;
                    if (tiles[tileIndex] !== 0) { // Assuming 0 means no tile
                        console.log(`Tile at (${x}, ${y})`);
                    }
                }
            }
        } else {
            console.error('Collision layer not found or is not a tile layer');
        }
    }).catch(e => console.error('Error retrieving tiled map:', e));
}).catch(e => console.error('Error during WA.onInit:', e));

async function populateGifts() {
    const map = await WA.room.getTiledMap();
    console.log("Room Height: ", map.height);
    console.log("Room Width: ", map.width);

    const mapProperties = new Properties(map.properties);
    const collisionLayerName = mapProperties.getString('collisionLayerName') || 'collisions';
    const collisionLayer = map.layers.find(layer => layer.name === collisionLayerName);

    if (!collisionLayer || collisionLayer.type !== 'tilelayer') {
        console.error('Collision layer not found or is not a tile layer');
        return;
    }

    const tiles = collisionLayer.data;
    const width = collisionLayer.width;
    const height = collisionLayer.height;

    const potentialGiftTiles = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tileIndex = y * width + x;
            if (tiles[tileIndex] === 0) { // Assuming 0 means no collision
                potentialGiftTiles.push({ x, y });
            }
        }
    }

    const giftOptions = 8;
    const giftsToPlace = 10; // Number of gifts to place
    const placedGifts: { x: number, y: number, tile: string, layer: string }[] = [];

    for (let i = 0; i < giftsToPlace; i++) {
        const randomIndex = Math.floor(Math.random() * potentialGiftTiles.length);
        const { x, y } = potentialGiftTiles.splice(randomIndex, 1)[0];
        const giftTile = `gift_${Math.floor(Math.random() * giftOptions) + 1}`;
        placedGifts.push({ x, y, tile: giftTile, layer: "gifts" });
    }

    WA.room.setTiles(placedGifts);
    console.log('Gifts placed:', placedGifts);

    WA.room.onEnterLayer("gifts").subscribe(async () => {
        console.log('Player entered gifts layer');
        const { x, y } = await WA.player.getPosition();
        console.log('Player position in pixels:', { x, y });
        const tileX = Math.floor(x / 32);
        const tileY = Math.floor(y / 32);
        console.log('Player position in tiles:', { tileX, tileY });

        const giftIndex = placedGifts.findIndex(gift => gift.x === tileX && gift.y === tileY);
        if (giftIndex !== -1) {
            console.log('Gift found at player position');
            WA.chat.sendChatMessage("You found a gift!", "Game");
            WA.room.setTiles([{ x: tileX, y: tileY, tile: null, layer: "gifts" }]);
            placedGifts.splice(giftIndex, 1);
        } else {
            console.log('No gift at player position');
        }
    });
}

populateGifts().catch(e => console.error('Error populating gifts:', e));


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