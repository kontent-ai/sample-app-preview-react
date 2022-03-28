import React from 'react';
import { AppContextConsumer } from '../context/AppContext';
import { PageContent } from './PageContent';
import { ArticleExampleContentType } from "../models/article_example_content_type";

interface IWelcomePageProps {
  readonly article: ArticleExampleContentType;
  readonly init: () => void;
}

class WelcomePage extends React.PureComponent<IWelcomePageProps> {
  componentDidMount(): void {
    this.props.init();
  }

  render() {
    const { article } = this.props;
    if (article) {
      return (
        <PageContent title={article.elements.title.value}>
          <div dangerouslySetInnerHTML={{ __html: article.elements.body.value }} />
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
        article={appContext.articles[0]}
        init={appContext.loadWelcomePage} />
    )}
  </AppContextConsumer>
);

export { WelcomePageConnected as WelcomePage }
