import React from 'react';

export enum ErrorPageType {
  MissingEnvironmentId = 'missingEnvironmentId',
  UnableToGetPreviewApiKey = 'unableToGetPreviewApiKey',
}

interface IErrorPageProps {
  readonly type: ErrorPageType;
}

const EnvironmentIdUrlTemplate = "https://getting-started.sample.kontent.ai/<your_environment_id>";

const MissingEnvironmentIdErrorPageContent: React.FunctionComponent = () => (
  <p>Didn't you forget to provide Environment Id in the url? E.g. <i>{EnvironmentIdUrlTemplate}</i></p>
);

const UnableToGetPreviewApiKeyErrorPageContent: React.FunctionComponent = () => (
  <>
    <p>There was problem retrieving Preview Api Key.</p>
    <p>Did you provide correct Environment Id? E.g. <i>{EnvironmentIdUrlTemplate}</i></p>
  </>
);

export const ErrorPage: React.FunctionComponent<IErrorPageProps> = ({ type }) => (
  <>
    <div className="navigation-bar">
      <nav className="navigation-bar__app-menu"/>
    </div>

    <p>Ooops, there was some error!</p>
    {type === ErrorPageType.MissingEnvironmentId && (
      <MissingEnvironmentIdErrorPageContent/>
    )}

    {type === ErrorPageType.UnableToGetPreviewApiKey && (
      <UnableToGetPreviewApiKeyErrorPageContent/>
    )}
  </>
);

