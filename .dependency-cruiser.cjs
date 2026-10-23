// Architecture rules, checked by `pnpm lint:arch` (also on every commit).
// Each rule turns one line of README → Architecture → "Dependency rules" into a failing check.

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Circular imports make modules impossible to reason about or test in isolation.",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-cross-feature-imports",
      severity: "error",
      comment:
        "A feature must not import another feature. Move the shared code to src/components or src/lib.",
      from: { path: "^src/features/([^/]+)/" },
      to: { path: "^src/features/", pathNot: "^src/features/$1/" },
    },
    {
      name: "shared-must-not-import-features-or-app",
      severity: "error",
      comment: "Shared code (components, lib, config, hooks, types) must stay feature-agnostic.",
      from: { path: "^src/(components|lib|config|hooks|types)/" },
      to: { path: "^src/(features|app)/" },
    },
    {
      name: "features-must-not-import-app",
      severity: "error",
      comment: "Routes depend on features, never the other way around.",
      from: { path: "^src/features/" },
      to: { path: "^src/app/" },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      comment: "This module imports something that doesn't exist.",
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: "not-to-dev-dependency",
      severity: "error",
      comment: "Production code must not import devDependencies (stories may).",
      from: { path: "^src/", pathNot: "\\.stories\\.tsx$" },
      to: { dependencyTypes: ["npm-dev"], dependencyTypesNot: ["type-only"] },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: ["^\\.next/", "^storybook-static/"] },
    // Type-only imports count as dependencies too.
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["module", "main", "types", "typings"],
    },
  },
};
