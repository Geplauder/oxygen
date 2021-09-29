interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_BACKEND_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}