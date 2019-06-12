import React from 'react';
import {
  AppContextConsumer
} from '../context/AppContext';
import { PageContent } from './PageContent';
import { ArticleExampleContentType } from "../models/Article";

interface IWelcomePageProps {
  readonly pages: Array<ArticleExampleContentType>;
  readonly init: () => void;
}

class WelcomePage extends React.PureComponent<IWelcomePageProps> {
  componentDidMount(): void {
    this.props.init();
  }

  render() {
    const page = this.props.pages[0];
    if (page) {
      return (
        <PageContent title={page.title.value}>
          <div dangerouslySetInnerHTML={{ __html: page.body.getHtml() }} />
        </PageContent>
      );
    }

    return <p>Missing data for Welcome page</p>;
  }
}

const WelcomePageConnected = () => (
  <AppContextConsumer>
    {appContext => (
      <WelcomePage
        pages={appContext.pages}
        init={appContext.loadWelcomePage} />
    )}
  </AppContextConsumer>
);

export { WelcomePageConnected as WelcomePage }
