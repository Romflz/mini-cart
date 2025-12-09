import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/server.ts', 'src/db/init/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  packages: 'external',
  sourcemap: true,
})
