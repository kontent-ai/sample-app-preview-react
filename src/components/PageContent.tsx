import React, { PropsWithChildren } from "react";
import "./PageContent.css";

export type PageContentProps = PropsWithChildren<
  Readonly<{
    title: string;
  }>
>;

export const PageContent: React.FunctionComponent<PageContentProps> = ({ title, children }) => (
  <>
    <div className="app-title">
      {title}
    </div>
    <div className="app-content">
      {children}
    </div>
  </>
);
