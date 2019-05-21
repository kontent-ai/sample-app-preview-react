import React from 'react';
import { Link } from 'react-router-dom';
import { PageContent } from './PageContentWrapper';

export const LandingPage = (): JSX.Element => {
  return (
    <PageContent>
      <h1>🚀 A landing page! 🚀 This page is built by linking other content</h1>
      <div className="product-list">
        Linked products:
        <ol>
          <li>
            <Link to="/product">
              <div className="product-list__item">
                <img src="https://dev-preview-assets-eu-01.global.ssl.fastly.net:443/a7e13f86-7f42-0047-0e15-cdde6e902aca/8c81fa7b-6727-44d8-ab72-341dac7c6153/headless_horseman.png" width="50px" height="50px"/>
                <span>An amazing product that's great for everyone</span>
              </div>
            </Link>
          </li>
        </ol>
      </div>
    </PageContent>)
};