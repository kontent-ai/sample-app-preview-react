import React, { useContext, useEffect, useState } from "react";
import { AppContext, AppContextConsumer } from "../context/AppContext";
import { PageContent } from "./PageContent";
import { ArticleExampleContentType } from "../models/article_example_content_type";
import { getAllArticles } from "../repositories/contentItemRepository";
import { Loading } from "./Loading";

type WelcomePageProps = Readonly<{
  article: ArticleExampleContentType;
}>;

const WelcomePage: React.FC<WelcomePageProps> = (props) => (
  <PageContent title={props.article.elements.title.value}>
    <div dangerouslySetInnerHTML={{ __html: props.article.elements.body.value }} />
  </PageContent>
);

const WelcomePageConnected = () => {
  const appContext = useContext(AppContext);
  const [articles, setArticles] = useState<ReadonlyArray<ArticleExampleContentType> | null>(null);

  useEffect(() => {
    getAllArticles(appContext.environmentId, appContext.previewApiKey)
      .then(res => setArticles(res));
  });

  if (!articles) {
    return <Loading />;
  }

  return (
    <WelcomePage
      article={articles[0]}
    />
  );
};

export { WelcomePageConnected as WelcomePage };
