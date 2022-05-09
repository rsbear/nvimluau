---
name: b0o/incline.nvim
slug: b0o-incline-nvim
category: Status Line
created: 'May 09, 2022 6:38'
description: "\U0001F388 Floating statuslines for Neovim"
url: 'https://github.com/b0o/incline.nvim'
stars: 105
topics:
  - neovim
  - neovim-plugin
  - neovim-statusline
  - neovim-ui
  - nvim
  - nvim-plugin
  - vim
updated_at: '2022-05-09T00:57:36Z'
---
# Incline.nvim [![Version](https://img.shields.io/github/v/tag/b0o/incline.nvim?style=flat\&color=yellow\&label=version\&sort=semver)](https://github.com/b0o/incline.nvim/releases) [![License: MIT](https://img.shields.io/github/license/b0o/incline.nvim?style=flat\&color=green)](https://mit-license.org) [![Test Status](https://img.shields.io/github/workflow/status/b0o/incline.nvim/test?label=tests)](https://github.com/b0o/incline.nvim/actions/workflows/test.yaml)

Lightweight floating statuslines, intended for use with Neovim's new global statusline (`set laststatus=3`).

#### This plugin is still early in development — Please expect frequent breaking changes!

Incline is still sparse on features, but it should now be stable enough for basic usage. New features are being added regularly.

Once `v0.1.0` is reached, breaking changes will be limited to major releases. Until then, breaking changes may occur on patch-level versions.
I recommend pinning the version in your plugin manager so that you're not surprised by a breaking change at an inconvenient time.

![Screenshot of Incline.nvim running in Neovim](https://user-images.githubusercontent.com/21299126/167235114-d562ea45-155c-4d82-aaf1-95abb56398b7.png)

## Installation

**Note:** Incline requires Neovim v0.7 or [Neovim nightly](https://github.com/neovim/neovim/releases/tag/nightly).

[Packer](https://github.com/wbthomason/packer.nvim):

```lua
use "b0o/incline.nvim"
```

## Usage

```lua
require('incline').setup()
```

### Configuration

Incline's default configuration:

```lua
require('incline').setup {
  render = "basic",
  debounce_threshold = {
    falling = 50,
    rising = 10
  },
  hide = {
    focused_win = false,
  },
  highlight = {
    groups = {
      InclineNormal = "NormalFloat",
      InclineNormalNC = "NormalFloat"
    },
  },
  ignore = {
    buftypes = "special",
    filetypes = {},
    floating_wins = true,
    unlisted_buffers = true,
    wintypes = "special",
  },
  window = {
    margin = {
      horizontal = {
        left = 1,
        right = 1
      },
      vertical = {
        bottom = 0,
        top = 1
      },
    },
    options = {
      signcolumn = "no",
      wrap = false
    },
    padding = {
      left = 1,
      right = 1
    },
    padding_char = " ",
    placement = {
      horizontal = "right",
      vertical = "top",
    },
    width = "fit",
    winhighlight = {
      active = {
        EndOfBuffer = "None",
        Normal = "InclineNormal",
        Search = "None"
      },
      inactive = {
        EndOfBuffer = "None",
        Normal = "InclineNormalNC",
        Search = "None"
      }
    },
    zindex = 50,
  },
}
```

See [`incline.txt`](https://github.com/b0o/incline.nvim/blob/main/doc/incline.txt) for full documentation of all configuration options.

## Changelog

    29 Apr 2022                                                             v0.0.3
      Breaking: window.options.winhighlight is deprecated
      Feat: Add highlight support
      Feat: Support hiding Incline on the only window in a tabpage
      Feat: Support hiding Incline on the focused window
      Feat: Allow tables of highlight args as winhighlight values
      Feat: Add preset render functions
      Feat: Add functions to globally enable/disable/toggle Incline
      Feat: Add config.window.options
      Feat: Add configuration transforms
      Tweak: Display notification upon invalid config rather than throwing error
      Tweak: Allow rising & falling debounce threshold to be configured separately
      Fix: Destroy child when an existing win becomes ignored
      Fix: Handle when manager.win_get_tabpage passed nil or 0
      Fix: check winline _buf and _win for nil
      Misc: Refactor, fix bugs, and improve stability

    14 Apr 2022                                                             v0.0.2
      Feat: Make position, size, and content configurable
      Feat: Validate user configuration against schema
      Docs: Add documentation
      Tests: Add tests for configuration and schema
      Misc: Refactor, fix bugs, and improve stability

    07 Apr 2022                                                             v0.0.1
      Initial Release

## License

© 2022 Maddison Hellstrom

Released under the MIT License.
