---
name: HUAHUAI23/telescope-session.nvim
slug: huahuai23-telescope-session-nvim
category: Session
created: 'Feb 24, 2023 12:20'
description: "manage your vim session with telescope \U0001F52D"
url: 'https://github.com/HUAHUAI23/telescope-session.nvim'
stars: 12
topics:
  - lua
  - neovim
  - neovim-plugin
  - nvim
  - telescope-extension
  - vim
updated_at: '2023-02-22T15:41:58Z'
---
      ____  _____            _                             _             
     |___ \|___ /     __   _(_)_ __ ___  ___  ___  ___ ___(_) ___  _ __  
       __) | |_ \ ____\ \ / / | '_ ` _ \/ __|/ _ \/ __/ __| |/ _ \| '_ \ 
      / __/ ___) |_____\ V /| | | | | | \__ \  __/\__ \__ \ | (_) | | | |
     |_____|____/       \_/ |_|_| |_| |_|___/\___||___/___/_|\___/|_| |_|

***

![](https://img.shields.io/badge/Perfect-neovim%20picgo-green)\
🔗[Telescope](https://github.com/nvim-telescope/telescope.nvim) a highly extendable fuzzy finder over lists. This plugin is an extension of telescope, it provides something to help you manage your vim sessions

## Features

***

*   Display your session file list
*   Switching between your vim seesions
*   Manage your seesion file
*   Save your vim seesion to the default location (or a custom location)

## Requirements

***

*   Neovim (v0.7.0) or the latest neovim nightly commit is required for telescope.nvim to work.
*   🔗[lua/plenary.nvim](https://github.com/nvim-lua/plenary.nvim) is required.

### Optional

*   🔗[kyazdani42/nvim-web-devicons](https://github.com/kyazdani42/nvim-web-devicons) (used to display file icons)

## Getting Started

### demo

![](./pic/xray23.gif)

### Using packer.nvim

```lua
use({
 "nvim-telescope/telescope.nvim",
 -- tag = "0.1.0",
 branch = "0.1.x",
 requires = { { "nvim-lua/plenary.nvim" } },
 config = function()
  require("telescope").setup({
   extensions = {
    xray23 = {
     -- location to store session files, default is vim.fn.stdpath("data") .. "/vimSession"
     sessionDir = "/path/to/session-file",
    },
   },
  })
  -- loade telescope-session.nvim
  require("telescope").load_extension("xray23")
 end,
})
use("HUAHUAI23/telescope-session.nvim")
```

***

### Usage

***

#### commands

```vim
" Display your session file list
:Telescope xray23 list

" input the seesion file name (null will use default session file name)
" and save it to the default location  (or a custom location)
:Telescope xray23 save
```

#### telescope keybinds

see 🔗[Telescope Default Mappings](https://github.com/nvim-telescope/telescope.nvim#default-mappings)\
**telescope-session.nvim** provides two additional normal mode keybinds

| Mappings | Action                     |
| -------- | -------------------------- |
| `enter`  | switch to selected session |
| `d`      | delete selected session    |

**neovim keybind**\
if you want to set up neovim keymap you can do something like this

```lua
-- press <space>s  will open session files list
vim.keymap.set("n", "<space>s", "<cmd>Telescope xray23 list<cr>")

-- or create a user command and use it to save vim session
vim.api.nvim_create_user_command("SessionSv", function()
 vim.api.nvim_cmd(vim.api.nvim_parse_cmd("Telescope xray23 save", {}), {})
end, { desc = "load user session,like workspace" })

```

### Development

```bash
git clone https://github.com/HUAHUAI23/telescope-session.nvim.git
cd telescope-session.nvim/lua/session-manage/
```

See [plugin/session-manage](https://github.com/HUAHUAI23/telescope-session.nvim/blob/main/lua/session-manage/init.lua) for details
