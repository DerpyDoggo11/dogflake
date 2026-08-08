import { serve } from "bun";
import { Database } from "bun:sqlite";

const servers = {
  mh: "nocturnmh.minehut.gg",
  mk: "nocturn.minekeep.gg"
};
const pollInterval = 60_000;
const pingTimeout = 15_000;
const maxPlayers = 32; // higher counts are bogus data

const db = new Database("/var/lib/nocturn-tracker/tracker.db");

db.run("PRAGMA journal_mode = WAL"); // survive unclean restarts
db.run(`
  CREATE TABLE IF NOT EXISTS samples (
    timestamp INTEGER PRIMARY KEY,
    mh INTEGER,
    mk INTEGER
  );
`);

const insert = db.prepare("INSERT OR REPLACE INTO samples (timestamp, mh, mk) VALUES (?, ?, ?)");
const getData = db.prepare(`
  SELECT
    timestamp,
    CASE WHEN mh <= $max THEN mh END AS mh,
    CASE WHEN mk <= $max THEN mk END AS mk
  FROM samples
  WHERE timestamp >= $since
  ORDER BY timestamp ASC
`);

async function ping(host) {
  const proc = Bun.spawn([ "mcstatus", host, "json" ], { stderr: "ignore" });
  const timer = setTimeout(() => proc.kill(), pingTimeout);

  try {
    const status = JSON.parse(await new Response(proc.stdout).text());
    if (!status.online) return null;

    const online = status.status.players.online;
    return online <= maxPlayers ? online : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  };
};

async function poll() {
  const [ mh, mk ] = await Promise.all([ ping(servers.mh), ping(servers.mk) ]);
  insert.run(Date.now(), mh, mk);
};

poll();
setInterval(poll, pollInterval);

const page = await Bun.file(import.meta.dir + "/page.html").text();

serve({
  port: 80,
  hostname: "::", // Cloudflare reaches the origin over IPv6
  fetch(req) {
    const pathname = new URL(req.url).pathname;

    if (pathname.startsWith("/getdata")) {
      const span = (pathname == "/getdata")
        ? 86400000 // past 24 hours
        : 604800000; // past 7 days

      const body = {
        samples: getData.all({ $max: maxPlayers, $since: Date.now() - span })
      };
      return new Response(JSON.stringify(body), {
        headers: { "Content-Type": "application/json" }
      });
    };

    return new Response(page, { headers: { "Content-Type": "text/html" }});
  }
});
