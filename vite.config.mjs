import tsconfigPaths from 'vite-tsconfig-paths';

export default{
  plugins: [tsconfigPaths()],
  test:{
    environmentMatchGlobs: [['src/tests/feature/**', 'src/tests/vitest-environment-prisma/prisma-test-environment.ts']],
  }
}