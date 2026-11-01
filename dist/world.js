// Original world and curriculum. Each lesson checks an outcome, not a typed string.
export const regions = [
  [
    "Haven",
    "The waking shore",
    "A lantern flickers above a deserted quay. The Keeper has left you a letter. Somewhere beyond the fog, the city’s great beacon has gone dark.",
    "navigation",
    "#95d5a3",
  ],
  [
    "Archive",
    "The whispering shelves",
    "The Archivist waits among towers of paper. A route to the beacon is buried in the records. Read carefully: the last page matters as much as the first.",
    "reading",
    "#a0b9f1",
  ],
  [
    "Workshop",
    "A place for broken things",
    "Pip the mechanic has a plan, a spare fuse, and absolutely no filing system. Help put the expedition kit in order.",
    "files",
    "#e2bb7b",
  ],
  [
    "Watchtower",
    "Know who you are",
    "The watchman lowers a brass telescope. “Names, groups, histories. Before I trust a traveler, I need to know who is standing in front of me.”",
    "identity",
    "#d1aceb",
  ],
  [
    "Vault",
    "The weight of a key",
    "The keeper of keys guards the beacon seal. Locks here are not puzzles of strength, but of ownership, permissions, and responsibility.",
    "permissions",
    "#df9caa",
  ],
  [
    "EngineRoom",
    "The restless machines",
    "Fans roar under the mountain. One runaway process is draining the station. The engineer asks you to observe before you intervene.",
    "processes",
    "#edac82",
  ],
  [
    "Harbor",
    "Signals in the mist",
    "The cable to the distant relay lies silent. Bring the interface online and trace the signal through the fog.",
    "networking",
    "#83d3cf",
  ],
  [
    "Relay",
    "A voice across the water",
    "The relay station answers. Its operator has an old chart and a new problem: the connection will not last.",
    "remote tools",
    "#a6c5e8",
  ],
  [
    "Foundry",
    "What survives the journey",
    "A cargo master checks the expedition’s bundles. Pack, compress, locate, and verify the tools before they leave port.",
    "archives",
    "#dab88a",
  ],
  [
    "Observatory",
    "Light at the end",
    "You reach the beacon control room. Gather what you have learned, restore the console, and schedule a safe maintenance stop. Dawn is close.",
    "shell craft",
    "#c8d998",
  ],
].map(([name, title, story, topic, color], i) => ({
  name,
  title,
  story,
  topic,
  color,
  index: i,
  path: `/world/${name}`,
}));

const m = (region, command, title, story, goal, hints, solution, check) => ({
  region,
  command,
  title,
  story,
  goal,
  hints,
  solution,
  check,
});
const ev = (events, cmd) => events.findLast((e) => e.cmd === cmd);
const has = (events, cmd, fragment) =>
  events.some(
    (e) => e.cmd === cmd && e.args.some((a) => a.includes(fragment)) && e.ok,
  );
