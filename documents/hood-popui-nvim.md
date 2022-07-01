---
name: hood/popui.nvim
slug: hood-popui-nvim
category: Utility
created: 'Apr 15, 2022 3:41'
description: NeoVim UI sweetness powered by popfix.
url: 'https://github.com/hood/popui.nvim'
stars: 42
topics:
  - language-server-protocol
  - lsp
  - lsp-client
  - menu
  - neovim
  - nvim
updated_at: '2022-04-13T16:21:18Z'
---
<div align="center">
  <h1>popui.nvim</h1>
  <h6>NeoVim UI sweetness powered by popfix.</h6>
</div>

<br/>

## What's `popui` all about?

It's a custom UI which overrides neovim's default `vim.ui.select` menu and `vim.ui.input` prompt, spawning a floating menu right where your cursor resides. <br/><br/>

<h3>See it in action below:</h3>
<br/>
<h4>Code action menu popup</h4>

![Snapshot #1](https://i.imgur.com/ZKRBssU.png) <br/>

<h4>Variable renaming input popup</h4>

![Snapshot #2](https://i.imgur.com/G4tkHhK.png)

## Installation

```viml
" Using vim-plug
Plug 'hood/popui.nvim'

" Using Vundle
Plugin 'hood/popui.nvim'
```

## Setup

```lua
vim.ui.select = require"popui.ui-overrider"
vim.ui.input = require"popui.input-overrider"
```

## Customize border style

```vim
" Available styles: "sharp" | "rounded" | "double"
let g:popui_border_style = "double"
```

## Dependencies

*   [RishabhRD/popfix](https://github.com/RishabhRD/popfix)
