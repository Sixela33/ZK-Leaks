declare global {
  var process: {
    env: Record<string, string | undefined>;
    exit: (code: number) => never;
  };
  var console: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
}

export {};
