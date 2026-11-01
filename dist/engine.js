import { regions, missions, seedWorld } from "./world.js";

export const syntax = {
  pwd: ["pwd", "Print the current working directory."],
  ls: [
    "ls [-a] [-l] [PATH]",
    "List directory entries. -a includes dotfiles; -l shows permissions and ownership.",
  ],
  cd: [
    "cd [DIRECTORY]",
    "Change directory. .. means parent, / starts an absolute path, ~ is your game home.",
  ],
  less: [
    "less FILE",
    "Read a file in a pager. In this game use arrows/Space and q to close.",
  ],
  man: [
    "man COMMAND",
    "Read the supported syntax for a command. This is a teaching subset, not a complete Linux manual.",
  ],
  cat: [
    "cat [-n] FILE...",
    "Concatenate files to standard output. -n numbers output lines.",
  ],
  head: [
    "head [-n COUNT] [FILE]",
    "Print the first lines, default 10. Reads piped input if no file.",
  ],
  tail: [
    "tail [-n COUNT] [FILE]",
    "Print the last lines, default 10. Continuous -f is not modeled.",
  ],
  grep: [
    "grep [-i] [-n] [-v] PATTERN [FILE]",
    "Print lines matching a regular expression. -i ignores case, -n numbers, -v inverts.",
  ],
  find: [
    "find [PATH] [-name PATTERN] [-type f|d]",
    'Walk the game filesystem. Quote wildcard patterns, for example find . -name "*.txt".',
  ],
  mkdir: [
    "mkdir [-p] DIRECTORY...",
    "Create directories. -p also creates missing parents.",
  ],
  cp: [
    "cp [-r] SOURCE DESTINATION",
    "Copy a file or, with -r, a directory. The original remains.",
  ],
  mv: ["mv SOURCE DESTINATION", "Move or rename a file/directory."],
  echo: [
    "echo [-n] TEXT...",
    "Write text. Shell > replaces a file, >> appends.",
  ],
  diff: [
    "diff FILE1 FILE2",
    "Compare files. A difference has status 1; that is not an execution error. This subset shows differing complete lines.",
  ],
  whoami: ["whoami", "Print your effective user name."],
  groups: ["groups [traveler]", "List modeled group memberships."],
  finger: [
    "finger USER",
    "Show a fictional account record. Legacy/optional utility on real Linux.",
  ],
  uname: ["uname [-a]", "Show simulated kernel/system information."],
  history: [
    "history",
    "List entered command lines. Password responses are never recorded.",
  ],
  chmod: [
    "chmod MODE FILE",
    "Set permissions. Supports octal modes (640) and owner execute changes (u+x, u-x). File deletion depends on parent-directory permissions, not file write permission.",
  ],
  chown: [
    "sudo chown USER[:GROUP] FILE",
    "Change ownership; requires root in this model.",
  ],
  sudo: [
    "sudo COMMAND...",
    "Run one command as simulated root. No real privileges, password caching, or external execution.",
  ],
  passwd: [
    "passwd",
    "Practice two hidden fictional password prompts. Values are discarded, not persisted. Do not use a real password.",
  ],
  alias: [
    'alias [NAME="COMMAND"]',
    "Define a single command alias, or list aliases. No command substitution is supported.",
  ],
  ps: ["ps [aux]", "Show a simulated process snapshot."],
  top: [
    "top",
    "Show a single simulated CPU/memory snapshot; real top normally refreshes interactively.",
  ],
  kill: [
    "kill [-TERM|-15|-KILL|-9] PID",
    "Send a modeled signal. Default TERM asks a process to terminate; KILL forces termination.",
  ],
  free: ["free [-h]", "Report simulated memory capacity and available memory."],
  df: ["df [-h]", "Report simulated mounted filesystem space, not RAM."],
  ifup: [
    "sudo ifup eth0",
    "Bring the fictional interface up. Legacy/distribution-specific; not universally installed.",
  ],
  ping: [
    "ping [-c COUNT] relay.local",
    "Send a finite number (1–10) of simulated ICMP probes; default 4 here.",
  ],
  traceroute: [
    "traceroute relay.local",
    "Display modeled network hops; no packets are sent.",
  ],
  netstat: [
    "netstat [-ltn]",
    "Display modeled listening TCP sockets. Legacy; ss is common on modern Linux.",
  ],
  curl: [
    "curl [-s] [-o FILE] https://relay.local/chart",
    "Retrieve the one fictional HTTPS resource. -o saves it. Other URLs are unavailable, and no network call is made.",
  ],
  ssh: [
    "ssh operator@relay.local",
    "Enter the modeled relay shell; exit returns locally. No authentication or encryption is actually performed.",
  ],
  rsync: [
    "rsync -a SOURCE/ DESTINATION/",
    "Copy/synchronize local virtual directory contents; trailing source slash copies contents. Real rsync supports many more options and remote paths.",
  ],
  screen: [
    "screen -S NAME | screen -ls",
    "Record a virtual named session. This subset does not emulate detachment or a second running terminal.",
  ],
  exit: [
    "exit",
    "Leave the modeled SSH shell. Locally, ends the virtual shell session until resume.",
  ],
  crontab: [
    "crontab FILE | crontab -l",
    "Install or list a virtual five-field user schedule. No jobs execute. cron is the scheduler, not the schedule-editing command.",
  ],
  tar: [
    "tar -cf ARCHIVE DIRECTORY | tar -tf ARCHIVE | tar -xf ARCHIVE",
    "Create, list, or extract a virtual archive. No real tar bytes are generated.",
  ],
  gzip: [
    "gzip [-k|-d] FILE",
    "Compress (replace input by default), keep original with -k, or decompress with -d. Virtual format only.",
  ],
  locate: [
    "locate PATTERN",
    "Search a prebuilt name database. It is intentionally not refreshed when you create files.",
  ],
  cpio: [
    "cpio -o | cpio -it | cpio -id",
    "Read newline-delimited filenames from standard input to create a virtual archive. List/extract with input redirection. Virtual format only.",
  ],
  rpm: [
    "rpm -q PACKAGE | rpm -qa",
    "Query the modeled RPM package database. Installing packages is not simulated.",
  ],
  declare: [
    "declare [NAME=VALUE]",
    'Set or list a simple Bash-style variable. Read it with echo "$NAME". Arrays and type flags are not modeled.',
  ],
  enable: [
    "enable [-n] [echo]",
    "Enable/disable the echo builtin in the training shell. Does not start a system service.",
  ],
  awk: [
    "awk '{print $N}' [FILE]",
    "Print a whitespace-delimited field from each line. This is a small subset, not a full AWK interpreter. Single quotes keep the shell from interpreting the program.",
  ],
  exec: [
    "exec COMMAND...",
    "Model replacement of a training child shell by a command. Afterward the parent game shell remains available. A real exec replaces the invoking shell process.",
  ],
  shutdown: [
    "sudo shutdown -h +MINUTES | sudo shutdown -c",
    "Schedule or cancel a fictional halt. No timer affects your browser or computer.",
  ],
  rm: [
    "rm [-r] FILE",
    "Remove virtual entries. -r removes a directory tree. Protected world roots cannot be deleted.",
  ],
  touch: [
    "touch FILE",
    "Create an empty file (existing contents stay intact).",
  ],
  clear: ["clear", "Clear the visible transcript; progress stays."],
  help: ["help", "Show game and shell tools."],
  quest: ["quest", "Show the active story and objective."],
  hint: ["hint", "Reveal progressive help; the third hint shows an example."],
  map: ["map", "Show regions, progression and paths."],
  resume: ["resume", "Reopen the local virtual shell after exit."],
  undo: [
    "undo",
    "Game-only recovery tool: undo the most recent command, including file/progress changes. Up to 20 steps are kept in this tab, not across reloads.",
  ],
};

