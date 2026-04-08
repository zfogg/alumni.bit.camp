declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "./styles/globals.css" {
  export {};
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_ID: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DISCORD_INVITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
