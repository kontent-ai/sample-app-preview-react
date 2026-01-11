import React, { PropsWithChildren } from "react";

export const PageContent: React.FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (
  <div className="m-10 max-w-[1200px] flex flex-col gap-6">{children}</div>
);
