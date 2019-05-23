export type CustomHeaders = {
  [key: string]: string,
};

export type RequestType =
  'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH';

export type ProgressCallback = (event: {
  loaded: number;
  total: number;
}) => void;

export interface ICreateAjax {
  request: (type: RequestType, url: string, data: any, customHeaders?: CustomHeaders) => Promise<XMLHttpRequest>;
  requestFile: (type: RequestType, url: string, data: any, customHeaders?: CustomHeaders) => Promise<XMLHttpRequest>;
  upload: (url: string, formData: FormData, uploadProgressCallback: ProgressCallback, customHeaders?: CustomHeaders) => Promise<XMLHttpRequest>;
}

function createAjax(withCredentials: any): ICreateAjax {
  return {
    /**
     * Attempts to parse the response as JSON otherwise returns it untouched.
     *
     * @param {string} type The HTTP verb to be used.
     * @param {string} url The url for the XHR request.
     * @param {object} data Optional. The data to be passed with a POST or PUT request.
     * @param {object} customHeaders Optional. Custom headers to be included in a request.
     *
     * @memberof ajax
     */
    request(type: RequestType, url: string, data: any, customHeaders?: CustomHeaders): Promise<XMLHttpRequest> {
      return new Promise<XMLHttpRequest>(resolve => {
        const request = getNewEmptyRequest();

        request.open(type, url, true);
        request.withCredentials = withCredentials;

        addCustomHeaders(request, customHeaders);

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            resolve(request);
          }
        };

        request.send(data);
      });
    },

    requestFile(type: RequestType, url: string, data: any, customHeaders?: CustomHeaders): Promise<XMLHttpRequest> {
      return new Promise<XMLHttpRequest>(resolve => {
        const request = getNewEmptyRequest();

        request.open(type, url, true);
        request.responseType = 'blob';
        request.withCredentials = withCredentials;

        addCustomHeaders(request, customHeaders);

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            resolve(request);
          }
        };

        request.send(data);
      });
    },

    upload(url: string, formData: FormData, uploadProgressCallback: ProgressCallback, customHeaders?: CustomHeaders): Promise<XMLHttpRequest> {
      return new Promise(resolve => {
        const request = getNewEmptyRequest();

        request.open('POST', url, true);

        addCustomHeaders(request, customHeaders);

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            resolve(request);
          }
        };

        request.upload.addEventListener('progress', uploadProgressCallback);
        request.send(formData);
      });
    },
  };
}

function addCustomHeaders(request: XMLHttpRequest, customHeaders?: CustomHeaders) {
  if (customHeaders) {
    Object.keys(customHeaders).forEach((header) => {
      const value = customHeaders[header];
      if (header && value) {
        request.setRequestHeader(header, value);
      }
    });
  }
}

function getNewEmptyRequest(): XMLHttpRequest {
  // if (XMLHttpRequest) {
  return new XMLHttpRequest();
  // }
  // else {
  //   // Set ajax to correct XHR type. Source: https://gist.github.com/jed/993585
  //   return new XMLHttpRequest();
  //   //return new ActiveXObject('MSXML2.XMLHTTP.3.0');
  // }
}

export function createAjaxWithCredentials(): ICreateAjax {
  return createAjax(true);
}

// export function createAjaxWithoutCredentials(): ICreateAjax {
//   return createAjax(false);
// }
