import * as fsp from 'node:fs/promises';

const vercelDir = '../../.vercel';
const outDir = vercelDir + '/output';
const staticDir = outDir + '/static';
const functionsDir = vercelDir + '/functions';

await fsp.rm(outDir, { recursive: true }).catch(() => {});

await fsp.mkdir(`${outDir}/static`, { recursive: true });

await fsp.cp('vercel/output/', outDir, { recursive: true });
await fsp.cp('build/client/', staticDir, { recursive: true });
await fsp.cp('build/server/', `${outDir}/functions/index.func`, {
  recursive: true,
});
