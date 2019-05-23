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

  // function makeFileRequest(httpVerb: RequestType, url: string, data: any, requestContext?: IRequestContext): Promise<XMLHttpRequest> {
  //   const headers = getHeaders(
  //     { 'Content-type': 'application/octet-stream' },
  //     requestContext,
  //   );
  //
  //   const requestBody = data ? prepareDataForSend(data) : null;
  //   return ajax.requestFile(httpVerb, url, requestBody, headers);
  // }

  return {
    // get(url: string, queryParameters: QueryStringParams | null, requestContext?: IRequestContext): Promise<any> {
    //   const urlWithQueryParams = url + (queryParameters ? buildUrlQueryString(queryParameters) : '');
    //
    //   return makeRequest('GET', urlWithQueryParams, null, requestContext)
    //     .then(verifyStatusCode([200]))
    //     .then(parseResponse);
    // },
    //
    // getFile(url: string, queryParameters: QueryStringParams | null, requestContext?: IRequestContext): Promise<any> {
    //   const urlWithQueryParams = url + (queryParameters ? buildUrlQueryString(queryParameters) : '');
    //
    //   return makeFileRequest('GET', urlWithQueryParams, null, requestContext)
    //     .then(response => response.response);
    // },

    post(url: string, data: any, requestContext?: IRequestContext): Promise<any> {
      return makeRequest('POST', url, data, requestContext)
        .then(verifyStatusCode([200, 201]))
        .then(parseResponse);
    },

    // put(url: string, data: any, requestContext?: IRequestContext): Promise<any> {
    //   return makeRequest('PUT', url, data, requestContext)
    //     .then(verifyStatusCode([200, 201]))
    //     .then(parseResponse);
    // },
    //
    // patch(url: string, data: any, requestContext?: IRequestContext): Promise<any> {
    //   return makeRequest('PATCH', url, data, requestContext)
    //     .then(verifyStatusCode([200]))
    //     .then(parseResponse);
    // },
    //
    // delete(url: string, requestContext?: IRequestContext): Promise<any> {
    //   return makeRequest('DELETE', url, null, requestContext)
    //     .then(verifyStatusCode([200, 204]))
    //     .then(parseResponse);
    // },
    //
    // upload(url: string, file: any, metadata: any, uploadProgressCallback: ProgressCallback, requestContext?: IRequestContext) {
    //   const headers = getHeaders({}, requestContext);
    //
    //   const formData = new FormData();
    //   formData.append(file.name, file);
    //   formData.append('metadata', JSON.stringify(metadata));
    //
    //   return ajax.upload(url, formData, uploadProgressCallback, headers)
    //     .then(verifyStatusCode([201]))
    //     .then(parseResponse);
    // },
  };
}

function prepareDataForSend(data: any): any {
  if (data && typeof data === 'object') {
    // const dto = toDTO(data);
    // return JSON.stringify(dto);
  }
  else if (typeof data === 'string') {
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