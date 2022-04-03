---
name: mrjones2014/lighthaus.nvim
slug: mrjones2014-lighthaus-nvim
category: Colorschemes
created: 'Apr 01, 2022 2:06'
description: A Lua implementation of lighthaus-theme/vim-lighthaus
url: 'https://github.com/mrjones2014/lighthaus.nvim'
stars: 40
topics:
  - hacktoberfest
  - lighthaus
  - lighthaus-theme
  - lsp
  - lua
  - neovim
  - neovim-plugin
  - neovim-theme
  - nvim
  - nvim-cmp
updated_at: '2022-03-10T14:40:22Z'
---
# lighthaus.nvim

A Lua implementation of [lighthaus-theme/vim-lighthaus](https://github.com/lighthaus-theme/vim-lighthaus), with added built-in LSP support!

Default (`:colorscheme lighthaus`):

![normal](./assets/default.png)

Dark (`:colorscheme lighthaus_dark`):

![dark](./assets/dark.png)

## Config

Lighthaus.nvim requires `termguicolors`.

`init.lua`:

```lua
vim.opt.termguicolors = true
```

`.vimrc`/`init.vim`:

```VimL
set termguicolors
```

You can override colors using the Lua API. Calling `setup()` will load the colorscheme, so you can omit `:colorscheme lighthaus` from
your config when using the Lua API.

```lua
require('lighthaus').setup({
  -- set true to use dark bg by default
  bg_dark = false,
  -- see colors.lua to see colors table, set overrides here to be merged with defaults
  colors = {},
  -- set to 'underline' to replace undercurl with underline
  -- or empty string '' to disable
  lsp_underline_style = 'undercurl',
  -- make background transparent, this overrides `bg_dark`
  transparent = false,
  -- use an italic font for comments
  italic_comments = false,
  -- use an italic font for keywords/conditionals
  italic_keywords = false,
})
```

### Making Undercurls Work in Tmux

To have undercurls appear properly and in color, add the following to your `tmux` config file:

```tmux
set -g default-terminal "${TERM}"
set -as terminal-overrides ',*:Smulx=\E[4::%p1%dm'  # undercurl support
set -as terminal-overrides ',*:Setulc=\E[58::2::%p1%{65536}%/%d::%p1%{256}%/%{255}%&%d::%p1%{255}%&%d%;m'  # underscore colours - needs tmux-3.0
```

## Plugin Support

*   [Telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)
*   [bufferline.nvim](https://github.com/akinsho/bufferline.nvim)
*   [lualine](https://github.com/nvim-lualine/lualine.nvim)
*   [neo-tree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim)
*   [nvim-tree](https://github.com/kyazdani42/nvim-tree.lua)
*   [gitsigns](https://github.com/lewis6991/gitsigns.nvim)
*   [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
*   [nvim-cmp](https://github.com/hrsh7th/nvim-cmp)
*   [lsp\_extensions Rust inlay hints](https://github.com/nvim-lua/lsp_extensions.nvim#inlay-hints-rust-analyzer)\*
*   [ale](https://github.com/dense-analysis/ale)
*   [beacon](https://github.com/DanilaMihailov/beacon.nvim)
*   [coc](https://github.com/neoclide/coc.nvim)
*   [fzf](https://github.com/junegunn/fzf)
*   [NERDTree](https://github.com/preservim/nerdtree)
*   [vim-fugitive](https://github.com/tpope/vim-fugitive)
*   [vim-gitgutter](https://github.com/airblade/vim-gitgutter)
*   [vim-indent-guides](https://github.com/nathanaelkane/vim-indent-guides)
*   [vim-plug](https://github.com/junegunn/vim-plug)
*   [vim-signature](https://github.com/kshenoy/vim-signature)
*   [vim-signify](https://github.com/mhinz/vim-signify)
*   [vim-startify](https://github.com/mhinz/vim-startify)
*   [vimtex](https://github.com/lervag/vimtex)
*   [vimwiki](https://github.com/vimwiki/vimwiki)

Plus Neovim's built-in LSP. Feel free to create a PR to support other plugins not listed here.

\* `lighthaus.nvim` adds a highlight group `RustInlayHint` that can be used for the Rust inlay hints added by `lsp_extensions`.
You need to specify the highlight group to use in `lsp_extensions` config. Example:

```lua
require('lsp_extensions').inlay_hints({
  highlight = 'RustInlayHint',
  enabled = { 'TypeHint', 'ChainingHint', 'ParameterHint' },
})
```

### Using Lualine Themes

There are two Lualine themes, 'lighthaus', and 'lighthaus\_dark'. Use the one that corresponds to your
selected Lighthaus theme.

Setup:

```lua
require('lualine').setup({
  options = {
    -- your other options here
    theme = 'lighthaus', -- or theme = 'lighthaus_dark'
  },
  -- your other lualine config here
})
```

## Terminal Themes

*   [Kitty](./extra/kitty/lighthaus-theme.conf)
*   [Alacritty](./extra/alacritty/lighthaus-theme.yml)

## Notes
