declare class SketchfabAPIClient {
  constructor(target: Window, instanceId: string, domain: string);
  getIdentifier(): string;
  getDomain(): string;
  setIdentifier(id: string): void;
  use(
    version: string,
    callback: (error: any, apiClient: SketchfabAPIClient) => void
  ): void;
  listenServer(): void;
  addEventListener(
    event: string,
    listener: (...args: any[]) => void,
    options?: AddEventListenerOptions
  ): void;
  removeEventListener(event: string, listener: (...args: any[]) => void): void;
}

declare class Sketchfab {
  constructor(version: string, target: HTMLElement);
  _getURLOptions(): void;
  getEmbedURL(uid: string, options?: Record<string, any>): string;
  init(uid: string, options?: SketchfabOptions): void;
  _initializeAPIEmbed(event: MessageEvent): void;
  _realInit(): void;
  success(apiClient: SketchfabAPIClient): void;
  error(error: any): void;
  show(): void;
}

interface SketchfabOptions {
  success?: (apiClient: SketchfabAPIClient) => void;
  error?: (error: any) => void;
  [key: string]: any;
}

interface Window {
  Sketchfab: typeof Sketchfab;
  sketchfabAPIinstances?: Sketchfab[];
}

declare module './src/app/test/sketchfab-viewer.ts' {
  export = Sketchfab;
}
