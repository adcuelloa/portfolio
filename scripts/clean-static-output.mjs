// The Cloudflare adapter writes its own Worker config (wrangler.json, .assetsignore) into dist/client
// plus a .wrangler/deploy redirect to it. This site is fully prerendered and deploys as static assets
// with the root wrangler.jsonc, so those generated files are dropped: otherwise wrangler would pick the
// adapter's config (and its unused SESSION KV binding), and hosts that ignore .assetsignore would
// serve them publicly.
import { rmSync } from "node:fs";
import { join } from "node:path";

const output = join(process.cwd(), "dist", "client");
for (const file of ["wrangler.json", ".assetsignore", ".dev.vars"]) {
  rmSync(join(output, file), { force: true });
}
rmSync(join(process.cwd(), ".wrangler", "deploy", "config.json"), { force: true });
console.info("Removed adapter-generated Worker config from the static output.");
