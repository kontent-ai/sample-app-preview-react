import React from 'react';

export enum ErrorPageType {
  MissingProjectId = 'missingProjectId',
  UnableToGetPreviewApiKey = 'unableToGetPreviewApiKey',
}

interface IErrorPageProps {
  readonly type: ErrorPageType;
}

const projectIdUrlTemplate = "https://kontent-ai.github.io/sample-app-preview-react/<your_project_id>";

const MissingProjectIdErrorPageContent: React.FunctionComponent = () => (
  <p>Didn't you forget to provide Project Id in the url? E.g. <i>{projectIdUrlTemplate}</i></p>
);

const UnableToGetPreviewApiKeyErrorPageContent: React.FunctionComponent = () => (
  <>
    <p>There was problem retrieving Preview Api Key.</p>
    <p>Did you provide correct Project Id? E.g. <i>{projectIdUrlTemplate}</i></p>
  </>
);

export const ErrorPage: React.FunctionComponent<IErrorPageProps> = ({ type }) => (
  <>
    <div className="navigation-bar">
      <nav className="navigation-bar__app-menu"/>
    </div>

    <p>Ooops, there was some error!</p>
    {type === ErrorPageType.MissingProjectId && (
      <MissingProjectIdErrorPageContent/>
    )}

    {type === ErrorPageType.UnableToGetPreviewApiKey && (
      <UnableToGetPreviewApiKeyErrorPageContent/>
    )}
  </>
);