const read = (cmd, name) => (g, e) => has(e, cmd, name);
const exists = (g, p) => !!g.fs[p];
export const missions = [
  m(
    0,
    "pwd",
    "A place to begin",
    "A voice from the lantern says: “Every journey starts by knowing where you stand.”",
    "Discover your current directory.",
    [
      "Ask the shell for the path of this place.",
      "pwd prints the working directory.",
      "Type: pwd",
    ],
    ["pwd"],
    (g, e) => !!ev(e, "pwd"),
  ),
  m(
    0,
    "ls",
    "Look around",
    "The mist parts, but only a little. Paths and objects are waiting to be noticed.",
    "List what is here.",
    [
      "Look for a command that lists directory entries.",
      "ls lists names; -l shows more detail.",
      "Type: ls",
    ],
    ["ls"],
    (g, e) => !!ev(e, "ls"),
  ),
  m(
    0,
    "cd",
    "The first footstep",
    "A little path climbs toward the Lookout. Walking changes your working directory.",
    "Enter the Lookout directory.",
    [
      "The path is a directory shown by ls.",
      "Use cd followed by a directory name.",
      "Type: cd Lookout",
    ],
    ["cd Lookout"],
    (g) => g.cwd === "/world/Haven/Lookout",
  ),
  m(
    0,
    "less",
    "A letter from the Keeper",
    "A folded note is tucked under the telescope. It is a file, not a place. Read it rather than entering it.",
    "Read Keeper.txt with the pager, then press q to return.",
    [
      "Use a reading tool on the file.",
      "less opens a pager. Use q to close it.",
      "Type: less Keeper.txt",
    ],
    ["less Keeper.txt"],
    read("less", "Keeper.txt"),
  ),
  m(
    0,
    "man",
    "An old field manual",
    "“Do not memorize every spell,” the Keeper writes. “Learn where the instructions live.”",
    "Consult the manual for ls.",
    [
      "Manual pages explain a command’s syntax.",
      "man accepts a command name.",
      "Type: man ls",
    ],
    ["man ls"],
    (g, e) => has(e, "man", "ls"),
  ),
  m(
    1,
    "cat",
    "The Archivist’s greeting",
    "“A file can speak all at once,” says the Archivist. “Read my welcome.”",
    "Print Archivist.txt.",
    [
      "Use the command that writes a whole file to the terminal.",
      "cat takes one or more file paths.",
      "Type: cat Archivist.txt",
    ],
    ["cat Archivist.txt"],
    read("cat", "Archivist.txt"),
  ),
  m(
    1,
    "head",
    "Start with the beginning",
    "A dispatch begins with the name of the supply vessel. You only need its first two lines.",
    "Read the first two lines of dispatch.log.",
    [
      "Do not open the entire log.",
      "head -n NUMBER FILE chooses the line count.",
      "Type: head -n 2 dispatch.log",
    ],
    ["head -n 2 dispatch.log"],
    (g, e) =>
      has(e, "head", "dispatch.log") &&
      ev(e, "head")?.out.includes("VESSEL") &&
      ev(e, "head")?.out.split("\n").length === 2,
  ),
  m(
    1,
    "tail",
    "The last transmission",
    "The final lines of the dispatch identify where the missing signal was seen.",
    "Read the last two lines of dispatch.log.",
    [
      "Use the counterpart to head.",
      "tail -n NUMBER FILE reads the end.",
      "Type: tail -n 2 dispatch.log",
    ],
    ["tail -n 2 dispatch.log"],
    (g, e) =>
      has(e, "tail", "dispatch.log") &&
      ev(e, "tail")?.out.includes("BEACON") &&
      ev(e, "tail")?.out.split("\n").length === 2,
  ),
  m(
    1,
    "grep",
    "Find the warning",
    "The route ledger contains ordinary notes and one WARNING. Extract only the warning line.",
    "Search routes.log for WARNING.",
    [
      "Search inside file contents, not filenames.",
      "grep PATTERN FILE prints matching lines.",
      "Type: grep WARNING routes.log",
    ],
    ["grep WARNING routes.log"],
    (g, e) =>
      has(e, "grep", "routes.log") &&
      ev(e, "grep")?.out.includes("WARNING") &&
      !ev(e, "grep")?.out.includes("ordinary"),
  ),
  m(
    1,
    "find",
    "Among the shelves",
    "The star chart has been misfiled somewhere under these shelves. Find the actual file.",
    "Locate star.chart beneath the Archive with find.",
    [
      "A filesystem search can descend into directories.",
      "find . -name NAME searches from here.",
      "Type: find . -name star.chart",
    ],
    ["find . -name star.chart"],
    (g, e) => ev(e, "find")?.out.includes("star.chart"),
  ),
  m(
    2,
    "mkdir",
    "Room for supplies",
    "Pip points to a pile of tools. “We need a directory for an expedition kit.”",
    "Create a directory called kit.",
    [
      "A directory groups other files.",
      "mkdir NAME creates one.",
      "Type: mkdir kit",
    ],
    ["mkdir kit"],
    (g) => g.fs["/world/Workshop/kit"]?.type === "dir",
  ),
  m(
    2,
    "cp",
    "A spare fuse",
    "Take a copy of fuse.txt for the kit. Pip still needs the original.",
    "Copy fuse.txt into kit, keeping the original.",
    [
      "Copy rather than move.",
      "cp SOURCE DESTINATION",
      "Type: cp fuse.txt kit/",
    ],
    ["cp fuse.txt kit/"],
    (g) =>
      exists(g, "/world/Workshop/fuse.txt") &&
      g.fs["/world/Workshop/kit/fuse.txt"]?.content === "A working spare fuse.",
  ),
  m(
    2,
    "mv",
    "Put a name to it",
    "The item called mystery.txt is actually the beacon lens. Give it the right name.",
    "Rename mystery.txt to lens.txt.",
    [
      "Renaming uses the same command as moving.",
      "mv OLD_NAME NEW_NAME",
      "Type: mv mystery.txt lens.txt",
    ],
    ["mv mystery.txt lens.txt"],
    (g) =>
      !exists(g, "/world/Workshop/mystery.txt") &&
      g.fs["/world/Workshop/lens.txt"]?.content === "A polished beacon lens.",
  ),
  m(
    2,
    "echo",
    "Leave a message",
    "Pip is going to sleep. Leave a note so the next shift knows the kit is ready.",
    "Write kit ready into note.txt using output redirection.",
    [
      "echo prints text; the shell can redirect it into a file.",
      "> replaces a file; >> appends.",
      'Type: echo "kit ready" > note.txt',
    ],
    ['echo "kit ready" > note.txt'],
    (g) => g.fs["/world/Workshop/note.txt"]?.content.trim() === "kit ready",
  ),
  m(
    2,
    "diff",
    "What changed?",
    "Pip has an old plan and a new one. Compare them before setting off.",
    "Compare old.plan and new.plan.",
    [
      "A comparison can reveal changed lines.",
      "diff FILE1 FILE2",
      "Type: diff old.plan new.plan",
    ],
    ["diff old.plan new.plan"],
    (g, e) => has(e, "diff", "old.plan") && has(e, "diff", "new.plan"),
  ),
  m(
    3,
    "whoami",
    "The traveler’s name",
    "“Start with your effective user name,” says the watchman.",
    "Display your current user name.",
    [
      "Ask who is running this shell.",
      "The command is a question without spaces.",
      "Type: whoami",
    ],
    ["whoami"],
    (g, e) => ev(e, "whoami")?.out === "traveler",
  ),
  m(
    3,
    "groups",
    "The company you keep",
    "Your group memberships explain some of your access. The watchman wants to see them.",
    "List your groups.",
    [
      "Groups are collections of user identities.",
      "groups prints group memberships.",
      "Type: groups",
    ],
    ["groups"],
    (g, e) => !!ev(e, "groups"),
  ),
  m(
    3,
    "finger",
    "The engineer’s calling card",
    "An old directory service has information about engineer Ada. This is a legacy tool; many modern machines do not install it.",
    "Look up ada with finger.",
    [
      "Give the user name to the old account information command.",
      "finger USER",
      "Type: finger ada",
    ],
    ["finger ada"],
    (g, e) => has(e, "finger", "ada"),
  ),
  m(
    3,
    "uname",
    "Know the machine",
    "“Who you are is not what you run,” says the watchman. Inspect the operating system.",
    "Display all available system information.",
    [
      "Use uname for system information.",
      "The -a option asks for all fields.",
      "Type: uname -a",
    ],
    ["uname -a"],
    (g, e) => has(e, "uname", "-a"),
  ),
  m(
    3,
    "history",
    "Your footprints",
    "Your recent commands form a trail. Read it before leaving the tower.",
    "Display command history.",
    [
      "This is shell history, not a file you need to find.",
      "history lists the commands you entered.",
      "Type: history",
    ],
    ["history"],
    (g, e) => !!ev(e, "history"),
  ),
  m(
    4,
    "chmod",
    "A readable seal",
    "The seal is yours, but its permissions are wrong. Allow its owner to read and write; allow its group to read; allow others nothing.",
    "Set seal.txt to mode 640.",
    [
      "Permission weights: read 4, write 2, execute 1.",
      "Owner 6, group 4, others 0.",
      "Type: chmod 640 seal.txt",
    ],
    ["chmod 640 seal.txt"],
    (g) => g.fs["/world/Vault/seal.txt"]?.mode === "640",
  ),
  m(
    4,
    "chown",
    "Return what belongs",
    "A ledger belongs to the Keeper, but it is still registered to you. Ownership changes normally require elevated privilege.",
    "Transfer ledger.txt to keeper using sudo chown.",
    [
      "Use chown to change file ownership.",
      "sudo runs one permitted command as root in this lab.",
      "Type: sudo chown keeper ledger.txt",
    ],
    ["sudo chown keeper ledger.txt"],
    (g) => g.fs["/world/Vault/ledger.txt"]?.owner === "keeper",
  ),
  m(
    4,
    "sudo",
    "Borrowed authority",
    "The Keeper grants you permission to read a root-only route file. Elevate only this one command.",
    "Read the protected route with sudo cat root-route.txt.",
    [
      "Ordinary cat should get Permission denied.",
      "sudo COMMAND runs that command with elevated rights.",
      "Type: sudo cat root-route.txt",
    ],
    ["sudo cat root-route.txt"],
    (g, e) => ev(e, "cat")?.root && has(e, "cat", "root-route.txt"),
  ),
  m(
    4,
    "passwd",
    "A training passphrase",
    "Practice changing an account password. Use a made-up practice value here, never a real password. This simulation stores no password.",
    "Run passwd and complete its two prompts.",
    [
      "The prompts do not echo your input.",
      "Enter the same fictional value twice, at least 6 characters.",
      "Type: passwd, then a made-up value twice.",
    ],
    ["passwd", "lantern-practice", "lantern-practice"],
    (g) => g.passwordChanged,
  ),
  m(
    4,
    "alias",
    "A shorter incantation",
    "The Keeper suggests a shortcut for a detailed listing. Let ll stand for ls -l.",
    "Define ll as an alias for ls -l.",
    [
      "Quote a replacement containing spaces.",
      'alias NAME="COMMAND"',
      'Type: alias ll="ls -l"',
    ],
    ['alias ll="ls -l"'],
    (g) => g.aliases.ll === "ls -l",
  ),
  m(
    5,
    "ps",
    "The engine’s workers",
    "The engineer asks for a process snapshot. Find the PID of the runaway process.",
    "List processes with ps.",
    [
      "A process is a running program.",
      "ps shows a snapshot, not a live dashboard.",
      "Type: ps aux",
    ],
    ["ps aux"],
    (g, e) => ev(e, "ps")?.out.includes("runaway"),
  ),
  m(
    5,
    "top",
    "Watch before acting",
    "Observe the engine’s busiest worker. This game gives a single refresh, not a continuous real top display.",
    "Inspect processes with top.",
    [
      "Use the interactive-style process monitor.",
      "top is a live monitor on real Linux; here it is a snapshot.",
      "Type: top",
    ],
    ["top"],
    (g, e) => !!ev(e, "top"),
  ),
  m(
    5,
    "kill",
    "Ask it to stop",
    "The runaway process has PID 4242. Send its default termination signal instead of reaching straight for SIGKILL.",
    "Terminate process 4242 with SIGTERM.",
    [
      "kill sends signals; it does not always force-kill.",
      "The default signal is TERM (15).",
      "Type: kill 4242",
    ],
    ["kill 4242"],
    (g) => !g.processes.some((p) => p.pid === 4242),
  ),
  m(
    5,
    "free",
    "Room to breathe",
    "With the runaway stopped, inspect available memory.",
    "Display memory usage in human-readable units.",
    [
      "Memory is RAM, not disk space.",
      "free -h uses human-readable units.",
      "Type: free -h",
    ],
    ["free -h"],
    (g, e) => has(e, "free", "-h"),
  ),
  m(
    5,
    "df",
    "Space for the voyage",
    "The stores also need enough filesystem space. Check the disk, not memory.",
    "Display filesystem space with df -h.",
    ["Use the tool for mounted filesystem capacity.", "df -h", "Type: df -h"],
    ["df -h"],
    (g, e) => has(e, "df", "-h"),
  ),
  m(
    6,
    "ifup",
    "Wake the link",
    "The simulated eth0 interface is down. This legacy ifup command is not universal; modern distributions may use other network managers.",
    "Bring eth0 up with elevated privilege.",
    [
      "A link must be configured before the relay can answer.",
      "sudo ifup INTERFACE",
      "Type: sudo ifup eth0",
    ],
    ["sudo ifup eth0"],
    (g) => g.networkUp,
  ),
  m(
    6,
    "ping",
    "An answer in the fog",
    "The relay’s address is known. Test its response with a finite number of probes.",
    "Send two ping probes to relay.local.",
    [
      "A ping response tests ICMP reachability, not whether every application works.",
      "ping -c COUNT HOST",
      "Type: ping -c 2 relay.local",
    ],
    ["ping -c 2 relay.local"],
    (g, e) => ev(e, "ping")?.ok && has(e, "ping", "relay.local"),
  ),
  m(
    6,
    "traceroute",
    "The path between",
    "Find the modeled hops to the relay. Real traceroutes may show incomplete results if probes are filtered.",
    "Trace the route to relay.local.",
    [
      "Use the command whose name describes following the route.",
      "traceroute HOST",
      "Type: traceroute relay.local",
    ],
    ["traceroute relay.local"],
    (g, e) => ev(e, "traceroute")?.ok && has(e, "traceroute", "relay.local"),
  ),
  m(
    6,
    "netstat",
    "A listening ear",
    "Find which simulated services are listening. This legacy utility is often replaced by ss on modern Linux.",
    "List listening TCP sockets numerically.",
    [
      "Use -l for listening, -t for TCP, -n for numeric addresses.",
      "Options can be grouped.",
      "Type: netstat -ltn",
    ],
    ["netstat -ltn"],
    (g, e) => ev(e, "netstat")?.ok && ev(e, "netstat")?.out.includes("LISTEN"),
  ),
  m(
    6,
    "curl",
    "Retrieve the relay chart",
    "The relay serves a chart over HTTPS. Save its response instead of only printing it. No real network requests are made in this game.",
    "Download https://relay.local/chart to chart.txt.",
    [
      "curl retrieves a URL. -o chooses an output file.",
      "curl URL -o FILE",
      "Type: curl https://relay.local/chart -o chart.txt",
    ],
    ["curl https://relay.local/chart -o chart.txt"],
    (g) => g.fs["/world/Harbor/chart.txt"]?.content.includes("NORTH STAR"),
  ),
  m(
    7,
    "ssh",
    "Across the water",
    "Connect to the modeled relay as operator. This opens a simulated remote shell; no credentials or connections leave your browser.",
    "Enter the operator account on relay.local.",
    [
      "SSH normally authenticates and encrypts a remote session.",
      "ssh USER@HOST",
      "Type: ssh operator@relay.local",
    ],
    ["ssh operator@relay.local"],
    (g) => g.remote,
  ),
  m(
    7,
    "rsync",
    "Keep a copy",
    "While on the relay, synchronize the charts directory to backup. The source slash means its contents.",
    "Copy charts/ into backup/ with rsync -a.",
    [
      "rsync can synchronize local or remote files.",
      "-a requests archive-style preservation in this subset.",
      "Type: rsync -a charts/ backup/",
    ],
    ["rsync -a charts/ backup/"],
    (g) =>
      g.fs["/remote/relay/backup/north.chart"]?.content ===
      "NORTH STAR: beacon alignment 17.",
  ),
  m(
    7,
    "screen",
    "A named work session",
    "Give your work a named screen session. In real use, a multiplexer can retain terminal sessions across disconnects.",
    "Create a screen session named rescue.",
    ["-S supplies a session name.", "screen -S NAME", "Type: screen -S rescue"],
    ["screen -S rescue"],
    (g) => g.screens.includes("rescue"),
  ),
  m(
    7,
    "exit",
    "Back to the shore",
    "Return from the relay shell to your local expedition.",
    "Exit the simulated SSH session.",
    [
      "exit closes the current shell context.",
      "Here it returns to the saved local directory.",
      "Type: exit",
    ],
    ["exit"],
    (g, e) => !g.remote && !!ev(e, "exit"),
  ),
  m(
    7,
    "crontab",
    "A recurring watch",
    "Install the supplied schedule for a nightly chart check. cron is the scheduler; crontab manages a user’s schedule.",
    "Install watch.cron with crontab.",
    [
      "The file contains five time fields followed by a command.",
      "crontab FILE installs that user’s schedule.",
      "Type: crontab watch.cron",
    ],
    ["crontab watch.cron"],
    (g) => g.cron.includes("check-beacon"),
  ),
  m(
    8,
    "tar",
    "Bundle the tools",
    "The Foundry prepares the supply folder as one archive. This simulator stores a virtual archive, not real tar bytes.",
    "Create supplies.tar from supplies/.",
    [
      "-c creates, -f selects the archive file.",
      "tar -cf ARCHIVE DIRECTORY",
      "Type: tar -cf supplies.tar supplies/",
    ],
    ["tar -cf supplies.tar supplies/"],
    (g) => g.fs["/world/Foundry/supplies.tar"]?.kind === "tar",
  ),
  m(
    8,
    "gzip",
    "A smaller bundle",
    "Compress the tar bundle. Normally gzip replaces the input unless told to keep it.",
    "Compress supplies.tar into supplies.tar.gz.",
    [
      "gzip compresses a stream/file; tar bundles files.",
      "gzip FILE",
      "Type: gzip supplies.tar",
    ],
    ["gzip supplies.tar"],
    (g) => g.fs["/world/Foundry/supplies.tar.gz"]?.kind === "gzip",
  ),
  m(
    8,
    "locate",
    "The catalog, not the shelves",
    "Search the Foundry’s prebuilt filename database for the beacon crystal. A real locate database may be out of date.",
    "Look up crystal.key with locate.",
    [
      "locate searches a filename index rather than walking the current filesystem.",
      "locate NAME",
      "Type: locate crystal.key",
    ],
    ["locate crystal.key"],
    (g, e) => ev(e, "locate")?.out.includes("crystal.key"),
  ),
  m(
    8,
    "cpio",
    "A manifest becomes a bundle",
    "Make an archive from a list of filenames. Unlike tar’s usual invocation, cpio reads the names from standard input.",
    "Pipe the seal filenames into cpio -o and save seals.cpio.",
    [
      'find supplies -name "*.seal" produces a filename list.',
      "Use | to feed it to cpio -o, then > to save the stream.",
      'Type: find supplies -name "*.seal" | cpio -o > seals.cpio',
    ],
    ['find supplies -name "*.seal" | cpio -o > seals.cpio'],
    (g) => g.fs["/world/Foundry/seals.cpio"]?.kind === "cpio",
  ),
  m(
    8,
    "rpm",
    "Check the installed tool",
    "This station uses an RPM-family package database. Query it before assuming a tool is installed.",
    "Query the beacon-tools package.",
    [
      "rpm is a package tool, not the same as apt.",
      "rpm -q PACKAGE",
      "Type: rpm -q beacon-tools",
    ],
    ["rpm -q beacon-tools"],
    (g, e) => ev(e, "rpm")?.out.includes("beacon-tools-"),
  ),
  m(
    9,
    "declare",
    "A bearing in memory",
    "The chart’s heading is NORTH. Store it as a shell variable for the console.",
    "Declare BEARING=NORTH.",
    [
      "declare is a Bash builtin.",
      "Use NAME=VALUE with no spaces around =.",
      "Type: declare BEARING=NORTH",
    ],
    ["declare BEARING=NORTH"],
    (g) => g.variables.BEARING === "NORTH",
  ),
  m(
    9,
    "enable",
    "A builtin wakes",
    "Someone disabled the echo builtin in the training shell. Re-enable it. enable manages Bash builtins, not system services.",
    "Enable the echo builtin.",
    [
      "Use the Bash builtin management command.",
      "enable NAME",
      "Type: enable echo",
    ],
    ["enable echo"],
    (g, e) => has(e, "enable", "echo") && !g.disabled.includes("echo"),
  ),
  m(
    9,
    "awk",
    "Read the right column",
    "The star table has names and headings. Extract its second field, one value per line.",
    "Print column two from stars.tbl with awk.",
    [
      "Fields are $1, $2, and so on. Keep the program single-quoted.",
      "awk '{print $2}' FILE",
      "Type: awk '{print $2}' stars.tbl",
    ],
    ["awk '{print $2}' stars.tbl"],
    (g, e) => ev(e, "awk")?.out === "NORTH\nEAST\nWEST",
  ),
  m(
    9,
    "exec",
    "One last shell",
    "In a child shell, exec replaces the current process. Our safe model marks that child session finished while keeping this game open.",
    "Replace the training child shell with the beacon-ready announcement.",
    [
      "Unlike an ordinary child command, exec replaces the shell process.",
      "exec echo TEXT",
      "Type: exec echo beacon-ready",
    ],
    ["exec echo beacon-ready"],
    (g, e) => ev(e, "exec")?.out.includes("beacon-ready"),
  ),
  m(
    9,
    "shutdown",
    "A careful ending",
    "The beacon is lit. The engineer needs five minutes to put the restored station into a safe maintenance stop. Nothing on your real computer will shut down.",
    "Schedule a halt in five minutes using elevated privilege.",
    [
      "shutdown -h requests a halt; +5 is five minutes from now.",
      "Use sudo for system administration.",
      "Type: sudo shutdown -h +5",
    ],
    ["sudo shutdown -h +5"],
    (g) => g.shutdownScheduled,
  ),
];

