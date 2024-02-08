import { RequestType } from './ajax';

export interface IRequestContext {
  readonly appInstanceId?: string;
  readonly authToken?: string;
}

export type CustomHeaders = {
  [key: string]: string,
};


function getAuthHeader(accessToken: string): CustomHeaders {
  return { Authorization: `Bearer ${accessToken}` };
}

function getHeaders(defaultHeaders: CustomHeaders, requestContext?: IRequestContext): CustomHeaders {
  if (!requestContext) {
    return defaultHeaders;
  }

  const newHeaders = requestContext.authToken ? getAuthHeader(requestContext.authToken) : {};

  if (requestContext.appInstanceId) {
    newHeaders['X-AppInstanceId'] = requestContext.appInstanceId;
  }

  return { ...defaultHeaders, ...newHeaders };
}

export function createRestProvider(ajax: any) {
  function makeRequest(httpVerb: RequestType, url: string, data: any, requestContext?: IRequestContext): Promise<XMLHttpRequest> {
    const headers = getHeaders(
      { 'Content-type': 'application/json' },
      requestContext,
    );

    const requestBody = data ? prepareDataForSend(data) : null;
    return ajax.request(httpVerb, url, requestBody, headers);
  }

  return {
    get(url: string, requestContext?: IRequestContext): Promise<any> {
      return makeRequest('GET', url, undefined, requestContext)
        .then(verifyStatusCode([200]))
        .then(parseResponse);
    },
    post(url: string, data: any, requestContext?: IRequestContext): Promise<any> {
      return makeRequest('POST', url, data, requestContext)
        .then(verifyStatusCode([200, 201]))
        .then(parseResponse);
    },
  };
}

function prepareDataForSend(data: any): any {
  if ((data && typeof data === 'object') || typeof data === "string") {
    return JSON.stringify(data);
  }

  return data;
}

function verifyStatusCode(validStatusCodes: number[]) {
  return (response: XMLHttpRequest) => {
    if (validStatusCodes.indexOf(response.status) >= 0) {
      return response;
    }
    else {
      throw response;
    }
  };
}

function parseResponse(response: XMLHttpRequest) {
  // it might be empty string which can't be parsed by JSON.parse
  if (!response.responseText) {
    return null;
  }
  return JSON.parse(response.responseText);
}
