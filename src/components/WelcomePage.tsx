import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";
import { ArticleExampleContentType } from "../models/article_example_content_type";
import { getAllArticles } from "../repositories/contentItemRepository";
import { Loading } from "./Loading";
import { PageContent } from "./PageContent";

type WelcomePageProps = Readonly<{
  article: ArticleExampleContentType;
}>;

const WelcomePage: React.FC<WelcomePageProps> = (props) => (
  <PageContent>
    <h2 className="w-full text-start text-4xl">Welcome</h2>
    <div className="text-justify text-xl ">
      {
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: props.article.elements.body.value }} />
      }
    </div>
  </PageContent>
);

const WelcomePageConnected = () => {
  const appContext = useContext(AppContext);
  const [articles, setArticles] = useState<ReadonlyArray<ArticleExampleContentType> | null>(null);

  useEffect(() => {
    getAllArticles(appContext.environmentId, appContext.previewApiKey)
      .then(res => setArticles(res));
  }, [appContext.environmentId, appContext.previewApiKey]);

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
