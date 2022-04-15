---
name: lukas-reineke/lsp-format.nvim
slug: lukas-reineke-lsp-format-nvim
category: Formatting
created: 'Apr 15, 2022 2:56'
description: A wrapper around Neovims native LSP formatting.
url: 'https://github.com/lukas-reineke/lsp-format.nvim'
stars: 248
topics:
  - formatting
  - neovim
  - neovim-plugin
  - vim
  - vim-plugin
updated_at: '2022-04-14T04:14:19Z'
---
# LSP-format.nvim

LSP-format.nvim is a wrapper around Neovims native LSP formatting.

It does

1.  Asynchronously formatting on save
2.  Sequentially formatting with all attached LSP server
3.  Add commands for disabling formatting (globally or per filetype)
4.  Makes it easier to send format options to the LSP

It does not

1.  *Provide any formatting by itself.* You still need to use an LSP server

## Install

Use your favourite plugin manager to install.

#### Example with Packer

[wbthomason/packer.nvim](https://github.com/wbthomason/packer.nvim)

```lua
-- init.lua
require("packer").startup(
    function()
        use "lukas-reineke/lsp-format.nvim"
    end
)
```

#### Example with Plug

[junegunn/vim-plug](https://github.com/junegunn/vim-plug)

```vim
" init.vim
call plug#begin('~/.vim/plugged')
Plug 'lukas-reineke/lsp-format.nvim'
call plug#end()
```

## Setup

To use LSP-format, you have to run the setup function, and pass the `on_attach` function to each LSP that should use it.

```lua
require("lsp-format").setup {}
require "lspconfig".gopls.setup { on_attach = require "lsp-format".on_attach }
```

or

```lua
require("lsp-format").setup {}

local on_attach = function(client)
    require "lsp-format".on_attach(client)

    -- ... custom code ...
end
require "lspconfig".gopls.setup { on_attach = on_attach }
```

That's it, saving a buffer will format it now.

## Notes

#### Make sure you remove any old format on save code

You don't want to run formatting twice. If you had setup formatting on save before, remove it.\
You can check if something is listening on buffer write events with `:autocmd BufWritePre` and `:autocmd BufWritePost`

#### `:wq` will not format

Because formatting is async now, you can't save and quit in the same command. The formatting results will not get back
in time and Neovim will close without applying the changes.\
In this case you need to use `vim.lsp.buf.formatting_seq_sync()`

Add this abbreviation into your dotfiles to do the right thing when doing `:wq`

```lua
vim.cmd [[cabbrev wq execute "lua vim.lsp.buf.formatting_seq_sync()" <bar> wq]]
```

#### `order` format option

`order` is a special format option that determines the order formatting is requested from the LSP server.

## FAQ

### How is it different to `autocmd BufWritePre <buffer> lua vim.lsp.buf.formatting_sync()`?

The main difference is that LSP-format.nvim is async. It will format on save, *without blocking the editor*.\
And it adds some convenience with disable commands and format options.\
But the end result is the same.

### How do I use format options?

You can pass the format options into the `setup` function, or as arguments to the `:Format` command.\
How the format options look like depends on the LSP server you are using.

As an example, [mattn/efm-langserver](https://github.com/mattn/efm-langserver) uses `${}` template syntax with which you can
define your own options `${--flag:lua_variable_name}`.

```lua
require "lsp-format".setup {
    typescript = { tab_width = 4 },
    yaml = { tab_width = 2 },
}
local prettier = {
    formatCommand = [[prettier --stdin-filepath ${INPUT} ${--tab-width:tab_width}]],
    formatStdin = true,
}
require "lspconfig".efm.setup {
    on_attach = require "lsp-format".on_attach,
    init_options = { documentFormatting = true },
    settings = {
        languages = {
            typescript = { prettier },
            yaml = { prettier },
        },
    },
}
```

Now Typescript gets formatted with 4 and YAML with 2 spaces by default.\
And you can run `:Format tab_width=8` to overwrite the setting and format with 8 spaces.

### How do I exclude an LSP server from formatting?

To exclude a server, you have to set the clients `resolved_capabilities.document_formatting` to false.\
Do this in the attach function, before you call `require "lsp-format".on_attach(client)`

```lua
local on_attach = function(client)
    client.resolved_capabilities.document_formatting = false
    require "lsp-format".on_attach(client)
end
require "lspconfig".gopls.setup { on_attach = on_attach }
```
