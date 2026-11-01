import { Game, syntax } from "./engine.js";
import { regions, missions } from "./world.js";
const $ = (s) => document.querySelector(s);
const KEY = "shellbound-expedition-v1";
let game,
  storageOK = true,
  historyIndex = 0,
  historyDraft = "",
  warn = "";
try {
  const saved = localStorage.getItem(KEY);
  game = new Game(saved ? JSON.parse(saved) : undefined);
} catch {
  game = new Game();
  warn =
    "An unreadable or unavailable save was not loaded. A fresh expedition is ready.";
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(game.serialize()));
    storageOK = true;
  } catch {
    storageOK = false;
  }
  $("#save-state").textContent = storageOK
    ? "SAVED ON THIS DEVICE"
    : "SAVE UNAVAILABLE · KEEP THIS TAB OPEN";
}
function line(text, kind = "output") {
  const block = document.createElement("div");
  block.className = "terminal-block " + kind;
  block.textContent = text;
  $("#terminal").append(block);
  while ($("#terminal").children.length > 180)
    $("#terminal").firstElementChild.remove();
  $("#terminal").scrollTop = $("#terminal").scrollHeight;
}
function prompt() {
  return `${game.remote ? "operator@relay" : "traveler@beacon"}:${game.cwd} $`;
}
function scene() {
  const r = regions[game.region],
    x = r.index,
    night = x < 9;
  // Original vector scenery: layered coast, pixel-like houses, and a beacon.
  return `<svg viewBox="0 0 320 225" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${night ? "#132725" : "#3a4638"}"/><stop offset="1" stop-color="#263b31"/></linearGradient><radialGradient id="glow"><stop stop-color="#e5d39c" stop-opacity=".28"/><stop offset="1" stop-color="#d8c58b" stop-opacity="0"/></radialGradient></defs><rect width="320" height="225" fill="url(#sky)"/><circle cx="233" cy="43" r="20" fill="url(#glow)"/><circle cx="233" cy="43" r="8" fill="#b9c7a2" opacity=".65"/><g fill="#78917a" opacity=".6"><rect x="40" y="31" width="2" height="2"/><rect x="93" y="53" width="2" height="2"/><rect x="174" y="26" width="2" height="2"/><rect x="274" y="69" width="2" height="2"/><rect x="133" y="41" width="2" height="2"/></g><path d="m0 135 35-35 35 12 44-40 50 55 30-29 54 25 37-43 35 30v100H0Z" fill="#243e33"/><path d="m0 151 66-31 50 30 73-32 51 20 80-14v101H0Z" fill="#304b39"/><path d="m0 187 80-19 48 12 76-21 116 9v57H0Z" fill="#182f2b"/><path d="m0 196 97-13 46 13 71-24 106 7v46H0Z" fill="#183b37"/><g stroke="#477064" opacity=".5"><path d="M18 206h45m25-8h32m-73 21h70m116-20h45m-73 18h59"/></g><g fill="#45604a"><path d="m40 114-12 30h8l-12 20h34l-11-20h8Zm31 7-10 25h7l-11 19h29l-10-19h6ZM277 108l-13 32h8l-13 23h37l-13-23h8Z"/></g><path d="m86 156 28-25 28 25v25H86Z" fill="#5e7050"/><path d="m81 157 33-29 34 29h-8l-26-21-25 21Z" fill="#89906a"/><path d="M98 160h10v10H98m23-10h9v10h-9" fill="#dab977" opacity=".85"/><path d="M112 166h9v17h-9" fill="#293d30"/><path d="m171 171 11-79h22l12 79Z" fill="#7a8361"/><path d="M178 93h30v-5h-30Zm2-5V73h26v15Z" fill="#bec09a"/><path d="m176 74 17-14 17 14Z" fill="#718369"/><path d="M185 76h16v10h-16Z" fill="${x === 9 ? "#f2d992" : "#b39f65"}"/><path d="M190 106h7v10h-7m-10 24h7v10h-7" fill="#374e3a"/><path d="M170 171h48v6h-48Z" fill="#a1a17c"/>${x === 9 ? '<path d="m193 80-159-35v70Zm0 0 127-36v65Z" fill="#e8d595" opacity=".1"/>' : ""}<path d="M138 187h11v-13h-11Zm-2-13h15v-5h-15Z" fill="#9ab49a"/><path d="M140 170h8v-6h-8Z" fill="#d4c79c"/><rect x="145" y="178" width="4" height="7" fill="#e6bd72"/><g fill="#66836a"><rect x="17" y="177" width="3" height="6"/><rect x="57" y="171" width="3" height="5"/><rect x="257" y="171" width="3" height="7"/></g></svg>`;
}
function render() {
  const r = regions[game.region],
    task = game.task;
  document.documentElement.style.setProperty("--region", r.color);
  $("#progress-top").innerHTML =
    `${String(game.mission).padStart(2, "0")} <small>/ 50</small>`;
  $("#progress-fill").style.width = game.mission * 2 + "%";
  $("#chapter-label").textContent =
    `CHAPTER ${String(game.region + 1).padStart(2, "0")} / 10`;
  $("#region-topic").textContent = r.topic.toUpperCase();
  $("#region-name").textContent = game.remote
    ? "The remote relay"
    : r.name.replace("EngineRoom", "Engine Room");
  $("#region-title").textContent = r.title;
  $("#task-title").textContent = task ? task.title : "The beacon is lit.";
  $("#task-goal").textContent = task
    ? task.goal
    : "Fifty tools learned. Ten regions crossed. Keep exploring, or begin a fresh expedition.";
  $("#hint-button").disabled = !task;
  $("#scene").innerHTML = scene();
  $("#chapter-dots").innerHTML = regions
    .map(
      (z) =>
        `<span title="${z.name}" class="${z.index < game.region ? "done" : z.index === game.region ? "current" : ""}"></span>`,
    )
    .join("");
  $("#prompt").textContent = game.pendingPassword
    ? "practice password:"
    : prompt();
  $("#command-input").type = game.pendingPassword ? "password" : "text";
  $("#command-input").setAttribute(
    "aria-label",
    game.pendingPassword ? "Fictional practice password" : "Terminal command",
  );
  $("#terminal-state").textContent = game.pendingPassword
    ? "FICTIONAL VALUE ONLY · INPUT HIDDEN"
    : game.remote
      ? "SIMULATED REMOTE SESSION"
      : game.closed
        ? "SHELL CLOSED · TYPE RESUME"
        : "SIMULATED SHELL · EXPLORE FREELY";
  historyIndex = game.history.length;
  save();
}
function run(command) {
  const secret = !!game.pendingPassword;
  if (!secret) line(`${prompt()} ${command}`, "command");
  else line("practice password: ••••••", "command");
  const result = game.run(command);
  if (result.clear) $("#terminal").replaceChildren();
  if (result.pager) {
    $("#pager-label").textContent = command.startsWith("man ")
      ? "MANUAL · DOCUMENTED TEACHING SUBSET"
      : "PAGER · SCROLL TO READ";
    $("#pager-content").textContent = result.out;
    $("#pager-dialog").showModal();
    $("#pager-content").scrollTop = 0;
    $("#pager-content").focus();
  } else if (result.out) line(result.out, result.error ? "error" : "output");
  if (result.completed) {
    line(
      `✦ THREAD COMPLETE — ${result.completed.title}\n${result.completed.command} added to your field notes.`,
      "reward",
    );
    if (result.ending)
      line(
        "THE BEACON BEYOND\n\nLight spills over the coast. In the Harbor, a bell rings. Pip opens the workshop door. Ada slows the engines. The Keeper writes one last line in the ledger:\n\n“The traveler did not find a magic word. They learned how to change the world.”\n\nYou have completed all 50 threads. Your command book is full.\nThe adventure remains open for practice. Thank you for bringing the light home.",
        "ending",
      );
    else if (result.next.region !== result.completed.region)
      line(
        `A NEW PATH OPENS — ${regions[result.next.region].title}\nTravel to ${regions[result.next.region].path} with cd.\n\n${result.next.story}\nObjective: ${result.next.goal}`,
        "story",
      );
    else
      line(`${result.next.story}\n\nObjective: ${result.next.goal}`, "story");
  }
  $("#command-input").value = "";
  render();
  if (!result.pager) $("#command-input").focus();
  return result;
}
$("#command-form").onsubmit = (e) => {
  e.preventDefault();
  const value = $("#command-input").value;
  if (value.trim() || game.pendingPassword) run(value);
};
$("#command-input").onkeydown = (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "c" && game.pendingPassword) {
    e.preventDefault();
    game.pendingPassword = null;
    $("#command-input").value = "";
    line("Practice password prompt canceled.", "output");
    render();
    return;
  }
  if (game.pendingPassword) return;
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex === game.history.length)
      historyDraft = $("#command-input").value;
    historyIndex = Math.max(
      0,
      Math.min(
        game.history.length,
        historyIndex + (e.key === "ArrowUp" ? -1 : 1),
      ),
    );
    $("#command-input").value =
      historyIndex === game.history.length
        ? historyDraft
        : game.history[historyIndex];
    return;
  }
  if (e.key === "Tab") {
    e.preventDefault();
    const text = $("#command-input").value,
      words = text.split(/\s+/),
      last = words.at(-1);
    let choices;
    if (words.length === 1)
      choices = Object.keys(syntax).filter((c) => c.startsWith(last));
    else {
      const slash = last.lastIndexOf("/"),
        base = slash < 0 ? "" : last.slice(0, slash + 1),
        prefix = slash < 0 ? last : last.slice(slash + 1);
      const dir = game.resolve(base || ".");
      choices = game
        .list(dir)
        .filter((p) => p.split("/").at(-1).startsWith(prefix))
        .map(
          (p) =>
            base + p.split("/").at(-1) + (game.fs[p].type === "dir" ? "/" : ""),
        );
    }
    if (choices.length === 1) {
      words[words.length - 1] = choices[0];
      $("#command-input").value = words.join(" ");
    } else if (choices.length > 1) line(choices.join("  "), "completion");
  }
};
document
  .querySelectorAll("[data-tool]")
  .forEach((b) => (b.onclick = () => run(b.dataset.tool)));