export function seedWorld() {
  const fs = {};
  const dir = (p) => {
    fs[p] = { type: "dir", owner: "traveler", mode: "755" };
  };
  const file = (p, content, extra = {}) => {
    fs[p] = { type: "file", content, owner: "traveler", mode: "644", ...extra };
  };
  dir("/");
  dir("/world");
  dir("/remote");
  dir("/remote/relay");
  dir("/home");
  dir("/home/traveler");
  regions.forEach((r) => {
    dir(r.path);
    file(
      `${r.path}/Guide.txt`,
      `${r.title}\n${r.story}\nUse quest for your current objective. hint reveals help in stages. man COMMAND explains supported syntax.`,
    );
  });
  dir("/world/Haven/Lookout");
  file(
    "/world/Haven/Welcome.txt",
    "Welcome, traveler. The beacon has fallen silent. Begin with pwd and ls. Directories are places; files are things to read. Use cd Lookout to climb. Your journal will keep the trail.",
  );
  file(
    "/world/Haven/Lookout/Keeper.txt",
    "To the traveler who finds this:\nThe beacon guides every ship home. Its keepers are scattered. Find the Archive, help its people, and learn the tools that keep the world alive.\nRead with less. Return with q. Then consult man ls.\n— The Keeper",
  );
  file(
    "/world/Archive/Archivist.txt",
    "Archivist: “A command is a tool, not a password. Read the dispatch, search the warnings, and find our lost star chart.”",
  );
  file(
    "/world/Archive/dispatch.log",
    "VESSEL Lantern\nDeparture: before dawn\nordinary cargo arrived\nordinary watch changed\nBEACON last seen at the Observatory\nSTATUS offline",
  );
  file(
    "/world/Archive/routes.log",
    "ordinary route: West Pier\nWARNING: beacon offline; prepare a repair kit\nordinary route: East Market",
  );
  dir("/world/Archive/shelves");
  dir("/world/Archive/shelves/astronomy");
  file(
    "/world/Archive/shelves/astronomy/star.chart",
    "NORTH STAR — align at bearing 17.",
  );
  file(
    "/world/Workshop/Pip.txt",
    "Pip: “Copy the fuse. Rename the lens. Leave me a note. Compare the plans before you sail.”",
  );
  file("/world/Workshop/fuse.txt", "A working spare fuse.");
  file("/world/Workshop/mystery.txt", "A polished beacon lens.");
  file(
    "/world/Workshop/old.plan",
    "Use the old copper lens.\nDeparture at dusk.",
  );
  file(
    "/world/Workshop/new.plan",
    "Use the polished beacon lens.\nDeparture at dawn.",
  );
  file(
    "/world/Watchtower/Watchman.txt",
    "Watchman: “Show your name, your groups, and your machine. Ada the engineer can vouch for you.”",
  );
  file("/world/Vault/seal.txt", "The official beacon seal.", { mode: "600" });
  file("/world/Vault/ledger.txt", "The Keeper’s ledger.");
  file(
    "/world/Vault/root-route.txt",
    "Privileged route: follow the engine tunnels to the Harbor.",
    { owner: "root", mode: "600" },
  );
  file(
    "/world/EngineRoom/Engineer.txt",
    "Engineer: “Process 4242 is runaway. Ask it to terminate. Then check memory and filesystem capacity.”",
  );
  file(
    "/world/Harbor/Operator.txt",
    "Operator: “Bring eth0 up. relay.local is 10.0.0.8. HTTPS serves /chart. Reachability is not the same as application availability.”",
  );
  file("/world/Relay/watch.cron", "0 2 * * * check-beacon\n");
  dir("/remote/relay/charts");
  file("/remote/relay/charts/north.chart", "NORTH STAR: beacon alignment 17.");
  file(
    "/remote/relay/Operator.txt",
    "Remote operator: “Copy charts/ to backup/, name a screen session, then exit back to shore.”",
  );
  dir("/world/Foundry/supplies");
  file("/world/Foundry/supplies/beacon.seal", "Authentic beacon seal");
  file("/world/Foundry/supplies/fuse.txt", "Spare fuse");
  dir("/world/Foundry/lockers");
  file("/world/Foundry/lockers/crystal.key", "The focusing crystal");
  file("/world/Observatory/stars.tbl", "Polaris NORTH\nSirius EAST\nVega WEST");
  file(
    "/world/Observatory/Keeper.txt",
    "Keeper: “Declare your bearing. Wake the builtin. Read the stars. Announce readiness from the child shell. Then schedule a safe halt.”",
  );
  return fs;
}
