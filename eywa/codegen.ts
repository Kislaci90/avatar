import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8080/graphql",
    documents: ["src/**/*.tsx","src/**/*.ts"],
    generates: {
        "src/generated/graphql-schema.ts": {
            plugins: ["typescript"],
            config: {
                useTypeImports: true,
                enumsAsTypes: true,
            },
        },
        "src/generated/": {
            preset: "client",
            config: {
                useTypeImports: true,
            },
        }
    }
};

export default config;
