# Shellbound — The Beacon Beyond

An original terminal adventure about restoring a forgotten coastal beacon. Directories are places, files hold clues and conversations, and Linux commands are the tools that change the world.

Inspired by the learning-through-exploration approach of [Terminus](https://web.mit.edu/mprat/Public/web/Terminus/Web/main.html). The story, scenery, characters, code, and puzzles are original; this is not an official Terminus expansion.

![Shellbound preview](preview.png)

## Play

Start with `pwd` and `ls`. Walk with `cd PLACE`. Read a character’s file or letter with `less ITEM` and return with `q`.

| Tool | Purpose |
| --- | --- |
| `quest` | Read the active story and objective |
| `hint` | Reveal three progressive hints; the last includes an example |
| `man COMMAND` | Read the simulator’s supported syntax and limits |
| `map` | Show unlocked regions |
| `undo` | Recover the last command, including changed files and progress; 20 steps in the current tab |
| Tab | Complete commands or paths |
| Up / Down | Recall command history |
| Ctrl+C in password practice | Cancel the fictional password prompt |

Progress and the virtual filesystem save to this browser’s localStorage. Password practice values are discarded and never included in saves or history. Do not use real passwords. New expedition resets the saved game after confirmation. Undo history is memory-only and starts fresh after a reload.

## Fifty-command curriculum

The campaign covers all fifty entries from the user-selected [command list](https://puttygen.com/linux-commands), reorganized into a learning sequence. The article’s “Cron” entry is taught through `crontab`, which manages the user’s schedule. Commands use their actual lowercase spellings. `rm`, `touch`, and `clear` are additional practice tools.

| Region | Commands |
| --- | --- |
| Haven | pwd, ls, cd, less, man |
| Archive | cat, head, tail, grep, find |
| Workshop | mkdir, cp, mv, echo, diff |
| Watchtower | whoami, groups, finger, uname, history |
| Vault | chmod, chown, sudo, passwd, alias |
| Engine Room | ps, top, kill, free, df |
| Harbor | ifup, ping, traceroute, netstat, curl |
| Relay | ssh, rsync, screen, exit, crontab |
| Foundry | tar, gzip, locate, cpio, rpm |
| Observatory | declare, enable, awk, exec, shutdown |

Each objective requires using its target command successfully and achieving the intended outcome. Supported equivalent paths/options work; the game does not compare an entire submitted command to a secret answer string. Earlier tools stay available for later exploration.

## Run locally

Requires Node.js 22+. No npm dependencies or build step.

```bash
cd shellbound
npm start
```

Open **http://127.0.0.1:4180**. Serve the files rather than opening HTML directly, because JavaScript modules need an HTTP origin. Any static host can serve the contents of `dist/`.

```bash
npm test
```

The tests include a complete fifty-mission playthrough, quoted input/variables, pipes/redirection, copy/move behavior, scoped sudo, permissions, progression gates, undo, save/restore, and virtual archives. Browser checks cover the complete campaign, pager, hints, history, completion, password masking, save/reload, restart/cancel, injected text rendering, command-book search, and phone layout.

## Source guide

| File | Role |
| --- | --- |
| `dist/world.js` | Original regions, story, missions, hints, outcome predicates, seeded filesystem |
| `dist/engine.js` | Pure game engine, lexer, virtual command implementations, save validation |
| `dist/app.js` | Terminal transcript, prompt, history/completion, dialogs, scenes, persistence |
| `dist/style.css` | Terminal design, responsive layout, scenery presentation |
| `tests/engine.test.js` | Regression tests and complete campaign verification |
| `server.js` | Local server with an explicit file allowlist |

## It is a simulation

This is not Bash, Linux, a virtual machine, or an unrestricted terminal. Nothing is executed on the host. Networking, accounts, schedules, package queries, and shutdown are fictional. Archive formats are JavaScript metadata, not genuine tar/gzip/cpio bytes. The underlying browser storage is inspectable; do not treat game permissions or progression as a security boundary.

- Quoting, simple variables, pipes, and `>`, `>>`, `<` are supported.
- Command substitution, background jobs, job control, shell glob expansion, and chained commands are not implemented.
- Permission checks are deliberately partial; there is no complete POSIX directory-traversal or group-membership permission implementation.
- `less` opens a real game pager. `top` is a snapshot. `screen` records a named virtual session but does not create a second running terminal. `exec` illustrates replacement of a child shell while retaining the parent game shell.
- Networking uses only the fictional relay. `curl` cannot fetch arbitrary websites. `ssh` does not perform actual authentication or encryption.
- `finger`, `netstat`, and `ifup` are legacy/optional or distribution-specific. `rpm` is an RPM-family package manager. These are not universal Linux defaults.
- Every command’s in-game manual describes its supported subset. Consult real system documentation when moving to a Linux terminal.

Reference for real shell behavior: [GNU Bash manual](https://www.gnu.org/software/bash/manual/). The command list determines curriculum coverage, not the correctness of every claim in that article. Descriptions and lessons here are newly written.

## Privacy and assets

The game uses no analytics and has no backend. Typefaces load from Google Fonts when available, with local fallbacks. Scenery is original inline SVG. There are no copied Terminus assets, source files, characters, or story passages.
