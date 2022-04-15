---
name: zbirenbaum/copilot-cmp
slug: zbirenbaum-copilot-cmp
category: Completion
created: 'Apr 15, 2022 3:59'
description: Lua plugin to turn github copilot into a cmp source
url: 'https://github.com/zbirenbaum/copilot-cmp'
stars: 69
topics:
  - copilot
  - github-copilot
  - lua
  - neovim
  - nvim-cmp
updated_at: '2022-04-14T13:37:46Z'
---
# copilot-cmp

This repository transforms <https://github.com/zbirenbaum/copilot.lua> into a cmp source.

Copilot suggestions will automatically be loaded into your cmp menu as snippets and display their full contents when a copilot suggestion is hovered.

![copilot-cmp](https://user-images.githubusercontent.com/32016110/161629472-db4324f1-d091-441c-a681-d3d9b589ecd0.png)

## Setup

If you already have copilot.lua installed, you can install this plugin with packer as you would any other with the following code:

### Install

```lua
use {
    "zbirenbaum/copilot-cmp",
    after = { "copilot.lua", "nvim-cmp" },
}
```

If you do not have copilot.lua installed, go to <https://github.com/zbirenbaum/copilot.lua> and follow the instructions there before installing this one

### Configuration

To link cmp with this source, simply go into your cmp configuration file and include `{ name = "copilot" }` under your sources

Here is an example of what it should look like:

```lua
cmp.setup {
  ...
  sources = {
    { name = "copilot", group_index = 2 },
    { name = "nvim_lsp", group_index = 2 },
    { name = "path", group_index = 2 },
    { name = "luasnip", group_index = 2 },
  },
  ...
}
```
