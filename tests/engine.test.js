import test from "node:test";
import assert from "node:assert/strict";
import { Game, tokenize } from "../dist/engine.js";
import { missions, regions } from "../dist/world.js";

function finish() {
  const g = new Game();
  let region = -1;
  for (let i = 0; i < missions.length; i++) {
    const m = missions[i];
    if (m.region !== region) {
      const move = g.run("cd " + regions[m.region].path);
      assert.ok(!move.error, move.out);
      region = m.region;
    }
    for (const cmd of m.solution) {
      const r = g.run(cmd);
      assert.ok(!r.error, `${i + 1} ${cmd}: ${r.out}`);
    }
    assert.equal(g.mission, i + 1, `Mission ${i + 1}: ${m.command} blocked`);
  }
  return g;
}
test("all fifty missions can be completed end to end", () => {
  const g = finish();
  assert.equal(g.mission, 50);
  assert.equal(new Set(g.learned).size, 50);
  assert.ok(g.shutdownScheduled);
});
test("tokenizer respects quotes, variables, empty strings and shell operators", () => {
  assert.deepEqual(
    tokenize(`echo "hello world" '' '$NAME' "$NAME" > out`, {
      NAME: "Ada",
    }).map((t) => t.value),
    ["echo", "hello world", "", "$NAME", "Ada", ">", "out"],
  );
  assert.throws(() => tokenize('echo "unclosed'));
  assert.throws(() => tokenize("ls; pwd"));
});
test("filesystem supports absolute/relative paths, copies, moves, pipes and redirects", () => {
  const g = new Game();
  assert.equal(g.run("mkdir -p test/nested").error, undefined);
  g.run('echo "a b" > test/nested/one');
  g.run("cp test/nested/one test/two");
  assert.ok(g.fs["/world/Haven/test/nested/one"]);
  g.run("mv test/two test/renamed");
  assert.ok(!g.fs["/world/Haven/test/two"]);
  assert.ok(g.fs["/world/Haven/test/renamed"]);
  g.run("cat test/renamed | grep b > result");
  assert.equal(g.fs["/world/Haven/result"].content, "a b");
  g.run("echo more >> result");
  assert.equal(g.fs["/world/Haven/result"].content, "a bmore\n");
});
test("permission errors are real game errors, and sudo is scoped to one command", () => {
  const g = new Game();
  g.mission = 20;
  g.run("cd /world/Vault");
  assert.ok(g.run("cat root-route.txt").error);
  assert.ok(!g.run("sudo cat root-route.txt").error);
  assert.ok(g.run("cat root-route.txt").error);
  assert.ok(g.run("chown keeper ledger.txt").error);
});
test("progress cannot skip goals and sealed regions stay sealed", () => {
  const g = new Game();
  assert.ok(g.run("cd /world/Observatory").error);
  g.run("echo pwd");
  assert.equal(g.mission, 0);
  g.run("pwd");
  assert.equal(g.mission, 1);
  g.run("pwd");
  assert.equal(g.mission, 1);
});
test("save/restore preserves progress and files, not practice password input", () => {
  const g = new Game();
  g.run("pwd");
  g.run("echo note > test");
  g.run("passwd");
  g.run("not-a-real-password");
  const saved = g.serialize();
  assert.ok(!JSON.stringify(saved).includes("not-a-real-password"));
  const restored = new Game(saved);
  assert.equal(restored.mission, 1);
  assert.equal(restored.fs["/world/Haven/test"].content, "note\n");
  assert.equal(restored.pendingPassword, null);
});
test("bad saved filesystem is rejected", () => {
  assert.throws(
    () => new Game({ version: 1, mission: 0, cwd: "/missing", fs: {} }),
  );
});
test("undo restores accidental deletion and progress without saving its stack", () => {
  const g = new Game();
  g.run("pwd");
  g.run("undo");
  assert.equal(g.mission, 0);
  g.run("rm Welcome.txt");
  assert.ok(!g.fs["/world/Haven/Welcome.txt"]);
  g.run("undo");
  assert.ok(g.fs["/world/Haven/Welcome.txt"]);
  assert.ok(!g.serialize().undoStack);
});
test("creating an equivalent artifact cannot skip practicing the target command", () => {
  const g = new Game();
  g.mission = 11;
  g.run("cd /world/Workshop");
  g.run("mkdir kit");
  g.run('echo -n "A working spare fuse." > kit/fuse.txt');
  assert.equal(g.mission, 11);
  g.run("cp fuse.txt kit/");
  assert.equal(g.mission, 12);
});
test("archives support create/list/extract and stdin/stdout flow", () => {
  const g = new Game();
  g.mission = 40;
  g.run("cd /world/Foundry");
  assert.ok(!g.run("tar -cf supplies.tar supplies").error);
  assert.ok(g.run("tar -tf supplies.tar").out.includes("beacon.seal"));
  g.run("gzip -k supplies.tar");
  assert.ok(g.fs["/world/Foundry/supplies.tar"]);
  assert.ok(g.fs["/world/Foundry/supplies.tar.gz"]);
  g.run('find supplies -name "*.seal" | cpio -o > seals.cpio');
  assert.ok(g.run("cpio -it < seals.cpio").out.includes("beacon.seal"));
});
test("legacy tools and unsupported syntax are honestly bounded", () => {
  const g = new Game();
  assert.ok(g.run("curl https://example.com").error);
  assert.ok(g.run("ls --made-up-option").error);
  assert.ok(g.run('awk "{system(1)}"').error);
  assert.ok(g.run("touch /world/Observatory/skip").error);
  assert.equal(g.run("kill 1").error, true);
});
