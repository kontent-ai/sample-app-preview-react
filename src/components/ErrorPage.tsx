import React from 'react';
import {RootRoute} from "../constants/routePaths";

export const ErrorPage: React.FunctionComponent = () => (
  <>
    <p>Ooops, missing page!</p>
    <p>Didn't you forget to provide Project Id in url? E.g. <i>https://kentico.github.io/cloud-preview-sample-app/your_project_id</i></p>
    <p>Default: <a href={`${RootRoute}0a657fe4-a314-00ac-e539-81e78251686c`}>0a657fe4-a314-00ac-e539-81e78251686c</a></p>
  </>
);

