import React from 'react';
import {RootRoute} from "../constants/routePaths";

export enum ErrorPageType {
  MissingProjectId = 'missingProjectId',
  UnableToGetPreviewApiKey = 'unableToGetPreviewApiKey',
}

interface IErrorPageProps {
  readonly type: ErrorPageType;
}

const MissingProjectIdErrorPageContent: React.FunctionComponent = () => (
  <>
    <p>Didn't you forget to provide Project Id in url? E.g. <i>https://kentico.github.io/cloud-preview-sample-app/your_project_id</i></p>
    <p>Default: <a href={`${RootRoute}cf6c9bb2-6d7e-00f8-a84a-b8042d1209c6`}>cf6c9bb2-6d7e-00f8-a84a-b8042d1209c6</a></p>
  </>
);

const UnableToGetPreviewApiKeyErrorPageContent: React.FunctionComponent = () => (
  <>
    <p>There was problem retrieving Preview Api Key.</p>
    <p>Did you provide correct Project Id? E.g. <a href={`${RootRoute}cf6c9bb2-6d7e-00f8-a84a-b8042d1209c6`}>cf6c9bb2-6d7e-00f8-a84a-b8042d1209c6</a></p>
  </>
);

export const ErrorPage: React.FunctionComponent<IErrorPageProps> = ({ type }) => (
  <>
    <p>Ooops, there was some error!</p>
    {type === ErrorPageType.MissingProjectId && (
      <MissingProjectIdErrorPageContent/>
    )}

    {type === ErrorPageType.UnableToGetPreviewApiKey && (
      <UnableToGetPreviewApiKeyErrorPageContent/>
    )}
  </>
);

