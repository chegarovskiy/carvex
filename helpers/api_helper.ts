import { waitTime, waitUntilResetTimeEnd } from "../helpers/wait";

export abstract class AResponseHandlerError extends Error {
  public abstract readonly response: Response;
}

export class NotFoundError extends AResponseHandlerError {
  public constructor(public readonly response: Response) {
    super("Not found");
  }
}

export class NotHandledError extends Error {
  public constructor(public readonly response: Response) {
    super("Unhandled");
  }
}

class RetryError extends Error {
  public constructor(public readonly response: Response) {
    super("Retry");
  }
}

type ResponseHandler = (
  response: Response,
  signal?: AbortSignal,
  rest?: any | undefined
) => Promise<void>;

export function _with(
  handler: ResponseHandler,
  next: ResponseHandler
): ResponseHandler {
  return async (response, signal, rest) => {
    if (signal && signal.aborted) {
      throw signal.reason;
    }
    try {
      await handler(response, signal, rest);
    } catch (error) {
      if (error instanceof NotHandledError) {
        return await next(error.response, signal);
      }
      throw error;
    }
  };
}

const unhandled: ResponseHandler = (response, signal) => {
  throw new NotHandledError(response);
};

function with404(handler: ResponseHandler): ResponseHandler {
  return _with(async (response, signal) => {
    if (response.status === 404) {
      console.log("404");
      throw new NotFoundError(response);
    }
    throw new NotHandledError(response);
  }, handler);
}

function with403(handler: ResponseHandler): ResponseHandler {
  return _with(async (response, signal) => {
    if (response.status === 403) {
      console.log("403");
      await waitUntilResetTimeEnd(
        parseInt(response.headers.get("x-rateLimit-reset") ?? "", 10) * 1000,
        signal
      );
      throw new RetryError(response);
    }
    throw new NotHandledError(response);
  }, handler);
}

function with502(handler: ResponseHandler): ResponseHandler {
  return _with(async (response, signal) => {
    if (response.status === 502) {
      console.log("502");
      await waitUntilResetTimeEnd(Date.now() + 10000, signal);
      throw new RetryError(response);
    }
    throw new NotHandledError(response);
  }, handler);
}

//for AD parser
function with500(handler: ResponseHandler): ResponseHandler {
  return _with(async (response, signal) => {
    if (response.status === 500) {
      console.log("500");
      await waitTime(2000, signal);
      throw new RetryError(response);
    }
    throw new NotHandledError(response);
  }, handler);
}

// export const defaultHandler = with404(with403(with502(unhandled)));
export const defaultHandler = with404(with403(with502(with500(unhandled))));

export async function execute(
  init: (signal?: AbortSignal) => Promise<Response>,
  chain: (
    response: Response,
    signal?: AbortSignal,
    rest?: any | undefined
  ) => Promise<void>,
  totalRetries = 3,
  signal?: AbortSignal,
  rest?: any | undefined
): Promise<void> {
  let retriesUsed = 0;
  while (true) {
    try {
      await chain(await init(signal), signal, rest);
      return;
    } catch (error) {
      if (!(error instanceof RetryError) || retriesUsed++ >= totalRetries) {
        throw error;
      }
    }
  }
}
