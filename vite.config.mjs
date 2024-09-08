import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: ['src/http/errors/errorHandler.ts'],
      include: [
        'src/http/controllers/*',
        'src/http/middlewares/*',
        'src/services/*',
        'src/repositories/*',
        'src/errors/*',
      ],
    },
    environmentMatchGlobs: [
      [
        'src/tests/feature/**',
        'src/tests/vitest-environment-prisma/prisma-test-environment.ts',
      ],
    ],
  },
}
