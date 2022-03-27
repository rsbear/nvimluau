---
name: echasnovski/mini.nvim
slug: echasnovski-mini-nvim
category: Utility
created: 'Mar 27, 2022 6:45'
description: >-
  Neovim plugin with collection of minimal, independent, and fast Lua modules
  dedicated to improve Neovim (version 0.5 and higher) experience
url: 'https://github.com/echasnovski/mini.nvim'
stars: 405
topics:
  - lua
  - neovim
  - neovim-plugin
  - nvim
  - nvim-lua
updated_at: '2022-03-26T11:12:46Z'
---
<img src="logo.png" width="800em"/> <br>

<!-- badges: start -->

[![GitHub license](https://badgen.net/github/license/echasnovski/mini.nvim)](https://github.com/echasnovski/mini.nvim/blob/main/LICENSE)
[![GitHub tag](https://badgen.net/github/tag/echasnovski/mini.nvim)](https://github.com/echasnovski/mini.nvim/tags/)
[![Current version](https://badgen.net/badge/Current%20version/development/cyan)](https://github.com/echasnovski/mini.nvim/blob/main/CHANGELOG.md)

<!-- badges: end -->

Collection of minimal, independent, and fast Lua modules dedicated to improve [Neovim](https://github.com/neovim/neovim) (version 0.5 and higher) experience. Each module can be considered as a separate sub-plugin.

## Table of contents

*   [Installation](#installation)
*   [General principles](#general-principles)
*   [Plugin colorscheme](#plugin-colorscheme)
*   [Modules](#modules)
    *   [mini.base16](#minibase16)
    *   [mini.bufremove](#minibufremove)
    *   [mini.comment](#minicomment)
    *   [mini.completion](#minicompletion)
    *   [mini.cursorword](#minicursorword)
    *   [mini.doc](#minidoc)
    *   [mini.fuzzy](#minifuzzy)
    *   [mini.indentscope](#miniindentscope)
    *   [mini.jump](#minijump)
    *   [mini.misc](#minimisc)
    *   [mini.pairs](#minipairs)
    *   [mini.sessions](#minisessions)
    *   [mini.starter](#ministarter)
    *   [mini.statusline](#ministatusline)
    *   [mini.surround](#minisurround)
    *   [mini.tabline](#minitabline)
    *   [mini.trailspace](#minitrailspace)
*   [Planned modules](#planned-modules)

## Installation

This plugin offers two branches to install from:

*   `main` (default) will have latest development version of plugin. All changes since last stable release should be perceived as being in beta testing phase (meaning they already passed alpha-testing and are moderately settled).
*   `stable` will be updated only upon releases with code tested during public beta-testing phase in `main` branch.

There are at least the following ways to install this plugin:

*   Using [wbthomason/packer.nvim](https://github.com/wbthomason/packer.nvim):

    ```lua
    -- Development
    use 'echasnovski/mini.nvim'

    -- Stable
    use { 'echasnovski/mini.nvim', branch = 'stable' }
    ```

*   Using [junegunn/vim-plug](https://github.com/junegunn/vim-plug):

    ```vim
    " Development
    Plug 'echasnovski/mini.nvim'

    " Stable
    Plug 'echasnovski/mini.nvim', { 'branch': 'stable' }
    ```

*   Each module is independent and implemented within single file. You can copy corresponding file from 'lua/mini/' directory to your '.config/nvim/lua' directory and use it from there.

Don't forget to call module's `setup()` (if required) to enable its functionality.

## General principles

*   **Design**. Each module is designed to solve a particular problem targeting balance between feature-richness (handling as many edge-cases as possible) and simplicity of implementation/support. Granted, not all of them ended up with the same balance, but it is the goal nevertheless.
*   **Independence**. Modules are independent of each other and can be run without external dependencies. Although some of them may need dependencies for full experience.
*   **Structure**. Each module is a submodule for a placeholder "mini" module. So, for example, "surround" module should be referred to as "mini.surround".  As later will be explained, this plugin can also be referred to as "MiniSurround".
*   **Setup**:
    *   Each module (if needed) should be setup separately with `require(<name of module>).setup({})` (possibly replace {} with your config table or omit to use defaults).  You can supply only values which differ from defaults, which will be used for the rest ones.
    *   Call to module's `setup()` always creates a global Lua object with coherent camel-case name: `require('mini.surround').setup()` creates `_G.MiniSurround`. This allows for a simpler usage of plugin functionality: instead of `require('mini.surround')` use `MiniSurround` (or manually `:lua MiniSurround.*` in command line); available from `v:lua` like `v:lua.MiniSurround`. Considering this, "module" and "Lua object" names can be used interchangeably: 'mini.surround' and 'MiniSurround' will mean the same thing.
    *   Each supplied `config` table (aft) is stored in `config` field of global object. Like `MiniSurround.config`.
    *   Values of `config`, which affect runtime activity, can be changed on the fly to have effect. For example, `MiniSurround.config.n_lines` can be changed during runtime; but changing `MiniSurround.config.mappings` won't have any effect (as mappings are created once during `setup()`).
*   **Disabling**. Each module's core functionality can be disabled globally or buffer-locally by creating appropriate global or buffer-scoped variables equal to `v:true`. See `mini.nvim-disabling-recipes` section in help file for common recipes.
*   **Highlight groups**. Appearance of module's output is controlled by certain highlight group (see `:h highlight-groups`). To customize them, use `highlight` command. **Note**: currently not many Neovim themes support this plugin's highlight groups; fixing this situation is highly appreciated.  To see a more calibrated look, use MiniBase16 or plugin's colorscheme `minischeme`.
*   **Stability**. Each module upon release is considered to be relatively stable: both in terms of setup and functionality. Any non-bugfix backward-incompatible change will be released gradually as much as possible.

## Plugin colorscheme

This plugin comes with an official colorscheme named `minischeme`. This is a MiniBase16 theme created with faster version of the following Lua code: `require('mini.base16').setup({palette = palette, name = 'minischeme', use_cterm = true})` where `palette` is:

*   For dark 'background': `require('mini.base16').mini_palette('#112641', '#e2e98f', 75)`
*   For light 'background': `require('mini.base16').mini_palette('#e2e5ca', '#002a83', 75)`

Activate it as a regular `colorscheme`.

All examples use this colorscheme.

## Modules

### mini.base16

Fast implementation of [chriskempson/base16](https://github.com/chriskempson/base16) theme for manually supplied palette. Has unique palette generator which needs only background and foreground colors.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-base16_dark.png" width="400em"/> <img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-base16_light.png" width="400em"/>

Default `config`:

```lua
{
  -- Table with names from `base00` to `base0F` and values being strings of
  -- HEX colors with format "#RRGGBB". NOTE: this should be explicitly
  -- supplied in `setup()`.
  palette = nil,

  -- Whether to support cterm colors. Can be boolean, `nil` (same as
  -- `false`), or table with cterm colors. See `setup()` documentation for
  -- more information.
  use_cterm = nil,
}
```

For more information, read 'mini.base16' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [chriskempson/base16-vim](https://github.com/chriskempson/base16-vim)

### mini.bufremove

Buffer removing (unshow, delete, wipeout) while saving window layout.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-bufremove.gif" height="400em"/>

Default `config`:

```lua
{
  -- Whether to set Vim's settings for buffers (allow hidden buffers)
  set_vim_settings = true,
}
```

For more information, read 'mini.bufremove' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [mhinz/vim-sayonara](https://github.com/mhinz/vim-sayonara)
*   [moll/vim-bbye](https://github.com/moll/vim-bbye)

### mini.comment

Fast and familiar per-line code commenting.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-comment.gif" height="400em"/>

Default `config`:

```lua
{
  -- Module mappings. Use `''` (empty string) to disable one.
  mappings = {
    -- Toggle comment (like `gcip` - comment inner paragraph) for both
    -- Normal and Visual modes
    comment = 'gc',

    -- Toggle comment on current line
    comment_line = 'gcc',

    -- Define 'comment' textobject (like `dgc` - delete whole comment block)
    textobject = 'gc',
  },
}
```

For more information, read 'mini.comment' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [tpope/vim-commentary](https://github.com/tpope/vim-commentary)
*   [preservim/nerdcommenter](https://github.com/preservim/nerdcommenter)
*   [b3nj5m1n/kommentary](https://github.com/b3nj5m1n/kommentary)
*   [numToStr/Comment.nvim](https://github.com/numToStr/Comment.nvim)

### mini.completion

Async (with customizable 'debounce' delay) 'two-stage chain completion': first builtin LSP, then configurable fallback. Also has functionality for completion item info and function signature (both in floating window appearing after customizable delay).

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-completion.gif" height="400em"/>

Default `config`:

```lua
{
  -- Delay (debounce type, in ms) between certain Neovim event and action.
  -- This can be used to (virtually) disable certain automatic actions by
  -- setting very high delay time (like 10^7).
  delay = { completion = 100, info = 100, signature = 50 },

  -- Maximum dimensions of floating windows for certain actions. Action
  -- entry should be a table with 'height' and 'width' fields.
  window_dimensions = {
    info = { height = 25, width = 80 },
    signature = { height = 25, width = 80 },
  },

  -- Way of how module does LSP completion
  lsp_completion = {
    -- `source_func` should be one of 'completefunc' or 'omnifunc'.
    source_func = 'completefunc',

    -- `auto_setup` should be boolean indicating if LSP completion is set up
    -- on every `BufEnter` event.
    auto_setup = true,

    -- `process_items` should be a function which takes LSP
    -- 'textDocument/completion' response items and word to complete. Its
    -- output should be a table of the same nature as input items. The most
    -- common use-cases are custom filtering and sorting. You can use
    -- default `process_items` as `MiniCompletion.default_process_items()`.
    process_items = --<function: filters out snippets; sorts by LSP specs>,
  },

  -- Fallback action. It will always be run in Insert mode. To use Neovim's
  -- built-in completion (see `:h ins-completion`), supply its mapping as
  -- string. Example: to use 'whole lines' completion, supply '<C-x><C-l>'.
  fallback_action = --<function: like `<C-n>` completion>,

  -- Module mappings. Use `''` (empty string) to disable one. Some of them
  -- might conflict with system mappings.
  mappings = {
    force_twostep = '<C-Space>', -- Force two-step completion
    force_fallback = '<A-Space>', -- Force fallback completion
  },

  -- Whether to set Vim's settings for better experience (modifies
  -- `shortmess` and `completeopt`)
  set_vim_settings = true,
}
```

For more information, read 'mini.completion' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [hrsh7th/nvim-cmp](https://github.com/hrsh7th/nvim-cmp)
*   [Shougo/ddc.vim](https://github.com/Shougo/ddc.vim)

### mini.cursorword

Automatic highlighting of word under cursor (displayed after customizable delay). Current word under cursor can be highlighted differently.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-cursorword.gif" height="400em"/>

Default `config`:

```lua
{
  -- Delay (in ms) between when cursor moved and when highlighting appeared
  delay = 100,
}
```

For more information, read 'mini.cursorword' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [itchyny/vim-cursorword](https://github.com/itchyny/vim-cursorword)

### mini.doc

Generation of help files from EmmyLua-like annotations. Allows flexible customization of output via hook functions. Used for documenting this plugin.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-doc.gif" height="400em"/>

Default `config`:

```lua
{
  -- Lua string pattern to determine if line has documentation annotation.
  -- First capture group should describe possible section id. Default value
  -- means that annotation line should:
  -- - Start with `---` at first column.
  -- - Any non-whitespace after `---` will be treated as new section id.
  -- - Single whitespace at the start of main text will be ignored.
  annotation_pattern = '^%-%-%-(%S*) ?',

  -- Identifier of block annotation lines until first captured identifier
  default_section_id = '@text',

  -- Hooks to be applied at certain stage of document life cycle. Should
  -- modify its input in place (and not return new one).
  hooks = {
    -- Applied to block before anything else
    block_pre = --<function: infers header sections (tag and/or signature)>,

    -- Applied to section before anything else
    section_pre = --<function: replaces current aliases>,

    -- Applied if section has specified captured id
    sections = {
      ['@alias'] = --<function: registers alias in MiniDoc.current.aliases>,
      ['@class'] = --<function>,
      -- For most typical usage see |MiniDoc.afterlines_to_code|
      ['@eval'] = --<function: evaluates lines; replaces with their return>,
      ['@field'] = --<function>,
      ['@param'] = --<function>,
      ['@private'] = --<function: registers block for removal>,
      ['@return'] = --<function>,
      ['@seealso'] = --<function>,
      ['@signature'] = --<function: formats signature of documented object>,
      ['@tag'] = --<function: turns its line in proper tag lines>,
      ['@text'] = --<function: purposefully does nothing>,
      ['@type'] = --<function>,
      ['@usage'] = --<function>,
    },

    -- Applied to section after all previous steps
    section_post = --<function: currently does nothing>,

    -- Applied to block after all previous steps
    block_post = --<function: does many things>,

    -- Applied to file after all previous steps
    file = --<function: adds separator>,

    -- Applied to doc after all previous steps
    doc = --<function: adds modeline>,
  },

  -- Path (relative to current directory) to script which handles project
  -- specific help file generation (like custom input files, hooks, etc.).
  script_path = 'scripts/minidoc.lua',
}
```

For more information, read 'mini.doc' section of [help file](doc/mini.txt) (which is created with this module).

Plugins with similar functionality:

*   [tjdevries/tree-sitter-lua](https://github.com/tjdevries/tree-sitter-lua)

### mini.fuzzy

Functions for fast and simple fuzzy matching. It has not only functions to perform fuzzy matching of one string to others, but also a sorter for [nvim-telescope/telescope.nvim](https://github.com/nvim-telescope/telescope.nvim).

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-fuzzy.gif" height="400em"/>

Default `config`:

```lua
{
  -- Maximum allowed value of match features (width and first match). All
  -- feature values greater than cutoff can be considered "equally bad".
  cutoff = 100,
}
```

For more information, read 'mini.fuzzy' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [nvim-telescope/telescope-fzy-native.nvim](https://github.com/nvim-telescope/telescope-fzy-native.nvim)

### mini.indentscope

Visualize and operate on indent scope. Supports customization of debounce delay, animation style, and different granularity of options for scope computing algorithm.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-indentscope.gif" height="800em"/>

Default `config`:

```lua
{
  draw = {
    -- Delay (in ms) between event and start of drawing scope indicator
    delay = 100,

    -- Animation rule for scope's first drawing. A function which, given next
    -- and total step numbers, returns wait time (in ms). See
    -- |MiniIndentscope.gen_animation()| for builtin options. To not use
    -- animation, supply `require('mini.indentscope').gen_animation('none')`.
    animation = --<function: implements constant 20ms between steps>,
  },

  -- Module mappings. Use `''` (empty string) to disable one.
  mappings = {
    -- Textobjects
    object_scope = 'ii',
    object_scope_with_border = 'ai',

    -- Motions (jump to respective border line; if not present - body line)
    goto_top = '[i',
    goto_bottom = ']i',
  },

  -- Options which control computation of scope. Buffer local values can be
  -- supplied in buffer variable `vim.b.miniindentscope_options`.
  options = {
    -- Type of scope's border: which line(s) with smaller indent to
    -- categorize as border. Can be one of: 'both', 'top', 'bottom', 'none'.
    border = 'both',

    -- Whether to use cursor column when computing reference indent. Useful to
    -- see incremental scopes with horizontal cursor movements.
    indent_at_cursor = true,

    -- Whether to first check input line to be a border of adjacent scope.
    -- Use it if you want to place cursor on function header to get scope of
    -- its body.
    try_as_border = false,
  },

  -- Which character to use for drawing scope indicator
  symbol = '╎',
}
```

For more information, read 'mini.indentscope' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [lukas-reineke/indent-blankline.nvim](https://github.com/lukas-reineke/indent-blankline.nvim)
*   [michaeljsmith/vim-indent-object](https://github.com/michaeljsmith/vim-indent-object)

### mini.jump

Minimal and fast module for smarter jumping to a single character. Initial idea and implementation by [Adam Blažek](https://github.com/xigoi).

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-jump.gif" height="400em"/>

Default `config`:

```lua
{
  -- Module mappings. Use `''` (empty string) to disable one.
  mappings = {
    forward = 'f',
    backward = 'F',
    forward_till = 't',
    backward_till = 'T',
    repeat_jump = ';',
  },

  -- Delay values (in ms) for different functionalities. Set any of them to
  -- a very big number (like 10^7) to virtually disable.
  delay = {
    -- Delay between jump and highlighting all possible jumps
    highlight = 250,

    -- Delay between jump and automatic stop if idle (no jump is done)
    idle_stop = 1000000,
  },

  -- DEPRECATION NOTICE: `highlight_delay` is now deprecated, please use
  -- `delay.highlight` instead
}
```

For more information, read 'mini.jump' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [rhysd/clever-f.vim](https://github.com/rhysd/clever-f.vim)
*   [justinmk/vim-sneak](https://github.com/justinmk/vim-sneak)
*   [phaazon/hop.nvim](https://github.com/phaazon/hop.nvim)
*   [ggandor/lightspeed.nvim](https://github.com/ggandor/lightspeed.nvim)

### mini.misc

Collection of miscellaneous useful functions. Like `put()` and `put_text()` which print Lua objects to command line and current buffer respectively.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-misc.gif" height="400em"/>

Default `config`:

```lua
{
  -- Array of fields to make global (to be used as independent variables)
  make_global = { 'put', 'put_text' },
}
```

For more information, read 'mini.misc' section of [help file](doc/mini.txt).

### mini.pairs

Autopairs plugin which has minimal defaults and functionality to do per-key expression mappings.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-pairs.gif" height="400em"/>

Default `config`:

```lua
{
  -- In which modes mappings from this `config` should be created
  modes = { insert = true, command = false, terminal = false },

  -- Global mappings. Each right hand side should be a pair information, a
  -- table with at least these fields (see more in |MiniPairs.map|):
  -- - <action> - one of 'open', 'close', 'closeopen'.
  -- - <pair> - two character string for pair to be used.
  -- By default pair is not inserted after `\`, quotes are not recognized by
  -- `<CR>`, `'` does not insert pair after a letter.
  -- Only parts of tables can be tweaked (others will use these defaults).
  mappings = {
    ['('] = { action = 'open', pair = '()', neigh_pattern = '[^\\].' },
    ['['] = { action = 'open', pair = '[]', neigh_pattern = '[^\\].' },
    ['{'] = { action = 'open', pair = '{}', neigh_pattern = '[^\\].' },

    [')'] = { action = 'close', pair = '()', neigh_pattern = '[^\\].' },
    [']'] = { action = 'close', pair = '[]', neigh_pattern = '[^\\].' },
    ['}'] = { action = 'close', pair = '{}', neigh_pattern = '[^\\].' },

    ['"'] = { action = 'closeopen', pair = '""', neigh_pattern = '[^\\].', register = { cr = false } },
    ["'"] = { action = 'closeopen', pair = "''", neigh_pattern = '[^%a\\].', register = { cr = false } },
    ['`'] = { action = 'closeopen', pair = '``', neigh_pattern = '[^\\].', register = { cr = false } },
  },
}
```

For more information, read 'mini.pairs' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [jiangmiao/auto-pairs](https://github.com/jiangmiao/auto-pairs)
*   [windwp/nvim-autopairs](https://github.com/windwp/nvim-autopairs)

### mini.sessions

Session management (read, write, delete) which works using |mksession|. It was heavily inspired by 'vim-startify' and should work out of the box with sessions created by it. Works with global (from configured directory) and local (from current directory) sessions.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-sessions.gif" height="400em"/>

Default `config`:

```lua
{
  -- Whether to read latest session if Neovim opened without file arguments
  autoread = false,

  -- Whether to write current session before quitting Neovim
  autowrite = true,

  -- Directory where global sessions are stored (use `''` to disable)
  directory = --<"session" subdir of user data directory from |stdpath()|>,

  -- File for local session (use `''` to disable)
  file = 'Session.vim',

  -- Whether to force possibly harmful actions (meaning depends on function)
  force = { read = false, write = true, delete = false },

  -- Whether to print session path after action
  verbose = { read = false, write = true, delete = true },
}
```

For more information, read 'mini.sessions' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [mhinz/vim-startify](https://github.com/mhinz/vim-startify)
*   [Shatur/neovim-session-manager](https://github.com/Shatur/neovim-session-manager)

### mini.starter

Minimal, fast, and flexible start screen. Displayed items are fully customizable both in terms of what they do and how they look (with reasonable defaults). Item selection can be done using prefix query with instant visual feedback.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-starter.gif" height="400em"/>

Default `config`:

```lua
{
  -- Whether to open starter buffer on VimEnter. Not opened if Neovim was
  -- started with intent to show something else.
  autoopen = true,

  -- Whether to evaluate action of single active item
  evaluate_single = false,

  -- Items to be displayed. Should be an array with the following elements:
  -- - Item: table with <action>, <name>, and <section> keys.
  -- - Function: should return one of these three categories.
  -- - Array: elements of these three types (i.e. item, array, function).
  -- If `nil` (default), default items will be used (see |mini.starter|).
  items = nil,

  -- Header to be displayed before items. Should be a string or function
  -- evaluating to single string (use `\n` for new lines).
  -- If `nil` (default), polite greeting will be used.
  header = nil,

  -- Footer to be displayed after items. Should be a string or function
  -- evaluating to string. If `nil`, default usage help will be shown.
  footer = nil,

  -- Array  of functions to be applied consecutively to initial content.
  -- Each function should take and return content for 'Starter' buffer (see
  -- |mini.starter| for more details).
  content_hooks = nil,

  -- Characters to update query. Each character will have special buffer
  -- mapping overriding your global ones. Be careful to not add `:` as it
  -- allows you to go into command mode.
  query_updaters = [[abcdefghijklmnopqrstuvwxyz0123456789_-.]],
}
```

For more information, read 'mini.starter' section of [help file](doc/mini.txt) (also contains example configurations similar to 'vim-startify' and 'dashboard-nvim'). For its benchmarks alongside plugins with similar functionality, see [benchmarks/starter/startup-summary.md](benchmarks/starter/startup-summary.md) (more details [here](benchmarks/starter/README.md)).

Plugins with similar functionality:

*   [mhinz/vim-startify](https://github.com/mhinz/vim-startify)
*   [glepnir/dashboard-nvim](https://github.com/glepnir/dashboard-nvim)
*   [goolord/alpha-nvim](https://github.com/goolord/alpha-nvim)

### mini.statusline

Minimal and fast statusline. Has ability to use custom content supplied with concise function (using module's provided section functions) along with builtin default. For full experience needs [Nerd font](https://www.nerdfonts.com/), [lewis6991/gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim) plugin, and [kyazdani42/nvim-web-devicons](https://github.com/kyazdani42/nvim-web-devicons) plugin (but works without any them).

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-statusline.gif" height="400em"/>

Default `config`:

```lua
{
  -- Content of statusline as functions which return statusline string. See
  -- `:h statusline` and code of default contents (used instead of `nil`).
  content = {
    -- Content for active window
    active = nil,
    -- Content for inactive window(s)
    inactive = nil,
  },

  -- Whether to set Vim's settings for statusline (make it always shown with
  -- 'laststatus' set to 2). To use global statusline in Neovim>=0.7.0, set
  -- this to `false` and 'laststatus' to 3.
  set_vim_settings = true,
}
```

For more information, read 'mini.statusline' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [hoob3rt/lualine.nvim](https://github.com/hoob3rt/lualine.nvim)
*   [NTBBloodbath/galaxyline.nvim](https://github.com/NTBBloodbath/galaxyline.nvim)
*   [famiu/feline.nvim](https://github.com/famiu/feline.nvim)

### mini.surround

Fast surround plugin. Add, delete, replace, find, highlight surrounding (like pair of parenthesis, quotes, etc.). Has special "function call", "tag", and "interactive" surroundings. Supports dot-repeatability, textobject, motions.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-surround.gif" height="400em"/>

Default `config`:

```lua
{
  -- Number of lines within which surrounding is searched
  n_lines = 20,

  -- Duration (in ms) of highlight when calling `MiniSurround.highlight()`
  highlight_duration = 500,

  -- Pattern to match function name in 'function call' surrounding
  -- By default it is a string of letters, '_' or '.'
  funname_pattern = '[%w_%.]+',

  -- Module mappings. Use `''` (empty string) to disable one.
  mappings = {
    add = 'sa', -- Add surrounding
    delete = 'sd', -- Delete surrounding
    find = 'sf', -- Find surrounding (to the right)
    find_left = 'sF', -- Find surrounding (to the left)
    highlight = 'sh', -- Highlight surrounding
    replace = 'sr', -- Replace surrounding
    update_n_lines = 'sn', -- Update `n_lines`
  },
}
```

For more information, read 'mini.surround' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [tpope/vim-surround](https://github.com/tpope/vim-surround)
*   [machakann/vim-sandwich](https://github.com/machakann/vim-sandwich)

### mini.tabline

Minimal tabline which shows listed (see `:h buflisted`) buffers in case of one tab and falls back to default otherwise. For full experience needs [kyazdani42/nvim-web-devicons](https://github.com/kyazdani42/nvim-web-devicons).

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-tabline.gif" height="400em"/>

Default `config`:

```lua
{
  -- Whether to show file icons (requires 'kyazdani42/nvim-web-devicons')
  show_icons = true,

  -- Whether to set Vim's settings for tabline (make it always shown and
  -- allow hidden buffers)
  set_vim_settings = true,
}
```

For more information, read 'mini.tabline' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [akinsho/bufferline.nvim](https://github.com/akinsho/bufferline.nvim)
*   [ap/vim-buftabline](https://github.com/ap/vim-buftabline)

### mini.trailspace

Automatic highlighting of trailing whitespace with functionality to remove it.

<img src="https://github.com/echasnovski/media/blob/main/mini.nvim/demo-trailspace.gif" height="400em"/>

Default `config`:

```lua
{
  -- Highlight only in normal buffers (ones with empty 'buftype'). This is
  -- useful to not show trailing whitespace where it usually doesn't matter.
  only_in_normal_buffers = true,
}
```

For more information, read 'mini.trailspace' section of [help file](doc/mini.txt).

Plugins with similar functionality:

*   [ntpeters/vim-better-whitespace](https://github.com/ntpeters/vim-better-whitespace)

## Planned modules

This is the list of modules I currently intend to implement eventually (as my free time and dedication will allow):

*   'mini.align' - fast text alignment. Something like [tommcdo/vim-lion](https://github.com/tommcdo/vim-lion).
*   'mini.terminal' (or 'mini.repl') - coherently manage terminal windows and send text from buffers to terminal windows. Something like [kassio/neoterm](https://github.com/kassio/neoterm).
*   'mini.exchange' (or 'mini.swap') - exchange two regions of text. Something like [tommcdo/vim-exchange](https://github.com/tommcdo/vim-exchange).
*   'mini.arguments' - work with listed arguments. Something like [FooSoft/vim-argwrap](https://github.com/FooSoft/vim-argwrap) and [AndrewRadev/sideways.vim](https://github.com/AndrewRadev/sideways.vim).
*   'mini.tree' - file tree explorer. Truncated version of [kyazdani42/nvim-tree](https://github.com/kyazdani42/nvim-tree.lua).
