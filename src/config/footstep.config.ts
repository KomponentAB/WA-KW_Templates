import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { MaterialType } from "../models/footstep.model";

export const soundFiles: Record<MaterialType, string[]> = {
  [MaterialType.wood]: [
    "/sounds/wood_01_a.wav",
    "/sounds/wood_01_b.wav",
    "/sounds/wood_01_c.wav",
    "/sounds/wood_01_d.wav"
  ],
  [MaterialType.forest]: [
    "/sounds/forest_01_a.wav",
    "/sounds/forest_01_b.wav",
    "/sounds/forest_01_c.wav",
    "/sounds/forest_01_d.wav",
    "/sounds/forest_01_e.wav"
  ],
  [MaterialType.snow]: [
    "/sounds/snow_01_a.wav",
    "/sounds/snow_01_b.wav",
    "/sounds/snow_01_c.wav",
    "/sounds/snow_01_d.wav"
  ],
  [MaterialType.marble]: [
    "/sounds/marble_01_a.wav",
    "/sounds/marble_01_b.wav",
    "/sounds/marble_01_c.wav",
    "/sounds/marble_01_d.wav"
  ],
  [MaterialType.mud]: [
    "/sounds/mud_01_a.wav",
    "/sounds/mud_01_b.wav",
    "/sounds/mud_01_c.wav",
    "/sounds/mud_01_d.wav"
  ],
  [MaterialType.path]: [
    "/sounds/path_01_a.wav",
    "/sounds/path_01_b.wav",
    "/sounds/path_01_c.wav",
    "/sounds/path_01_d.wav",
    "/sounds/path_01_e.wav"
  ],
  [MaterialType.stone]: [
    "/sounds/stone_01_a.wav",
    "/sounds/stone_01_b.wav",
    "/sounds/stone_01_c.wav",
    "/sounds/stone_01_d.wav",
    "/sounds/stone_01_e.wav"
  ],
  [MaterialType.water]: [
    "/sounds/water_01_a.wav",
    "/sounds/water_01_b.wav",
    //"/sounds/water_01_c.wav" (Doesnt sound good)
  ],
  [MaterialType.sand]: [
    "/sounds/sand_01_a.wav",
    "/sounds/sand_01_b.wav",
    "/sounds/sand_01_c.wav"
    //"/sounds/water_01_c.wav" (Doesnt sound good)
  ],
};

export const audioConfig: SoundConfig = {
  volume: 0.15,
  loop: false,
  rate: 1.5,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};
