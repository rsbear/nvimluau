---
name: sachinsenal0x64/hot.nvim
slug: sachinsenal0x64-hot-nvim
category: Utility
created: 'Apr 25, 2024 9:41'
description: "\U0001F525 A hot reloader that works with any programming language."
url: 'https://github.com/sachinsenal0x64/hot.nvim'
stars: 3
topics:
  - fly
  - hot
  - hot-reload
  - lua
  - neovim
  - neovim-plugin
  - programming-languages
updated_at: '2024-04-25T16:22:31Z'
---
<div align="center">

<p align="center">

  <img alt="Hot" src="https://sachinsenal0x64.github.io/picx-images-hosting/Background.92pxhcjiab.webp">

  <h1 align="center">Hot</h1>
  🔥 A hot reloader that works with any programming language.
</p>

</div>

<br>

## 💕 Community

> 🍻 Join the community:  <a href="https://discord.gg/EbfftZ5Dd4">Discord</a>
> [![](https://cdn.statically.io/gh/sachinsenal0x64/picx-images-hosting@master/discord.72y8nlaw5mdc.webp)](https://discord.gg/EbfftZ5Dd4)

<br>

## ✨ Features

*   Zero Dependencies
*   Highly Customizable
*   Multiple Languages & Unittest Reloader on the fly
*   Start | Stop | Silent | Real Time Debug | Buffer Open / Close  Reload on Save
*   Userscript for the Browser.
*   Custom Healthchecker
*   Lualine (Status Bar) Plugin

    <br>

## 📦 Installation

> \[!NOTE]
> Install the plugin with your preferred package manager.

### 💤 [lazy.nvim](https://github.com/folke/lazy.nvim)

<details>
<summary>hot.nvim</summary>

```lua
    -- Enable Current directory 
    vim.opt.autochdir == true,

    {
        'sachinsenal0x64/hot.nvim',
        config = function()
          local opts = require('hot.params').opts
  
          -- Update the Lualine Status
          Reloader = opts.tweaks.default
          Reloader = '💤'
  
          Pattern = opts.tweaks.patterns
          Pattern = { 'main.py', 'main.go' }
  
          opts.tweaks.start = '🚀'
          opts.tweaks.stop = '💤'
          opts.tweaks.test = '🧪'
          opts.tweaks.test_done = '🧪.✅'
          opts.tweaks.test_fail = '🧪.❌'
  
          -- If the 'main.*' file doesn't exist, it will fall back to 'index.*'
          opts.tweaks.custom_file = 'index'
  
          -- Add Languages
          opts.set.languages.python = {
            cmd = 'python3',
            desc = 'Run Python file asynchronously',
            kill_desc = 'Kill the running Python file',
            emoji = '🐍',
            test = 'python -m unittest -v',
            ext = { '.py' },
          }
  
          opts.set.languages.go = {
            cmd = 'go run',
            desc = 'Run Go file asynchronously',
            kill_desc = 'Kill the running Go file',
            emoji = '🐹',
            test = 'go test',
            ext = { '.go' },
          }
  
          -- Thot Health Check
          vim.api.nvim_set_keymap('n', 'ho', '<Cmd>lua require("thot").check()<CR>', { noremap = true, silent = true })
  
          -- Keybinds
  
          -- Start
          vim.api.nvim_set_keymap('n', '<F3>', '<Cmd>lua require("hot").restart()<CR>', { noremap = true, silent = true })
          -- Silent
          vim.api.nvim_set_keymap('n', '<F4>', '<Cmd>lua require("hot").silent()<CR>', { noremap = true, silent = true })
          -- Stop
          vim.api.nvim_set_keymap('n', '<F5>', '<Cmd>lua require("hot").stop()<CR>', { noremap = true, silent = true })
          -- Test
          vim.api.nvim_set_keymap('n', '<F6>', '<Cmd>lua require("hot").test_restart()<CR>', { noremap = true, silent = true })
          -- Close Buffer
          vim.api.nvim_set_keymap('n', '<F8>', '<Cmd>lua require("hot").close_output_buffer()<CR>', { noremap = true, silent = true })
          -- Open Buffer
          vim.api.nvim_set_keymap('n', '<F7>', '<Cmd>lua require("hot").open_output_buffer()<CR>', { noremap = true, silent = true })
  
          -- Auto Reload on Save
  
          local save_group = vim.api.nvim_create_augroup('save_mapping', { clear = true })
          vim.api.nvim_create_autocmd('BufWritePost', {
            desc = 'Reloader',
            group = save_group,
            pattern = Pattern,
            callback = function()
              require('hot').silent()
            end,
          })
        end,
      },


```

</details>

### ⚡ [lualine.nvim](https://github.com/nvim-lualine/lualine.nvim)

<details>
<summary>status bar</summary>

```lua
 
local hot = {
          'Reloader',
        },

sections = {

    lualine_b = {
            hot,
   }
},   

```

</details>

### 🐵 [violentmonkey](https://violentmonkey.github.io)

<details>
<summary>userscript for browser live reloading</summary>
  <br>

*   Get The Script : <https://greasyfork.org/en/scripts/493413-hot>

*   You can add as many URLs as you want. For example: `// @match *://*.localhost:8080/*`

```js

// ==UserScript==
// @name         Hot
// @namespace    https://github.com/sachinsenal0x64/hot.nvim
// @version      1.0
// @description  🔥 A hot reloader for the Browser.
// @author       sachinsenal0x64
// @match        *://*.localhost:8086/*
// @match        *://*.atom.com/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Create a meta tag for auto-refresh
  var metaTag = document.createElement('meta');
  metaTag.setAttribute('http-equiv', 'refresh');
  metaTag.setAttribute('content', '5'); // Refresh every 5 seconds

  // Find the <head> element and append the meta tag to it
  var head = document.querySelector('head');
  head.appendChild(metaTag);
})();

```

🏆 Now you're ready to go! Hooray!

</details>

<br>

### 🫂 Contributing

*   Feel free to send PR's regarding spelling mistakes, incorrect grammar etc.
