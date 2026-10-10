import { rmSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve("_site");
rmSync(output, { recursive: true, force: true });
