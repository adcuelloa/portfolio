// The Cloudflare adapter writes Worker config files into dist/client. Workers static assets hide
// them through .assetsignore, but Cloudflare Pages serves everything in the output directory,
// so they would be publicly reachable. This site deploys to Pages as static files: drop them.
import { rmSync } from "node:fs";
import { join } from "node:path";

const output = join(process.cwd(), "dist", "client");
for (const file of ["wrangler.json", ".assetsignore", ".dev.vars"]) {
  rmSync(join(output, file), { force: true });
}
// The adapter's deploy redirect points wrangler at the removed wrangler.json; drop it too so
// `wrangler pages deploy dist/client` works without a Worker config.
rmSync(join(process.cwd(), ".wrangler", "deploy", "config.json"), { force: true });
console.info("Removed Worker-only files from dist/client (Pages output).");
