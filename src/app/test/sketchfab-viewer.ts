// @ts-nocheck

class SketchfabAPIClient {
  private _target: Window;
  private _requestIdCounter: number;
  private _pendingRequests: {
    [key: number]: (error: any, result: any) => void;
  };
  private _eventListeners: { [key: string]: Array<(...args: any[]) => void> };
  private _ready: boolean;
  private _domain: string;
  private _instanceId: string;
  private _serverReceiveMessageBinded?: (event: MessageEvent) => void;

  constructor(target: Window, instanceId: string, domain: string) {
    this._target = target;
    this._requestIdCounter = 0;
    this._pendingRequests = {};
    this._eventListeners = {};
    this._ready = false;
    this._domain = domain;
    this._instanceId = instanceId;
    this.listenServer();
  }

  getIdentifier(): string {
    return this._instanceId;
  }

  getDomain(): string {
    return this._domain;
  }

  setIdentifier(id: string): void {
    this._instanceId = id;
  }

  use(
    version: string,
    callback: (error: any, apiClient: SketchfabAPIClient) => void
  ): void {
    this._ready = true;
    const requestId = this._requestIdCounter++;
    this._pendingRequests[requestId] = function (error: any, result: any) {
      if (error) {
        callback.call(this, error);
      } else {
        callback.call(this, null, new SketchfabAPIClient(result, this, ''));
      }
    }.bind(this);
    this._target.postMessage(
      {
        type: 'api.initialize',
        requestId: requestId,
        name: version,
        instanceId: this._instanceId,
      },
      this._domain
    );
  }

  listenServer(): void {
    if (!this._serverReceiveMessageBinded) {
      const events = [
        'api.initialize.result',
        'api.request.result',
        'api.event',
      ];
      this._serverReceiveMessageBinded = function (event: MessageEvent) {
        if (
          event.origin === this._domain &&
          event.data &&
          event.data.type &&
          event.data.instanceId &&
          event.data.instanceId === this.getIdentifier()
        ) {
          const type = event.data.type;
          if (events.includes(type)) {
            if ('api.event' === type) {
              const results = event.data.results;
              const eventName = results[0];
              const args = results.slice(1);
              if (this._eventListeners['*'] || this._eventListeners.all) {
                ['*', 'all'].forEach((listenerType) => {
                  const listeners = this._eventListeners[listenerType];
                  if (listeners) {
                    listeners.forEach((listener) =>
                      listener.apply(listener, args)
                    );
                  }
                });
              } else {
                const listeners = this._eventListeners[eventName];
                if (listeners) {
                  listeners.forEach((listener) =>
                    listener.apply(listener, args)
                  );
                }
              }
            } else {
              const requestId = event.data.requestId;
              const callback = this._pendingRequests[requestId];
              if (callback) {
                callback.apply(null, event.data.results);
                this._pendingRequests[requestId] = void 0;
              }
            }
          }
        }
      }.bind(this);
      window.addEventListener('message', this._serverReceiveMessageBinded);
    }
  }

  addEventListener(
    event: string,
    listener: (...args: any[]) => void,
    options?: AddEventListenerOptions
  ): void {
    if (!this._eventListeners[event]) {
      this._eventListeners[event] = [];
    }
    this._eventListeners[event].push(listener);
  }

  removeEventListener(event: string, listener: (...args: any[]) => void): void {
    if (this._eventListeners[event]) {
      const index = this._eventListeners[event].indexOf(listener);
      if (index !== -1) {
        this._eventListeners[event].splice(index, 1);
      }
    }
  }
}

interface SketchfabOptions {
  success?: (apiClient: SketchfabAPIClient) => void;
  error?: (error: any) => void;
  [key: string]: any;
}

class Sketchfab {
  private _version: string;
  private _target: HTMLElement;
  private _apiId: string;
  private _domain: string;
  private _urlTemplate: string;
  private _url: string;
  private _transmitOptions: { [key: string]: any };
  private _options?: SketchfabOptions;
  private _uid?: string;
  private _client?: SketchfabAPIClient;
  private _initializeAPIEmbedBinded?: (event: MessageEvent) => void;

  constructor(version: string, target: HTMLElement) {
    this._version = version;
    this._target = target;
    this._apiId = (
      window.sketchfabAPIinstances || (window.sketchfabAPIinstances = [])
    )
      .push(this)
      .toString();
    this._domain = 'sketchfab.com';
    this._urlTemplate = 'https://YYYY/models/XXXX/embed';
    this._url = this._urlTemplate.replace('YYYY', this._domain);
    this._transmitOptions = {};
    this._getURLOptions();
  }

  _getURLOptions(): void {
    // Parse URL options from the window location
  }

  getEmbedURL(uid: string, options?: { [key: string]: any }): string {
    let url = `${this._url}?api_version=${this._version}&api_id=${this._apiId}`;
    if (options) {
      for (const key in options) {
        if (options[key] !== null && typeof options[key] !== 'function') {
          url += `&${key}=${options[key]}`;
        }
      }
    }
    for (const key in this._transmitOptions) {
      url += `&${key}=${this._transmitOptions[key]}`;
    }
    return url.replace('XXXX', uid);
  }

  init(uid: string, options?: SketchfabOptions): void {
    this._options = options;
    this._uid = uid;
    this._realInit();
  }

  _initializeAPIEmbed(event: MessageEvent): void {
    if (
      event.data &&
      event.data.instanceId &&
      this._apiId === event.data.instanceId &&
      'api.ready' === event.data.type &&
      this._target.src
    ) {
      if (event.data.error) {
        this.error(event.data.error);
        window.removeEventListener('message', this._initializeAPIEmbedBinded!);
        return;
      }
      const urlParts = this._target.src.split('/');
      const domain = `https://${urlParts[2]}`;
      if (this._client) {
        console.log(
          'reusing a Sketchfab instance for multiple client is not supported, please create a new sketchfab instance'
        );
        window.removeEventListener(
          'message',
          this._client._serverReceiveMessageBinded!
        );
      }
      this._client = new SketchfabAPIClient(
        this._target.contentWindow!,
        this._apiId,
        domain
      );
      this._client.use(this._version, (error, apiClient) => {
        if (error) throw error;
        this.success(apiClient);
      });
      window.removeEventListener('message', this._initializeAPIEmbedBinded!);
    }
  }

  _realInit(): void {
    if (!this._initializeAPIEmbedBinded) {
      this._initializeAPIEmbedBinded = this._initializeAPIEmbed.bind(this);
      window.addEventListener('message', this._initializeAPIEmbedBinded);
    }
    this._target.src = this.getEmbedURL(this._uid!, this._options);
  }

  success(apiClient: SketchfabAPIClient): void {
    if (this._options?.success && typeof this._options.success === 'function') {
      this._options.success(apiClient);
    }
  }

  error(error: any): void {
    if (this._options?.error && typeof this._options.error === 'function') {
      this._options.error(error);
    }
  }

  show(): void {
    const top = this._target.style.top;
    this._target.style.top = '-1000vh';
    Promise.resolve().then(() => {
      this._target.style.top = top;
    });
  }
}

// Extend the Window interface to include the Sketchfab class
interface Window {
  Sketchfab: typeof Sketchfab;
  sketchfabAPIinstances?: Sketchfab[];
}

// Export the Sketchfab class as the default export
export default Sketchfab;
