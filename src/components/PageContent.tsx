import React from 'react';
import './PageContent.css';

export interface IPageContentProps {
  readonly title: string;
}

export const PageContent: React.FunctionComponent<IPageContentProps> = ({ title, children }) => (
  <>
    <div className="app-title">
      {title}
    </div>
    <div className="app-content">
      {children}
    </div>
  </>
);
