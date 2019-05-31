import React from 'react';
import {
  AppContextConsumer,
} from '../context/AppContext';
import { PageContent } from './PageContent';

export const WelcomePage = (): JSX.Element => (
  <AppContextConsumer>
    {appContext => {
      const page = appContext.pages.find(page => page.codename === 'welcome');
      if (page) {
        return (
          <PageContent title={page.title}>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </PageContent>
        );
      }
    }}
  </AppContextConsumer>
);