// Tokenize quotes, escapes, pipes and redirections without eval or host execution.
export function tokenize(line, variables = {}) {
  const tokens = [];
  let value = "",
    active = false,
    quote = null;
  const flush = () => {
    if (active) {
      tokens.push({ value, op: false });
      value = "";
      active = false;
    }
  };
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "\\" && quote !== "'") {
      if (i + 1 >= line.length) throw Error("Trailing escape.");
      value += line[++i];
      active = true;
      continue;
    }
    if (c === quote) {
      quote = null;
      continue;
    }
    if (!quote && (c === '"' || c === "'")) {
      quote = c;
      active = true;
      continue;
    }
    if (c === "$" && quote !== "'") {
      const match = line.slice(i + 1).match(/^[A-Za-z_]\w*/);
      if (match) {
        value += variables[match[0]] || "";
        i += match[0].length;
        active = true;
        continue;
      }
    }
    if (!quote && /\s/.test(c)) {
      flush();
      continue;
    }
    if (!quote && "|<>;&".includes(c)) {
      if (c === ";" || c === "&")
        throw Error(
          "This teaching shell does not support ;, && or background jobs. Run each command separately.",
        );
      flush();
      let op = c;
      if (c === ">" && line[i + 1] === ">") {
        op += ">";
        i++;
      }
      tokens.push({ value: op, op: true });
      continue;
    }
    value += c;
    active = true;
  }
  if (quote) throw Error("Unclosed quote. Match your single or double quotes.");
  flush();
  return tokens;
}
const lines = (s) => s.replace(/\n$/, "").split("\n");
const wildcard = (s) =>
  new RegExp(
    "^" +
      s
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")
        .replace(/\?/g, ".") +
      "$",
  );