$("#hint-button").onclick = () => run("hint");
function closeDialog(dialog) {
  dialog.close();
  $("#command-input").focus();
}
$("#pager-close").onclick = () => closeDialog($("#pager-dialog"));
$("#pager-dialog").addEventListener("keydown", (e) => {
  if (e.key === "q") {
    e.preventDefault();
    closeDialog($("#pager-dialog"));
  }
});
document
  .querySelectorAll("dialog")
  .forEach((d) =>
    d.addEventListener("close", () => $("#command-input").focus()),
  );
document
  .querySelectorAll("[data-close]")
  .forEach((b) => (b.onclick = () => closeDialog(b.closest("dialog"))));
function panel(kind) {
  const root = $("#panel-content");
  root.replaceChildren();
  const title = document.createElement("h2");
  title.textContent =
    kind === "map"
      ? "The forgotten coast"
      : kind === "codex"
        ? "Your command book"
        : "A world built for learning";
  root.append(title);
  const subtitle = document.createElement("p");
  subtitle.className = "dialog-intro";
  subtitle.textContent =
    kind === "map"
      ? "Ten places. One journey. Walk between unlocked regions with cd."
      : kind === "codex"
        ? "Fifty tools from your reference list. Familiar tools remain useful in every region. Select a command to read its supported syntax."
        : "Shellbound is an original story and implementation inspired by command-driven exploration. All commands run in a browser simulation.";
  root.append(subtitle);
  if (kind === "map") {
    const map = document.createElement("div");
    map.className = "map-list";
    for (const r of regions) {
      const row = document.createElement("button");
      row.disabled = r.index > game.region;
      row.innerHTML = `<span>${r.index < game.region ? "✓" : String(r.index + 1).padStart(2, "0")}</span><div><strong>${r.name.replace("EngineRoom", "Engine Room")}</strong><small>${r.path}</small></div><span>${r.index > game.region ? "SEALED" : "↗"}</span>`;
      row.onclick = () => {
        closeDialog($("#panel-dialog"));
        run("cd " + r.path);
      };
      map.append(row);
    }
    root.append(map);
  } else if (kind === "codex") {
    const search = document.createElement("input");
    search.placeholder = "Find a command…";
    search.setAttribute("aria-label", "Search command book");
    search.className = "codex-search";
    root.append(search);
    const list = document.createElement("div");
    list.className = "codex-list";
    root.append(list);
    function draw() {
      list.replaceChildren();
      for (const m of missions.filter((m) =>
        m.command.includes(search.value.toLowerCase()),
      )) {
        const b = document.createElement("button");
        b.textContent =
          (game.learned.includes(m.command) ? "✓ " : "· ") + m.command;
        b.className = game.learned.includes(m.command) ? "learned" : "";
        b.onclick = () => {
          closeDialog($("#panel-dialog"));
          run("man " + m.command);
        };
        list.append(b);
      }
    }
    search.oninput = draw;
    draw();
  } else {
    const text = document.createElement("div");
    text.className = "about-content";
    text.innerHTML =
      '<h3>Learn the command, not a secret phrase.</h3><p>Directories are places. Files contain letters, logs, and conversations. Most objectives accept equivalent paths and supported options. Use quest for the story, hint for progressive help, and man COMMAND for the documented subset.</p><h3>A simulation, not Bash or Linux.</h3><p>No process runs on your computer. Network hosts, ownership, passwords, schedules, archives and shutdown are fictional. Pipes and redirection are modeled. Unsupported flags produce guidance. Command substitution, glob expansion by the shell, background jobs, and a complete POSIX permission model are not implemented.</p><p>less has a real in-game pager; top is a snapshot; screen records a session without emulating a second running terminal; exec models a child-shell replacement. Virtual archives are not compatible with real tar/gzip/cpio files. Check the manuals before transferring examples to real Linux.</p><h3>The source list, with context.</h3><p>All fifty entries are covered. “Cron” is taught through crontab, the user schedule manager. Linux commands are case-sensitive and written in lowercase. finger, netstat and ifup are legacy or optional tools, and rpm belongs to an RPM-family distribution. rm, touch and clear are also available as practice tools.</p><h3>Inspiration & references</h3><p><a href="https://web.mit.edu/mprat/Public/web/Terminus/Web/main.html" target="_blank" rel="noreferrer">Terminus — MIT-hosted terminal adventure ↗</a><br><a href="https://puttygen.com/linux-commands" target="_blank" rel="noreferrer">Your selected fifty-command reference ↗</a><br><a href="https://www.gnu.org/software/bash/manual/" target="_blank" rel="noreferrer">GNU Bash manual ↗</a></p><p>Story, map, artwork and source code here are newly written. This is not an official Terminus expansion. Progress is stored in localStorage on this browser. Use New expedition to erase it. If storage is blocked, keep the tab open.</p>';
    root.append(text);
  }
  $("#panel-dialog").showModal();
}
document
  .querySelectorAll("[data-panel]")
  .forEach((b) => (b.onclick = () => panel(b.dataset.panel)));
$("#about-open").onclick = () => panel("about");
$("#sources-open").onclick = () => panel("about");
$("#restart-open").onclick = () => $("#restart-dialog").showModal();
$("#confirm-restart").onclick = () => {
  game = new Game();
  $("#terminal").replaceChildren();
  closeDialog($("#restart-dialog"));
  welcome();
  render();
};
function welcome() {
  line("SHELLBOUND\nTHE BEACON BEYOND", "title");
  if (warn) {
    line(warn, "error");
    warn = "";
  }
  line(
    game.mission
      ? "Your expedition continues. The coast remembers your footsteps."
      : "A lantern wakes in the mist.\n\nSomewhere along the forgotten coast, a beacon has gone dark.\nYou are a traveler with no sword, no map, and a handful of commands.\nThe people here need someone who knows how to look, read, and change things.",
    "story",
  );
  line(
    "Look around with ls. Walk with cd PLACE. Read with less ITEM.\nquest keeps your thread. hint offers a nudge. man COMMAND explains a tool.\nTab completes names. Up/Down recalls commands. Everything here is simulated.",
    "intro-help",
  );
  line(game.quest(), "story");
}
welcome();
render();
$("#command-input").focus();
