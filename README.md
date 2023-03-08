# Off-Canvas Menu

> Simple JavaScript Off-Canvas Menu.

## Features

- Simple
- Mobile first
- Multi level
- Lightweight: ~6KB (generated js file)

## Getting started

1. Download the zip file of the latest release from GitHub. You will find a js and a css file inside.
2. Include the css file at the top of your page in the head section:
   `<link href="path/to/off-canvas-menu.css" rel="stylesheet" />`
3. Place the script tag at the bottom of your page right before the closing body tag:
   `<script src="path/to/off-canvas-menu.js"></script>`
4. Create a navigation list for your off-canvas menu:
   ```
   <div class="off-canvas">
      <div class="off-canvas-header">
        <h4 class="off-canvas-title">Menu</h4>
        <div aria-label="Close">
          <div class="icon-close"></div>
        </div>
      </div>
   
      <div class="off-canvas-body">
        <nav class="off-canvas-nav">
          <div class="list-level-0">
            <div class="list-item">
              <a href="#" class="link-level-1"> Home </a>
            </div>
            <div class="list-item">
              <a href="#" class="link-level-1">
                Services <span class="link-arrow">›</span>
              </a>
            </div>
            <div class="list-level-1">
              <div class="list-item">
                <a href="#" class="link-level-2">
                  UX-Design <span class="link-arrow">›</span>
                </a>
              </div>
              <div class="list-level-2">
                <div class="list-item">
                  <a href="#" class="link-level-3"> Screendesign </a>
                </div>
                <div class="list-level-3"></div>
              </div>
              <div class="list-item">
                <a href="#" class="link-level-2"> Webdesign </a>
              </div>
              <div class="list-item">
                <a href="#" class="link-level-2"> Content Marketing </a>
              </div>
            </div>
            <div class="list-item">
              <a href="#" class="link-level-1">
                Team <span class="link-arrow">›</span>
              </a>
            </div>
            <div class="list-level-1">
              <div class="list-item">
                <a href="#" class="link-level-2"> John </a>
              </div>
              <div class="list-item">
                <a href="#" class="link-level-2"> Peter </a>
              </div>
              <div class="list-item">
                <a href="#" class="link-level-2"> Michael </a>
              </div>
            </div>
            <div class="list-item">
              <a href="#" class="link-level-1"> Contact </a>
            </div>
          </div>
        </nav>
      </div>
   </div>
   ```

5. Create a menu toggle:
   ```
   <aside class="icon-open-row">
      <div class="icon-open-container">
        <div class="icon-open-col-1">☰</div>
        <div class="icon-open-col-2">Open Menu</div>
      </div>
   </aside>
   ```

## Local development

Feel free to reach out for any kind of cooperation or feedback. PRs welcome.

### Installation

For installation cd into the project root and run `npm install`.

### Development

To serve on localhost run `npm run start` on the command line.

### Build

For a production build run `npm run build` on the command line.
This will generate a `dist` directory with `index.html`, `off-canvas-menu.js` and `off-canvas-menu.css`.

## Demo

[Demo](http://off-canvas-menu.mgnmrt.com)

## Built with

### [TypeScript](https://www.typescriptlang.org/)

TypeScript is JavaScript with syntax for types.

### [Sass](https://sass-lang.com/)

CSS with superpowers.

### [webpack](https://webpack.js.org/)

Module Bundler for JavaScript.

## Author

[Magnus Martin](https://mgnmrt.com/)