export class Game {
  constructor(saved) {
    this.undoStack = [];
    this.fs = seedWorld();
    this.cwd = "/world/Haven";
    this.mission = 0;
    this.aliases = {};
    this.variables = {};
    this.history = [];
    this.hints = {};
    this.learned = [];
    this.remote = false;
    this.returnPath = "/world/Relay";
    this.networkUp = false;
    this.screens = [];
    this.cron = "";
    this.disabled = [];
    this.passwordChanged = false;
    this.shutdownScheduled = false;
    this.closed = false;
    this.pendingPassword = null;
    this.processes = [
      { pid: 1, cpu: 0, name: "init" },
      { pid: 210, cpu: 2, name: "beacon-agent" },
      { pid: 4242, cpu: 97, name: "runaway" },
    ];
    this.locateIndex = Object.keys(this.fs);
    if (saved) {
      if (
        saved.version !== 1 ||
        !Number.isInteger(saved.mission) ||
        saved.mission < 0 ||
        saved.mission > missions.length ||
        typeof saved.cwd !== "string" ||
        !saved.fs ||
        !saved.fs[saved.cwd]
      )
        throw Error("Invalid saved expedition.");
      for (const [p, n] of Object.entries(saved.fs)) {
        if (
          !p.startsWith("/") ||
          !n ||
          !["file", "dir"].includes(n.type) ||
          typeof n.owner !== "string" ||
          !/^[0-7]{3}$/.test(n.mode) ||
          (n.type === "file" && typeof n.content !== "string")
        )
          throw Error("Invalid saved filesystem.");
      }
      const allowed = [
        "fs",
        "cwd",
        "mission",
        "aliases",
        "variables",
        "history",
        "hints",
        "learned",
        "remote",
        "returnPath",
        "networkUp",
        "screens",
        "cron",
        "disabled",
        "passwordChanged",
        "shutdownScheduled",
        "closed",
        "processes",
      ];
      for (const k of allowed)
        if (saved[k] !== undefined) this[k] = structuredClone(saved[k]);
      if (
        !Array.isArray(this.history) ||
        !Array.isArray(this.learned) ||
        !Array.isArray(this.processes) ||
        !Array.isArray(this.disabled) ||
        !Array.isArray(this.screens) ||
        !this.aliases ||
        !this.variables ||
        !this.hints
      )
        throw Error("Invalid saved state.");
    }
  }
  serialize() {
    const s = { version: 1 };
    for (const k of [
      "fs",
      "cwd",
      "mission",
      "aliases",
      "variables",
      "history",
      "hints",
      "learned",
      "remote",
      "returnPath",
      "networkUp",
      "screens",
      "cron",
      "disabled",
      "passwordChanged",
      "shutdownScheduled",
      "closed",
      "processes",
    ])
      s[k] = structuredClone(this[k]);
    s.history = s.history.slice(-300);
    return s;
  }
  get task() {
    return missions[this.mission];
  }
  get region() {
    return Math.min(9, Math.floor(this.mission / 5));
  }
  resolve(input = ".") {
    if (input === "~") return "/home/traveler";
    if (input.startsWith("~/")) input = "/home/traveler/" + input.slice(2);
    const parts = (
      input.startsWith("/") ? input : this.cwd + "/" + input
    ).split("/");
    const result = [];
    for (const part of parts) {
      if (!part || part === ".") continue;
      if (part === "..") result.pop();
      else result.push(part);
    }
    return "/" + result.join("/");
  }
  guard(path) {
    const r = regions.find(
      (r) => path === r.path || path.startsWith(r.path + "/"),
    );
    if (r && r.index > this.region)
      throw Error(
        `The path to ${r.name} is sealed. Finish the current region first. Use quest.`,
      );
  }
  node(path) {
    this.guard(path);
    const n = this.fs[path];
    if (!n) throw Error(`${path}: No such file or directory`);
    return n;
  }
  access(n, root, bit) {
    if (root) return true;
    const digit = Number(n.mode[n.owner === "traveler" ? 0 : 2]);
    return !!(digit & bit);
  }
  read(path, root = false) {
    const n = this.node(path);
    if (n.type !== "file") throw Error(`${path}: Is a directory`);
    if (!this.access(n, root, 4))
      throw Error(
        `${path}: Permission denied. Inspect ls -l; use sudo only if appropriate.`,
      );
    return n.content;
  }
  write(path, content, root = false, extra = {}) {
    this.guard(path);
    const parent = path.slice(0, path.lastIndexOf("/")) || "/";
    const dir = this.node(parent);
    if (dir.type !== "dir") throw Error("Parent is not a directory");
    if (!this.access(dir, root, 2))
      throw Error("Parent directory: Permission denied");
    if (
      this.fs[path] &&
      (this.fs[path].type !== "file" || !this.access(this.fs[path], root, 2))
    )
      throw Error("Output file: Permission denied");
    this.fs[path] = {
      type: "file",
      content,
      owner: this.fs[path]?.owner || (root ? "root" : "traveler"),
      mode: this.fs[path]?.mode || "644",
      ...extra,
    };
  }
  mkdir(path, parents = false) {
    if (this.fs[path]) {
      if (parents && this.fs[path].type === "dir") return;
      throw Error("File exists");
    }
    this.guard(path);
    const parent = path.slice(0, path.lastIndexOf("/")) || "/";
    if (!this.fs[parent] && parents) this.mkdir(parent, true);
    if (this.node(parent).type !== "dir")
      throw Error("Parent is not a directory");
    this.fs[path] = { type: "dir", owner: "traveler", mode: "755" };
  }
  list(path) {
    return Object.keys(this.fs)
      .filter(
        (p) =>
          p !== path &&
          p.startsWith(path === "/" ? "/" : path + "/") &&
          !p.slice(path === "/" ? 1 : path.length + 1).includes("/"),
      )
      .sort();
  }
  copy(source, dest, recursive = false) {
    const n = this.node(source);
    if (n.type === "dir" && !recursive)
      throw Error("Omitting directory; use -r.");
    if (dest === source || dest.startsWith(source + "/"))
      throw Error("Cannot copy a path into itself.");
    if (this.fs[dest]?.type === "dir") dest += "/" + source.split("/").at(-1);
    const parent = dest.slice(0, dest.lastIndexOf("/")) || "/";
    this.node(parent);
    this.guard(dest);
    if (n.type === "file") {
      this.write(dest, this.read(source), false, structuredClone(n));
      return dest;
    }
    this.fs[dest] = structuredClone(n);
    for (const p of Object.keys(this.fs).filter((p) =>
      p.startsWith(source + "/"),
    ))
      this.fs[dest + p.slice(source.length)] = structuredClone(this.fs[p]);
    return dest;
  }
  quest() {
    if (!this.task)
      return "THE BEACON IS LIT. Your expedition is complete. Explore, consult man, or start a fresh expedition from the menu.";
    return `${regions[this.task.region].name} · ${this.task.title}\n\n${this.task.story}\n\nObjective: ${this.task.goal}`;
  }
  run(line) {
    if (this.pendingPassword) {
      const p = this.pendingPassword;
      if (p.stage === 1) {
        if (line.length < 6)
          return {
            out: "Use at least 6 characters for this fictional practice value.",
            secret: true,
          };
        this.pendingPassword = { stage: 2, value: line };
        return { out: "Retype the fictional practice password:", secret: true };
      }
      this.pendingPassword = null;
      if (line !== p.value)
        return {
          out: "The practice values did not match. Run passwd to try again.",
          secret: false,
        };
      this.passwordChanged = true;
      const result = {
        out: "Practice password changed. Both values were discarded.",
        secret: false,
      };
      this.check([], result);
      return result;
    }
    if (!line.trim()) return { out: "" };
    if (line.length > 4000) return { out: "Command is too long.", error: true };
    if (line.trim() === "undo") {
      if (!this.undoStack.length)
        return {
          out: "Nothing to undo in this tab. Undo history starts fresh after a reload.",
        };
      const previous = this.undoStack.pop(),
        remaining = this.undoStack;
      Object.assign(this, new Game(previous));
      this.undoStack = remaining;
      return {
        out: "The last command was undone. Virtual files and expedition progress were restored. Use quest to see your objective.",
      };
    }
    if (this.closed && line.trim() !== "resume")
      return {
        out: "This local game shell is closed. Type resume to reopen it.",
        error: true,
      };
    this.undoStack.push(this.serialize());
    if (this.undoStack.length > 20) this.undoStack.shift();
    this.history.push(line);
    this.history = this.history.slice(-300);
    const events = [];
    let out = "",
      pager = false,
      status = 0,
      clear = false;
    try {
      const tokens = tokenize(line, this.variables);
      const stages = [[]];
      for (const t of tokens) {
        if (t.op && t.value === "|") {
          if (!stages.at(-1).length) throw Error("Missing command before pipe");
          stages.push([]);
        } else stages.at(-1).push(t);
      }
      let stdin = "";
      for (const stage of stages) {
        if (!stage.length) throw Error("Missing command after pipe");
        let redirect = null;
        const words = [];
        for (let i = 0; i < stage.length; i++) {
          const t = stage[i];
          if (t.op) {
            if (![">", ">>", "<"].includes(t.value))
              throw Error("Unsupported operator");
            const target = stage[++i];
            if (!target || target.op)
              throw Error("Redirection needs a filename");
            if (t.value === "<") stdin = this.read(this.resolve(target.value));
            else {
              if (redirect)
                throw Error(
                  "Only one output redirection per stage is supported",
                );
              redirect = { mode: t.value, path: this.resolve(target.value) };
            }
          } else words.push(t.value);
        }
        if (!words.length) throw Error("Missing command");
        const result = this.execute(words, stdin, events);
        out = result.out || "";
        status = result.status || 0;
        pager = !!result.pager;
        clear = !!result.clear;
        if (redirect) {
          let extra = result.extra || {};
          if (redirect.mode === ">>")
            out = (this.fs[redirect.path]?.content || "") + out;
          this.write(redirect.path, out, false, extra);
          out = "";
        }
        stdin = out;
      }
      const result = {
        out,
        pager,
        status,
        clear,
        secret: !!this.pendingPassword,
      };
      this.check(events, result);
      return result;
    } catch (error) {
      return { out: error.message, error: true, status: 2 };
    }
  }
  check(events, result) {
    const task = this.task;
    if (!task) return;
    const local =
      this.cwd.startsWith(regions[task.region].path) ||
      (task.region === 7 && this.remote);
    const practiced =
      events.some((e) => e.cmd === task.command && e.ok) ||
      (task.command === "passwd" && this.passwordChanged);
    if (local && practiced && task.check(this, events)) {
      this.learned.push(task.command);
      this.mission++;
      result.completed = task;
      result.next = this.task || null;
      if (this.mission === 45 && !this.disabled.includes("echo"))
        this.disabled.push("echo");
      if (!this.task) result.ending = true;
    }
  }
  execute(words, stdin, events, root = false, depth = 0) {
    if (depth > 5) throw Error("Alias/command recursion limit reached");
    let [cmd, ...args] = words;
    if (this.aliases[cmd])
      return this.execute(
        [
          ...tokenize(this.aliases[cmd], this.variables).map((t) => t.value),
          ...args,
        ],
        stdin,
        events,
        root,
        depth + 1,
      );
    if (cmd === "sudo") {
      if (!args.length) throw Error(syntax.sudo[0]);
      const r = this.execute(args, stdin, events, true, depth + 1);
      events.push({ cmd: "sudo", args, root: true, out: r.out, ok: !r.status });
      return r;
    }
    if (this.disabled.includes(cmd))
      throw Error(`${cmd}: builtin disabled. See man enable.`);
    const cwd = this.cwd;
    let out = "",
      pager = false,
      status = 0,
      extra;
    const demand = (count) => {
      if (args.length !== count)
        throw Error(syntax[cmd]?.[0] || "Wrong number of arguments");
    };
    const flags = (allowed) => {
      for (const a of args.filter((a) => a.startsWith("-")))
        if (
          !a
            .slice(1)
            .split("")
            .every((c) => allowed.includes(c))
        )
          throw Error(`Unsupported option ${a}. See man ${cmd}.`);
    };
    const input = (files) =>
      files.length
        ? files.map((f) => this.read(this.resolve(f), root)).join("\n")
        : stdin;
    const needRoot = () => {
      if (!root)
        throw Error(
          "Permission denied: use sudo for this administrative command.",
        );
    };
    switch (cmd) {
      case "pwd":
        demand(0);
        out = this.cwd;
        break;
      case "ls": {
        flags("al");
        const paths = args.filter((a) => !a.startsWith("-"));
        if (paths.length > 1) throw Error(syntax.ls[0]);
        const p = this.resolve(paths[0] || "."),
          n = this.node(p);
        out = (n.type === "dir" ? this.list(p) : [p])
          .filter(
            (x) =>
              args.some((a) => a.includes("a")) ||
              !x.split("/").at(-1).startsWith("."),
          )
          .map((x) => {
            const n = this.fs[x],
              name = x.split("/").at(-1) + (n.type === "dir" ? "/" : "");
            return args.some((a) => a.startsWith("-") && a.includes("l"))
              ? `${n.type === "dir" ? "d" : "-"}${n.mode.split('').map(d => ((Number(d)&4)?'r':'-')+((Number(d)&2)?'w':'-')+((Number(d)&1)?'x':'-')).join('')} ${n.owner.padEnd(10)} ${(n.group || 'travelers').padEnd(10)} ${String(n.content?.length || 0).padStart(5)} ${name}`
              : name;
          })
          .join("\n");
        break;
      }
      case "cd": {
        if (args.length > 1) throw Error(syntax.cd[0]);
        const p = this.resolve(args[0] || "~");
        if (this.node(p).type !== "dir")
          throw Error("Not a directory. Use cat or less to read a file.");
        this.cwd = p;
        const r = regions.find((r) => r.path === p);
        out = r
          ? `${r.title}\n${r.story}\n\n${this.list(p)
              .map(
                (x) =>
                  x.split("/").at(-1) + (this.fs[x].type === "dir" ? "/" : ""),
              )
              .join("  ")}`
          : "";
        break;
      }
      case "cat": {
        flags("n");
        const data = input(args.filter((a) => a !== "-n"));
        out = args.includes("-n")
          ? lines(data)
              .map((l, i) => `${i + 1}\t${l}`)
              .join("\n")
          : data;
        break;
      }
      case "less":
        demand(1);
        out = this.read(this.resolve(args[0]), root);
        pager = true;
        break;
      case "head":
      case "tail": {
        let count = 10;
        const files = [];
        for (let i = 0; i < args.length; i++) {
          if (args[i] === "-n") {
            count = Number(args[++i]);
            if (!Number.isInteger(count) || count < 0 || count > 10000)
              throw Error("Invalid line count");
          } else if (args[i].startsWith("-"))
            throw Error(`Unsupported option. See man ${cmd}`);
          else files.push(args[i]);
        }
        const rows = lines(input(files));
        out = (
          cmd === "head"
            ? rows.slice(0, count)
            : count
              ? rows.slice(-count)
              : []
        ).join("\n");
        break;
      }
      case "grep": {
        flags("inv");
        const positional = args.filter((a) => !a.startsWith("-"));
        if (!positional.length) throw Error(syntax.grep[0]);
        const [pattern, ...files] = positional;
        const options = args.filter((a) => a.startsWith("-")).join("");
        const re = new RegExp(pattern, options.includes("i") ? "i" : "");
        out = lines(input(files))
          .map((line, i) => ({ line, i }))
          .filter((x) => re.test(x.line) !== options.includes("v"))
          .map((x) => (options.includes("n") ? `${x.i + 1}:` : "") + x.line)
          .join("\n");
        status = out ? 0 : 1;
        break;
      }
      case "find": {
        let start = ".",
          name = "*",
          type = null;
        let i = 0;
        if (args[0] && !args[0].startsWith("-")) start = args[i++];
        for (; i < args.length; i++) {
          if (args[i] === "-name") name = args[++i];
          else if (args[i] === "-type") type = args[++i];
          else throw Error(syntax.find[0]);
        }
        if (!name || (type && !["f", "d"].includes(type)))
          throw Error(syntax.find[0]);
        const p = this.resolve(start);
        this.node(p);
        const re = wildcard(name);
        out = Object.keys(this.fs)
          .filter(
            (x) =>
              (x === p || x.startsWith(p + "/")) &&
              re.test(x.split("/").at(-1)) &&
              (!type || this.fs[x].type === (type === "f" ? "file" : "dir")),
          )
          .map((x) =>
            start.startsWith("/")
              ? x
              : (start === "." ? "." : start.replace(/\/$/, "")) +
                x.slice(p.length),
          )
          .join("\n");
        break;
      }
      case "mkdir": {
        flags("p");
        const paths = args.filter((a) => a !== "-p");
        if (!paths.length) throw Error(syntax.mkdir[0]);
        paths.forEach((p) => this.mkdir(this.resolve(p), args.includes("-p")));
        break;
      }
      case "cp":
      case "mv": {
        if (cmd === "cp") flags("r");
        else if (args.some((a) => a.startsWith("-"))) throw Error(syntax.mv[0]);
        const paths = args.filter((a) => a !== "-r");
        if (paths.length !== 2) throw Error(syntax[cmd][0]);
        const s = this.resolve(paths[0]),
          d = this.resolve(paths[1]);
        if (
          cmd === "mv" &&
          [
            "/",
            "/world",
            "/home",
            "/remote",
            ...regions.map((r) => r.path),
          ].includes(s)
        )
          throw Error("World roots are protected.");
        this.copy(s, d, cmd === "mv" || args.includes("-r"));
        if (cmd === "mv")
          for (const p of Object.keys(this.fs))
            if (p === s || p.startsWith(s + "/")) delete this.fs[p];
        break;
      }
      case "echo": {
        if (args.some((a) => a.startsWith("-") && a !== "-n"))
          throw Error(syntax.echo[0]);
        out =
          (args[0] === "-n" ? args.slice(1) : args).join(" ") +
          (args[0] === "-n" ? "" : "\n");
        break;
      }
      case "diff": {
        demand(2);
        const a = lines(this.read(this.resolve(args[0]), root)),
          b = lines(this.read(this.resolve(args[1]), root));
        out =
          a.join("\n") === b.join("\n")
            ? ""
            : a
                .map((l) => "< " + l)
                .concat(b.map((l) => "> " + l))
                .join("\n");
        status = out ? 1 : 0;
        break;
      }
      case "whoami":
        demand(0);
        out = root ? "root" : this.remote ? "operator" : "traveler";
        break;
      case "groups":
        if (args.length > 1 || (args[0] && args[0] !== "traveler"))
          throw Error(syntax.groups[0]);
        out = "traveler : travelers beacon";
        break;
      case "finger":
        demand(1);
        if (!["ada", "traveler", "keeper"].includes(args[0]))
          throw Error("No such fictional account");
        out = `Login: ${args[0]}\nName: ${args[0] === "ada" ? "Ada, engine keeper" : args[0]}\nDirectory: /home/${args[0]}\nShell: /bin/bash\nPlan: Restore the beacon.`;
        break;
      case "uname":
        if (args.length > 1 || (args[0] && args[0] !== "-a"))
          throw Error(syntax.uname[0]);
        out = args[0]
          ? "Linux beacon 6.8.0-game #1 x86_64 GNU/Linux (simulated)"
          : "Linux";
        break;
      case "history":
        demand(0);
        out = this.history
          .map((h, i) => `${String(i + 1).padStart(4)}  ${h}`)
          .join("\n");
        break;
      case "chmod": {
        demand(2);
        const n = this.node(this.resolve(args[1]));
        if (!root && n.owner !== "traveler") throw Error("Not the owner");
        if (/^[0-7]{3}$/.test(args[0])) n.mode = args[0];
        else if (["u+x", "u-x"].includes(args[0]))
          n.mode =
            String(
              args[0] === "u+x"
                ? Number(n.mode[0]) | 1
                : Number(n.mode[0]) & ~1,
            ) + n.mode.slice(1);
        else throw Error("Supported modes: three octal digits, u+x or u-x.");
        break;
      }
      case "chown": {
        needRoot();
        demand(2);
        const [user, group] = args[0].split(":");
        if (!["traveler", "keeper", "root", "operator"].includes(user))
          throw Error("Unknown fictional user");
        const n = this.node(this.resolve(args[1]));
        n.owner = user;
        if (group) n.group = group;
        break;
      }
      case "passwd":
        demand(0);
        this.pendingPassword = { stage: 1 };
        out =
          "Training only — never use a real password.\nNew fictional practice password (at least 6 characters):";
        break;
      case "alias": {
        if (!args.length)
          out = Object.entries(this.aliases)
            .map(([k, v]) => `alias ${k}='${v}'`)
            .join("\n");
        else {
          demand(1);
          const match = args[0].match(/^([A-Za-z_]\w*)=(.+)$/);
          if (!match) throw Error(syntax.alias[0]);
          this.aliases[match[1]] = match[2];
        }
        break;
      }
      case "ps":
        if (args.length > 1 || (args[0] && args[0] !== "aux"))
          throw Error(syntax.ps[0]);
        out =
          "USER       PID %CPU COMMAND\n" +
          this.processes
            .map(
              (p) =>
                `traveler ${String(p.pid).padStart(5)} ${String(p.cpu).padStart(4)} ${p.name}`,
            )
            .join("\n");
        break;
      case "top":
        demand(0);
        out =
          "top — simulated snapshot (not live)\nPID   %CPU  COMMAND\n" +
          [...this.processes]
            .sort((a, b) => b.cpu - a.cpu)
            .map((p) => `${p.pid}  ${p.cpu}  ${p.name}`)
            .join("\n");
        break;
      case "kill": {
        let signal = "TERM",
          pid;
        if (args.length === 2) {
          signal = args[0].replace("-", "");
          pid = Number(args[1]);
        } else {
          demand(1);
          pid = Number(args[0]);
        }
        if (!["TERM", "15", "KILL", "9"].includes(signal))
          throw Error("Supported signals: TERM/15 and KILL/9");
        if (pid === 1) throw Error("The simulation protects init.");
        if (!this.processes.some((p) => p.pid === pid))
          throw Error("No such process");
        this.processes = this.processes.filter((p) => p.pid !== pid);
        out = `Signal ${signal} delivered to ${pid}.`;
        break;
      }
      case "free":
        flags("h");
        out =
          "               total        used        free   available\nMem:            4Gi         1Gi         3Gi         3Gi\nSwap:           1Gi          0B         1Gi\n(simulated values)";
        break;
      case "df":
        flags("h");
        out =
          "Filesystem      Size  Used Avail Use% Mounted on\n/dev/game        20G    8G   12G  40% /\n(simulated values)";
        break;
      case "ifup":
        needRoot();
        demand(1);
        if (args[0] !== "eth0") throw Error("Unknown interface");
        this.networkUp = true;
        out = "eth0 configured: 10.0.0.2/24 (simulated)";
        break;
      case "ping": {
        if (!this.networkUp) throw Error("Network is down. See man ifup.");
        let count = 4,
          host;
        for (let i = 0; i < args.length; i++) {
          if (args[i] === "-c") count = Number(args[++i]);
          else if (!host) host = args[i];
          else throw Error(syntax.ping[0]);
        }
        if (
          host !== "relay.local" ||
          !Number.isInteger(count) ||
          count < 1 ||
          count > 10
        )
          throw Error(syntax.ping[0]);
        out =
          `PING relay.local (10.0.0.8) — simulated\n` +
          Array.from(
            { length: count },
            (_, i) =>
              `64 bytes from 10.0.0.8: icmp_seq=${i + 1} ttl=63 time=4 ms`,
          ).join("\n") +
          `\n${count} packets transmitted, ${count} received, 0% packet loss`;
        break;
      }
      case "traceroute":
        if (!this.networkUp) throw Error("Network is down");
        demand(1);
        if (args[0] !== "relay.local")
          throw Error("Only relay.local is modeled");
        out =
          "traceroute to relay.local (simulated)\n1  harbor-gateway (10.0.0.1)  1 ms\n2  relay.local (10.0.0.8)  4 ms";
        break;
      case "netstat":
        flags("ltn");
        out =
          "Proto Local Address    State\ntcp   0.0.0.0:22       LISTEN\ntcp   0.0.0.0:443      LISTEN\n(simulated sockets; consider ss on modern Linux)";
        break;
      case "curl": {
        if (!this.networkUp) throw Error("Network is down");
        let target = null,
          url = null;
        for (let i = 0; i < args.length; i++) {
          if (args[i] === "-o") target = args[++i];
          else if (args[i] === "-s") continue;
          else if (!url) url = args[i];
          else throw Error(syntax.curl[0]);
        }
        if (url !== "https://relay.local/chart")
          throw Error(
            "Only the fictional https://relay.local/chart is available",
          );
        const body = "NORTH STAR: beacon alignment 17.\n";
        if (target) this.write(this.resolve(target), body);
        else out = body;
        break;
      }
      case "ssh":
        demand(1);
        if (!this.networkUp) throw Error("Network is down");
        if (args[0] !== "operator@relay.local")
          throw Error("Only operator@relay.local is modeled");
        if (this.remote) throw Error("Already on the modeled relay");
        this.returnPath = this.cwd;
        this.cwd = "/remote/relay";
        this.remote = true;
        out =
          "Connected to simulated relay.local as operator.\nNo real connection or authentication occurred.\nUse ls to look around. exit returns to shore.";
        break;
      case "rsync": {
        if (args[0] !== "-a" || args.length !== 3) throw Error(syntax.rsync[0]);
        const s = this.resolve(args[1]),
          d = this.resolve(args[2]);
        if (this.node(s).type !== "dir")
          throw Error("This subset synchronizes directories");
        if (!this.fs[d]) this.mkdir(d, true);
        if (d === s || d.startsWith(s + "/"))
          throw Error("Destination cannot be inside the source");
        if (args[1].endsWith("/"))
          for (const p of this.list(s)) this.copy(p, d, true);
        else this.copy(s, d, true);
        out = "Directory synchronized (virtual files).";
        break;
      }
      case "screen":
        if (args.length === 1 && args[0] === "-ls")
          out =
            this.screens.map((s) => `200.${s} (modeled)`).join("\n") ||
            "No sessions.";
        else {
          if (
            args.length !== 2 ||
            args[0] !== "-S" ||
            !/^\w[\w-]*$/.test(args[1])
          )
            throw Error(syntax.screen[0]);
          if (!this.screens.includes(args[1])) this.screens.push(args[1]);
          out = `Named session ${args[1]} recorded. This subset does not emulate a running multiplexer.`;
        }
        break;
      case "exit":
        demand(0);
        if (this.remote) {
          this.remote = false;
          this.cwd = this.returnPath;
          out = "Connection to modeled relay closed. Back at the shore.";
        } else {
          this.closed = true;
          out = "Local virtual shell exited. Type resume to continue.";
        }
        break;
      case "resume":
        demand(0);
        this.closed = false;
        out = "Local virtual shell resumed.";
        break;
      case "crontab":
        demand(1);
        if (args[0] === "-l") out = this.cron || "No crontab installed";
        else {
          const text = this.read(this.resolve(args[0]));
          if (
            lines(text).some(
              (l) =>
                l.trim() &&
                !l.startsWith("#") &&
                l.trim().split(/\s+/).length < 6,
            )
          )
            throw Error("Schedule needs five time fields and a command");
          this.cron = text;
          out = "Virtual user schedule installed. No actual jobs will run.";
        }
        break;
      case "tar": {
        if (!["-cf", "-tf", "-xf"].includes(args[0]))
          throw Error(syntax.tar[0]);
        if (args[0] === "-cf") {
          demand(3);
          const base = this.resolve(args[2]);
          this.node(base);
          const entries = Object.fromEntries(
            Object.entries(this.fs)
              .filter(([p]) => p === base || p.startsWith(base + "/"))
              .map(([p, n]) => [
                args[2].replace(/\/$/, "") + p.slice(base.length),
                structuredClone(n),
              ]),
          );
          this.write(this.resolve(args[1]), "[virtual tar archive]", root, {
            kind: "tar",
            entries,
          });
        } else {
          demand(2);
          const n = this.node(this.resolve(args[1]));
          if (n.kind !== "tar") throw Error("Not a virtual tar archive");
          if (args[0] === "-tf") out = Object.keys(n.entries).join("\n");
          else
            for (const [p, item] of Object.entries(n.entries)) {
              const dest = this.resolve(p);
              this.guard(dest);
              if (item.type === "dir") this.mkdir(dest, true);
              else this.write(dest, item.content, root, item);
            }
        }
        break;
      }
      case "gzip": {
        flags("kd");
        const files = args.filter((a) => !a.startsWith("-"));
        if (files.length !== 1) throw Error(syntax.gzip[0]);
        const p = this.resolve(files[0]),
          n = this.node(p);
        if (n.type !== "file") throw Error("Not a file");
        if (args.includes("-d")) {
          if (n.kind !== "gzip") throw Error("Not a virtual gzip file");
          const d = p.endsWith(".gz") ? p.slice(0, -3) : p + ".out";
          this.write(d, n.original.content, root, n.original);
        } else
          this.write(p + ".gz", "[virtual gzip stream]", root, {
            kind: "gzip",
            original: structuredClone(n),
          });
        if (!args.includes("-k")) delete this.fs[p];
        break;
      }
      case "locate":
        demand(1);
        out = this.locateIndex.filter((p) => p.includes(args[0])).join("\n");
        break;
      case "cpio": {
        demand(1);
        if (args[0] === "-o") {
          const names = lines(stdin).filter(Boolean);
          if (!names.length)
            throw Error("cpio expects filenames on standard input");
          const entries = {};
          for (const name of names) {
            if (name.startsWith("/") || name.split("/").includes(".."))
              throw Error("Use safe relative archive names");
            entries[name] = structuredClone(this.node(this.resolve(name)));
          }
          out = JSON.stringify({ virtualArchive: "cpio", entries });
          extra = { kind: "cpio", entries };
        } else if (["-it", "-id"].includes(args[0])) {
          let archive;
          try {
            archive = JSON.parse(stdin);
          } catch {
            throw Error("Expected a virtual cpio input stream");
          }
          if (archive.virtualArchive !== "cpio")
            throw Error("Not a virtual cpio stream");
          if (args[0] === "-it") out = Object.keys(archive.entries).join("\n");
          else
            for (const [p, n] of Object.entries(archive.entries)) {
              if (p.startsWith("/") || p.split("/").includes(".."))
                throw Error("Unsafe archive path");
              const dest = this.resolve(p);
              if (n.type === "dir") this.mkdir(dest, true);
              else {
                const parent = dest.slice(0, dest.lastIndexOf("/"));
                if (!this.fs[parent]) this.mkdir(parent, true);
                this.write(dest, n.content, root, n);
              }
            }
        } else throw Error(syntax.cpio[0]);
        break;
      }
      case "rpm":
        if (args.length === 1 && args[0] === "-qa")
          out = "beacon-tools-1.0-1.x86_64\nbash-5.2-1.x86_64";
        else {
          if (args.length !== 2 || args[0] !== "-q") throw Error(syntax.rpm[0]);
          if (!["beacon-tools", "bash"].includes(args[1]))
            throw Error(`package ${args[1]} is not installed`);
          out =
            args[1] === "bash"
              ? "bash-5.2-1.x86_64"
              : "beacon-tools-1.0-1.x86_64";
        }
        break;
      case "declare":
        if (!args.length)
          out = Object.entries(this.variables)
            .map(([k, v]) => `declare -- ${k}="${v}"`)
            .join("\n");
        else {
          demand(1);
          const match = args[0].match(/^([A-Za-z_]\w*)=(.*)$/);
          if (!match) throw Error(syntax.declare[0]);
          this.variables[match[1]] = match[2];
        }
        break;
      case "enable": {
        if (!args.length)
          out = this.disabled.includes("echo")
            ? "echo disabled"
            : "echo enabled";
        else if (args.length === 1 && args[0] === "echo")
          this.disabled = this.disabled.filter((c) => c !== "echo");
        else if (args.length === 2 && args[0] === "-n" && args[1] === "echo") {
          if (!this.disabled.includes("echo")) this.disabled.push("echo");
        } else throw Error(syntax.enable[0]);
        break;
      }
      case "awk": {
        if (args.length < 1 || args.length > 2) throw Error(syntax.awk[0]);
        const match = args[0].match(/^\{\s*print\s+\$(\d+)\s*\}$/);
        if (!match) throw Error("Only {print $N} field extraction is modeled.");
        const n = Number(match[1]);
        out = lines(input(args.slice(1)))
          .map((l) => (n === 0 ? l : l.trim().split(/\s+/)[n - 1] || ""))
          .join("\n");
        break;
      }
      case "exec": {
        if (!args.length) throw Error(syntax.exec[0]);
        const r = this.execute(args, stdin, events, root, depth + 1);
        out = r.out;
        status = r.status || 0;
        out +=
          "\n[Training child shell replaced and finished; parent game shell retained.]";
        break;
      }
      case "shutdown":
        needRoot();
        if (args.length === 1 && args[0] === "-c") {
          this.shutdownScheduled = false;
          out = "Fictional halt canceled.";
        } else {
          if (args.length !== 2 || args[0] !== "-h" || !/^\+\d+$/.test(args[1]))
            throw Error(syntax.shutdown[0]);
          this.shutdownScheduled = true;
          out = `Fictional halt scheduled in ${args[1].slice(1)} minutes. Your computer is unaffected.`;
        }
        break;
      case "rm": {
        flags("r");
        const paths = args.filter((a) => a !== "-r");
        if (paths.length !== 1) throw Error(syntax.rm[0]);
        const p = this.resolve(paths[0]);
        if (
          [
            "/",
            this.cwd,
            "/world",
            "/home",
            "/remote",
            ...regions.map((r) => r.path),
          ].includes(p)
        )
          throw Error("This world root or current location is protected.");
        const n = this.node(p);
        if (n.type === "dir" && !args.includes("-r"))
          throw Error("Is a directory. Use -r for a virtual tree.");
        for (const x of Object.keys(this.fs))
          if (x === p || x.startsWith(p + "/")) delete this.fs[x];
        break;
      }
      case "touch":
        demand(1);
        if (!this.fs[this.resolve(args[0])])
          this.write(this.resolve(args[0]), "");
        break;
      case "man":
        demand(1);
        if (!syntax[args[0]]) throw Error("No game manual for that command");
        out = `${args[0].toUpperCase()} — GAME MANUAL\n\n${syntax[args[0]][0]}\n\n${syntax[args[0]][1]}\n\nThis browser terminal implements a documented subset. It is not a real Linux shell.`;
        pager = true;
        break;
      case "help":
        out =
          "Explore: ls · cd PLACE · less ITEM · pwd\nStory: quest · hint · map\nReference: man COMMAND\nShell: history · clear · exit · resume\nRecovery: undo (game-only, last 20 steps in this tab)\nPipes and redirection: |  >  >>  <\nUse Up/Down for command history and Tab for completion.\nOnly game files and fictional network hosts exist here.";
        break;
      case "quest":
        out = this.quest();
        break;
      case "hint": {
        if (!this.task) {
          out = "You restored the beacon. The world remains yours to explore.";
          break;
        }
        const count = Math.min(3, (this.hints[this.mission] || 0) + 1);
        this.hints[this.mission] = count;
        out = `Hint ${count}/3: ${this.task.hints[count - 1]}`;
        break;
      }
      case "map":
        out = regions
          .map(
            (r) =>
              `${r.index < this.region ? "✓" : r.index === this.region ? "→" : "·"} ${r.path} — ${r.index > this.region ? "sealed" : r.title}`,
          )
          .join("\n");
        break;
      case "clear":
        return { out: "", clear: true };
      default:
        throw Error(
          `${cmd}: command not found. Try help or man COMMAND. Linux command names are case-sensitive.`,
        );
    }
    events.push({
      cmd,
      args,
      root,
      out,
      ok: status === 0 || cmd === "diff",
      cwd,
    });
    return { out, pager, status, extra };
  }
}
