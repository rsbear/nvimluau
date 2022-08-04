---
name: zegervdv/settle.nvim
slug: zegervdv-settle-nvim
category: Git
created: 'Aug 04, 2022 6:55'
description: Settle your merge conflicts from Neovim
url: 'https://github.com/zegervdv/settle.nvim'
stars: 0
topics:
  - merge-conflicts
  - neovim
  - neovim-lua-plugin
  - neovim-plugin
updated_at: '2022-08-04T17:27:37Z'
---
# Settle.nvim

A Neovim plugin to help you settle your merge conflicts.

**requires Neovim 0.7.0 or later**

Inspired by [splice.vim](https://github.com/sjl/splice.vim/).

## Configuration

Using packer, install and configure the options (leave option out to use default value shown in example)

```lua
use {
  'zegervdv/settle.nvim',
  opt = true,
  cmd = { 'SettleInit' },
  config = function()
    require('settle').setup {
      wrap = true,
      symbol = '!',
      keymaps = {
        next_conflict = '-n',
        prev_conflict = '-N',
        use_ours = '-u1',
        use_theirs = '-u2',
        close = '-q',
      },
    }
  end,
}
```

### Git

In `~/.gitconfig`:

```gitconfig
[merge]
  tool = settle
[mergetool "settle"]
  cmd = "nvim -f $BASE $LOCAL $REMOTE $MERGED -c 'SettleInit'"
  trustExitCode = true
```

### Mercurial

In `~/.hgrc`:

```conf
[merge-tools]
settle.executable = nvim
settle.args = -f $base $local $other $output -c 'SettleInit'
settle.premerge = keep
settle.priority = 1
```
