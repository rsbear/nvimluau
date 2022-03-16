---
name: koenverburg/minimal-tabline.nvim
slug: koenverburg-minimal-tabline-nvim
category: Tabline
created: 'Mar 16, 2022 12:33'
description: 'A minimal tabline, that''s it'
url: 'https://github.com/koenverburg/minimal-tabline.nvim'
stars: 2
topics:
  - neovim
  - neovim-plugin
updated_at: '2022-02-16T19:05:05Z'
---
# Minimal-tabline.nvim

This is a minimal tabline, that's it.

![Screenshot](./assets/screenshot.png)

## Installation

Make sure you are using Neovim (v0.6.0) or the latest neovim nightly.

Using [vim-plug](https://github.com/junegunn/vim-plug)

```viml
Plug 'tjdevries/colorbuddy.nvim'
Plug 'koenverburg/minimal-tabline.nvim'
```

Using [dein](https://github.com/Shougo/dein.vim)

```viml
call dein#add('tjdevries/colorbuddy.nvim')
call dein#add('koenverburg/minimal-tabline.nvim')
```

Using [packer.nvim](https://github.com/wbthomason/packer.nvim)

```lua
use {
  'koenverburg/minimal-tabline.nvim',
  requires = { {'tjdevries/colorbuddy.nvim'} }
}
```

## Customization

The layout of the tab is as follows `<index> <filename> <modified_sign> (<N of panes>)`.
The `tab_index`, `pane_count` are turned off by default but can be turned on as desired. This also counts for the `modified_sign` which can be turn off, its on by default.

```lua
require('minimal-tabline').setup({
  enable = true,
  tab_index = false,
  pane_count = false,
  modified_sign = true,
  no_name = '[No Name]'
})
```

## Related Projects

*   [romgrk/barbar.nvim](https://github.com/romgrk/barbar.nvim)
*   [akinsho/bufferline.nvim](https://github.com/akinsho/bufferline.nvim)
*   [crispgm/nvim-tabline](https://github.com/crispgm/nvim-tabline)
*   [alvarosevilla95/luatab.nvim](https://github.com/alvarosevilla95/luatab.nvim)
*   [johann2357/nvim-smartbufs](https://github.com/johann2357/nvim-smartbufs)
*   [kdheepak/tabline.nvim](https://github.com/kdheepak/tabline.nvim)
*   [noib3/cokeline.nvim](https://github.com/noib3/cokeline.nvim)
