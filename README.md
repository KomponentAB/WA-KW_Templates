# WorkAdventure Map Starter Kit

![map](./map.png)

This is a starter kit to help you build your own map for [WorkAdventure](https://workadventu.re).

To understand how to use this starter kit, follow the tutorial at [https://docs.workadventu.re/map-building/tiled-editor/](https://docs.workadventu.re/map-building/tiled-editor/).

## Structure

We recommend following this file structure:

* *public/*: Static files like PDFs or audio files
* *src/*: Scripts files or design source files
* *tilesets/*: All PNG tilesets
* *map.tmj*: Map file
* *map.png*: The map thumbnail used as meta-data

If you want to use more than one map file, just add the new map file in the root folder ( we recommend creating a copy of *map.tmj* and editing it, in order to avoid any mistakes).

We recommend using 512x512 images for the map thumbnails.

If you are going to create custom websites to embed in the map, please reference the HTML files in the `input` option in *vite.config.js*.

## Requirements

Node.js version >=17

## Installation and testing

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal in the root directory of the project:

```shell
npm install
```

Then, you can test your map by running:

```sh
npm run dev
```

You can also test the optimized map as it will be in production by running:

```sh
npm run build
npm run prod
```
### License

© [2024] KomponentAB. All rights reserved. This repository provides a set of templates, including but not limited to graphics, assets, sounds, and tilesets, protected by copyright. Unauthorized resale or redistribution of any content from this repository is strictly prohibited without explicit permission. Any derivatives or projects created based on this repository must publicly acknowledge the original source by pointing back to this repository and informing us via contact@komponent.works.

### About third party assets

If you add third party assets in your map, do not forget to:

1. Credit the author and license with the "tilesetCopyright" property present in the properties of each tilesets in the `map.tmj` file
2. Add the license text in LICENSE.assets
