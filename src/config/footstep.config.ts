import { SoundConfig } from "@workadventure/iframe-api-typings/play/src/front/Api/Iframe/Sound/Sound";
import { MaterialType } from "../models/footstep.model";

export const soundFiles: Record<MaterialType, string[]> = {
  [MaterialType.wood]: [
    "wood_01_a.wav",
    "wood_01_b.wav",
    "wood_01_c.wav",
    "wood_01_d.wav",
  ],
  [MaterialType.forest]: [
    "forest_01_a.wav",
    "forest_01_b.wav",
    "forest_01_c.wav",
    "forest_01_d.wav",
    "forest_01_e.wav",
  ],
  [MaterialType.snow]: [
    "snow_01_a.wav",
    "snow_01_b.wav",
    "snow_01_c.wav",
    "snow_01_d.wav",
  ],
  [MaterialType.marble]: [
    "marble_01_a.wav",
    "marble_01_b.wav",
    "marble_01_c.wav",
    "marble_01_d.wav",
  ],
  [MaterialType.mud]: [
    "mud_01_a.wav",
    "mud_01_b.wav",
    "mud_01_c.wav",
    "mud_01_d.wav",
  ],
  [MaterialType.path]: [
    "path_01_a.wav",
    "path_01_b.wav",
    "path_01_c.wav",
    "path_01_d.wav",
    "path_01_e.wav",
  ],
  [MaterialType.stone]: [
    "stone_01_a.wav",
    "stone_01_b.wav",
    "stone_01_c.wav",
    "stone_01_d.wav",
    "stone_01_e.wav",
  ],
  [MaterialType.water]: [
    "water_01_a.wav",
    "water_01_b.wav",
    //"water_01_c.wav" (Doesnt sound good)
  ],
  [MaterialType.sand]: [
    "sand_01_a.wav",
    "sand_01_b.wav",
    "sand_01_c.wav",
    //"water_01_c.wav" (Doesnt sound good)
  ],
  [MaterialType.ice]: [
    "ice_01.wav",
    "ice_02.wav",
    "ice_03.wav",
    "ice_04.wav",
  ],


};
///some sounds are missing, but you can add them here
export const audioConfig: SoundConfig = {
  volume: 0.05,
  loop: false,
  rate: 1.5,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};
