/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra,Properties } from "@workadventure/scripting-api-extra";
import { Subscription } from "rxjs";
import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";
import { santaMessages } from "./santa";
import { levelUp, getLeaderboard, getLeaderboardURL } from "@workadventure/quests";
import { setupFireworks } from "./fireworks";
setupFireworks();

console.log('Script started successfully');


// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);
console.log("Properties loaded: ", Properties);
console.log ("Quests loaded: ", levelUp);
console.log ("Leaderboard loaded: ", getLeaderboard);

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

    WA.onInit().then(() => {
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
    });

      WA.event.on('pong').subscribe((value: any) => {
      const placedGifts = value.data;
      console.log('Received placed gifts:', placedGifts);
      WA.room.setTiles(placedGifts);
      WA.state.saveVariable('placedGifts', placedGifts);
      });

      WA.event.on('foundGift').subscribe(async (value: any) => {
      const { x, y } = value.data;
      console.log(`Gift found at (${x}, ${y})`);
      WA.room.setTiles([{ x, y, tile: null, layer: "gifts" }]);

      const placedGifts = (await WA.state.loadVariable('placedGifts')) as any[];
      const updatedGifts = placedGifts.filter(gift => gift.x !== x || gift.y !== y);
      WA.state.saveVariable('placedGifts', updatedGifts);
      });

      WA.room.onEnterLayer("gifts").subscribe(async () => {
        console.log('Player entered gifts layer');
        const { x, y } = await WA.player.getPosition();
        console.log('Player position in pixels:', { x, y });
        const tileX = Math.floor(x / 32);
        const tileY = Math.floor(y / 32);
      
        const placedGifts = (await WA.state.loadVariable('placedGifts')) as any[];
        const giftExists = placedGifts.some(gift => gift.x === tileX && gift.y === tileY);
      
        if (!giftExists) {
          console.log('No gift at this position');
          return;
        }
      
        const randomMessageIndex = Math.floor(Math.random() * santaMessages.length);
        const randomMessage = santaMessages.splice(randomMessageIndex, 1)[0];
        const randomSoundIndex = Math.floor(Math.random() * 4) + 1;
        const mySound = WA.sound.loadSound(`./santa-sigh-${randomSoundIndex}.mp3`);
        const config = {
          volume: 0.3,
          loop: false,
          rate: 1,
          detune: 1,
          delay: 0,
          seek: 0,
          mute: false
        };
        mySound.play(config);
        WA.event.broadcast('foundGift', { x: tileX, y: tileY });
        WA.chat.sendChatMessage(randomMessage, "Santa");
        await levelUp("GIFTS", 1);
      });

      WA.onInit().then(async () => {
      const placedGifts = (await WA.state.loadVariable('placedGifts')) as any[];
      if (placedGifts && placedGifts.length > 0) {
        WA.room.setTiles(placedGifts);
      }
      });

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

      WA.onInit().then(() => {
        if (WA.player.tags.includes('Santa')) {
          
        WA.event.on('ping').subscribe(async (value: any) => {
        if (value.data === 'start') {
          console.log('Starting gift population...');
          const placedGifts = await populateGifts();
          WA.event.broadcast('pong', placedGifts);
        }
        });
        WA.event.broadcast("ping","start");
        async function populateGifts() {
        const map = await WA.room.getTiledMap();
        console.log("Room Height: ", map.height);
        console.log("Room Width: ", map.width);

        const mapProperties = new Properties(map.properties); 
        const collisionLayerName = mapProperties.getString('collisionLayerName') || 'collisions';
        const collisionLayer = map.layers.find(layer => layer.name === collisionLayerName);

        if (!collisionLayer || collisionLayer.type !== 'tilelayer') {
          console.error('Collision layer not found or is not a tile layer');
          return [];
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
        const giftsToPlace = 100; // Number of gifts to place
        const placedGifts: { x: number, y: number, tile: string, layer: string }[] = [];

        for (let i = 0; i < giftsToPlace; i++) {
          const randomIndex = Math.floor(Math.random() * potentialGiftTiles.length);
          const { x, y } = potentialGiftTiles.splice(randomIndex, 1)[0];
          const giftTile = `gift_${Math.floor(Math.random() * giftOptions) + 1}`;
          placedGifts.push({ x, y, tile: giftTile, layer: "gifts" });
        }

        console.log('Gifts placed:', placedGifts);
        return placedGifts;
        }
      }
    
      });

      WA.onInit().then(() => {
        WA.room.area.onEnter('santasCrashSite').subscribe(() => {
          let url;
          if (WA.player.tags.includes('member')) {
            const leaderboardURL = getLeaderboardURL("GIFTS");
            console.log("Leaderboard URL: ", leaderboardURL.toString());
            url = leaderboardURL.toString();
          } else {
            url = "https://cocreation.world/pub/a-simple-guide-to-joining-santa-s-virtual-gift-rescue-adventure";
          }
          // Open a modal with the URL
          WA.ui.modal.openModal({
            title: "GiftsQuest Leaderboard",
            src: url,
            position: "left",
            allowApi: false,
            allow: "",
          }, () => {});
        });
      });

WA.onInit().then(async () => {
  if (WA.player.tags.includes('Santa')) {
    WA.event.broadcast("ping","start");
    const initialPosition = await WA.player.getPosition();
    const { x: startX, y: startY } = initialPosition;

    const moveSantaRandomly = () => {
      const minX = Math.max(startX - 32, 0);
      const maxX = startX + 32;
      const minY = Math.max(startY - 32, 0);
      const maxY = startY + 32;

      const randomX = Math.random() * (maxX - minX) + minX;
      const randomY = Math.random() * (maxY - minY) + minY;

      console.log(`Santa moving to random position: x=${randomX}, y=${randomY}`);
      WA.player.moveTo(randomX, randomY, 1);
    };

    setInterval(moveSantaRandomly, Math.random() * 5000 + 2000); // Random interval between 2 to 7 seconds
  }
});
export {};