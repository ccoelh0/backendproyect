declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_MONGO_ATLAS: string;
      COOKIE_SECRET: string;
    };
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};