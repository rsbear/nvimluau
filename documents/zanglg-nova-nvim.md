---
name: zanglg/nova.nvim
slug: zanglg-nova-nvim
category: Colorschemes
created: 'Oct 17, 2022 2:07'
description: 'Another color scheme for neovim written in lua, WIP'
url: 'https://github.com/zanglg/nova.nvim'
stars: 82
topics:
  - color-scheme
  - colorscheme
  - lua
  - neovim
  - nvim
updated_at: '2022-09-26T04:59:42Z'
---
# nova colorscheme for neovim

*A (very) WIP colorscheme for neovim.*

## ⭐ Features

*   [nvim-treesiter](https://github.com/nvim-treesitter/nvim-treesitter), *WIP*
*   [nvim-ts-rainbow](https://github.com/p00f/nvim-ts-rainbow)
*   [which-key.nvim](https://github.com/folke/which-key.nvim)
*   [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim), *WIP*
*   [lualine.nvim](https://github.com/nvim-lualine/lualine.nvim), *YTS*
*   [hop.nvim](https://github.com/phaazon/hop.nvim)

## 📦 Instalation

You can use your favorite plugin manager for this. Here is an example with
packer.nvim:

#### packer.nvim

```lua
use({
    "zanglg/nova.nvim",
    config = function()
        -- support both dark and light style
        require("nova").setup({ background = "dark" })

        -- load colorscheme
        require("nova").load()
    end,
})
```

## 🔧 Configuration

*   todo.

## 🎨 Preview

**The color and group was not fixed finally, so screenshot may have a big change.**

*   **dark mode:**

<img width="2209" alt="dark" src="https://user-images.githubusercontent.com/4172061/190657325-be88e26f-907a-434d-a5f1-af7634e335ed.png">

*   **light mode:**

<img width="2209" alt="light" src="https://user-images.githubusercontent.com/4172061/190657375-2b722ead-e218-49dc-b747-b6c0a4b599b3.png">
