import React from 'react';
import { PageContent } from './PageContent';

export const HomePage = (): JSX.Element => {
  return (
    <PageContent>
      <h1>Welcome</h1>
      <p>This is a&nbsp;<strong>content item</strong>, which holds your content based on templates you define in your&nbsp;<strong>content types.</strong>&nbsp;To see how this one is defined, click&nbsp;
        <em>Content models</em>&nbsp;in the left menu and look at&nbsp;<em>Article—example content type</em>.</p>
      <p>In this content item, you can add the actual content that will be displayed in your final app. Your content can include formatted text and images.</p><p>
      <a href="https://docs.kenticocloud.com/tutorials/compose-and-link-content/create-content/composing-content-in-the-rich-text-editor#a-adding-images">Add an image</a>&nbsp;below this paragraph.</p><p><br /></p>
      <p>To make your content available outside of Kentico Cloud, click <strong>Change workflow or publish </strong>on the right of the screen and then&nbsp;<strong>Publish</strong>&nbsp;your content.</p>
    </PageContent>);
};