import { TileDescriptor } from "@workadventure/iframe-api-typings";
import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { FireworkColors, FIREWORKS_CONFIG } from "./config/fireworks.config";

export function setupFireworks(): void {
  setupFireworksButton();
  setupFireworksListener();
  console.log("🎆 Fireworks initialized successfully");
}

export function setupFireworksButton(): void {
  const button = "firework-btn";

  WA.ui.actionBar.addButton({
    id: button,
    label: "Fireworks! 🎆",
    type: "button",
    callback: () => {
      WA.ui.actionBar.removeButton(button); //remove button temporarily
      triggerFirework()
        .then((firework: FireworkConfig) => {
          WA.event.broadcast("firework", {
            playerId: WA.player.id,
            x: firework.x,
            y: firework.y,
            color: firework.color,
          });
        })
        .finally(() => setupFireworksButton()); //restore button after fireworks promise
    },
  });
}

interface FireworkConfig {
  color: FireworkColors;
  x: number;
  y: number;
}

export async function triggerFirework(
  config?: FireworkConfig
): Promise<FireworkConfig> {
  const tileConfig = config || (await generateFireworkConfig());
  const tiles = await generateFireworkTiles(tileConfig);

  WA.room.setTiles(tiles);

  playSound(`./sounds/firework_single.mp3`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        WA.room.setTiles([...tiles.map((x) => ({ ...x, tile: null }))]);
        resolve(tileConfig);
      } catch (e) {
        console.error("Failed to trigger firework", e);
        reject(e);
      }
    }, FIREWORKS_CONFIG.fireworkDuration); // Remove tiles after FireworkDuration (1400ms)
  });

  function playSound(path: string) {
    const newSound = WA.sound.loadSound(path);
    const positive = Math.random() >= 0.5;
    const detune = Math.round(Math.random() * 850);
    const config: SoundConfig = {
      loop: false,
      detune: positive ? detune : -detune,
    };
    newSound.play(config);
  }

  async function generateFireworkConfig(): Promise<FireworkConfig> {
    const { x, y } = await WA.player.getPosition();
    return { x, y, color: getRandomFireworkColor() };
  }

  function getRandomFireworkColor() {
    const colors = Object.values(FireworkColors);
    return colors[Math.floor(Math.random() * colors.length)];
  }

  async function generateFireworkTiles(
    config: FireworkConfig
  ): Promise<TileDescriptor[]> {
    const tileConfig: TileDescriptor = {
      x: Math.floor(config.x / 32),
      y: Math.floor(config.y / 32),
      layer: FIREWORKS_CONFIG.animationLayer,
      tile: null, // Placeholder, will be set per tile
    };

    const tiles = new Array(9).fill(null).map((_, index) => {
      const dx = (index % 3) - 1; // -1, 0, 1 for column offset
      const dy = Math.floor(index / 3) - 1; // -1, 0, 1 for row offset
      return {
        ...tileConfig,
        x: tileConfig.x + dx,
        y: tileConfig.y + dy,
        tile: `${config.color}_${index + 1}`,
      };
    });

    return tiles;
  }
}

function setupFireworksListener() {
  WA.event.on("firework").subscribe((value) => {
    const { playerId, x, y, color } = value.data as {
      playerId: string;
    } & FireworkConfig;
    if (playerId !== WA.player.id) {
      triggerFirework({ x, y, color });
    }
  });
}
