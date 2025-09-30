import { AppDataSource } from "./data-source";

let initialized: Promise<typeof AppDataSource> | null = null;

export function getDataSource() {
  if (!initialized) {
    initialized = AppDataSource.initialize();
  }
  return initialized;
}
