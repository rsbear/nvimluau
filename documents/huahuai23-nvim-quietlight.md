---
name: HUAHUAI23/nvim-quietlight
slug: huahuai23-nvim-quietlight
category: Colorschemes
created: 'Feb 24, 2023 12:21'
description: 'A theme for Neovim with support for LSP, Treesitter,  and more.'
url: 'https://github.com/HUAHUAI23/nvim-quietlight'
stars: 0
topics:
  - neovim
  - nvim
  - nvim-theme
  - theme
  - themes
  - vim
updated_at: '2023-02-06T16:37:29Z'
---
<section align="center">
  <img src="./stuff/giphy.gif" width="100"/>
  <br>
  <p>A quietlight theme generate from <a href="https://github.com/microsoft/vscode/blob/main/extensions/theme-quietlight/themes/quietlight-color-theme.json">vscode quietlight theme</a> and <a href="https://github.com/aonemd/quietlight.vim">quietlight.vim</a>
  </p>
  <hr>
</section>

<table align="center">
  <tr>
    <td>
      <img width="767" alt="Lua" src="./stuff/1.png">
    </td>
    <td>
      <img width="767" alt="Python" src="./stuff/2.png">
    </td>
  </tr>
  <tr>
    <td>
      <img width="767" alt="nvim-tree" src="./stuff/3.png">
    </td>
    <td>
      <img width="767" alt="telescope.nvim" src="./stuff/4.png">
    </td>
  </tr>
   <tr>
    <td>
      <img width="767" alt="nvim-cmp" src="./stuff/5.png">
    </td>
    <td>
      <img width="787" alt="Transparent background" src="./stuff/6.png">
    </td>
  </tr>
</table>
<br>

[**中文指南**](./README-zh.md)\
[**lualine.nvim**](https://github.com/nvim-lualine/lualine.nvim) for statusline, [**bufferline.nvim**](https://github.com/akinsho/bufferline.nvim) for tabline, and [**winbar.nvim**](https://github.com/fgheng/winbar.nvim) for winbar

## Requirements

*   Neovim v0.7.0 or higher.

> **Note:** Some plugin integrations (treesitter) require Neovim v0.8. If your Neovim version doesn't support a plugin integration,nvim-quietlight displays a warning message when enabling that integration. Use Neovim [v0.8.0](https://github.com/neovim/neovim/releases/tag/v0.8.0) or higher.

*   Don't support VIM, if you want vim verison supported see [quietlight.nvim](https://github.com/aonemd/quietlight.vim)

*   A terminal with true colour support will better although nvim-quietlight support ANSI terminal colors

## Installation

Install nvim-quietlight with your favorite package manager

```lua
use("HUAHUAI23/nvim-quietlight") -- packer.nvim
```

## Usage

To use nvim-quietlight's default configuration, add the following to your Neovim configuration:

```lua
vim.opt.background = 'light'
vim.cmd('colorscheme quietlight')
-- add this for disable colorcolumn
vim.cmd("highlight clear ColorColumn")
```

## Configuration

this is default configuration and you can overwrite the default settings:

```lua
require(nvim - quietlight).setup(require(nvim - quietlight).setup({
 ansi_terminal_colors = false,
 transparent_background = false,
 dim_inactive_windows = {
  enabled = false,
  color = nil,
 },
 syntax = {
  booleans = {}, --{ bold = true, italic = true } or { fg = "#xxxxxx", bg="#xxxxxx" }
  comments = {}, -- see nvim.api.nvim_set_hl  https://neovim.io/doc/user/api.html
  identifiers = {},
  statements = {},
  conditionals = {},
  constants = {},
  fields = {},
  functions = {},
  keywords = {},
  loops = {},
  numbers = {},
  operators = {},
  punctuation = {},
  strings = {},
  types = {},
  preproc = {},
 },
 plugins = {
  gitsigns = true,
  lsp = true,
  bufferline = true,
  treesitter = true,
  notify = true,
  nvimtree = true,
  indentline = true,
 },
}))

```

You must invoke the `setup` function before the `:colorscheme quietlight` command to respect your configuration settings.

> **Note:** You can omit empty tables and nil fields in the configuration table to respect default settings.

you can make your plugins highlight group and place it on [this](https://github.com/HUAHUAI23/nvim-quietlight/tree/main/lua/nvim-quietlight/hl_group/plugins)\
The windows terminal theme is in [there](./extras/terminal/theme.json)
