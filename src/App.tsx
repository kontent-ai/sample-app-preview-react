import React, { SFC } from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';

const PageContent: React.SFC = ({ children })  => {
  return (
    <div className="app-content">
      {children}
    </div>
  )
}

const HomePage = (): JSX.Element => {
  return (
  <PageContent>
    <h1>Welcome</h1>
    <p>This is a&nbsp;<strong>content item</strong>, which holds your content based on templates you define in your&nbsp;<strong>content types.</strong>&nbsp;To see how this one is defined, click&nbsp;<em>Content models</em>&nbsp;in the left menu and look at&nbsp;<em>Article—example content type</em>.</p><p>In this content item, you can add the actual content that will be displayed in your final app. Your content can include formatted text and images.</p><p><a href="https://docs.kenticocloud.com/tutorials/compose-and-link-content/create-content/composing-content-in-the-rich-text-editor#a-adding-images">Add an image</a>&nbsp;below this paragraph.</p><p><br/></p><p>To make your content available outside of Kentico Cloud, click <strong>Change workflow or publish </strong>on the right of the screen and then&nbsp;<strong>Publish</strong>&nbsp;your content.</p>
  </PageContent>)
}

const LandingPage = (): JSX.Element => {
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
}

const ProductDetailsPage = (): JSX.Element => {
  return (
  <PageContent>
    <h1>An amazing product that's great for everyone</h1>
    <img src="https://dev-preview-assets-eu-01.global.ssl.fastly.net:443/a7e13f86-7f42-0047-0e15-cdde6e902aca/8c81fa7b-6727-44d8-ab72-341dac7c6153/headless_horseman.png"/>
    <p>Each content item has its own workflow. That means products like this one can be at a different stage than the listing that contains them. So you can start describing a new product and include it in the listing but only publish it when it's ready. In the meantime, your landing page can show all your other great products.</p>
  </PageContent>)
}

function App() {
  return (
    <div className="App">
      <nav className="app-menu">
        <Link to="/">Home</Link>
        <Link to="/landing-page">Landing page</Link>
        <Link to="/product">Product</Link>
      </nav>

      <div className="app-content-wrapper">
        <Route path="/" exact component={HomePage}/>
        <Route path="/landing-page" component={LandingPage}/>
        <Route path="/product" component={ProductDetailsPage}/>
      </div>
    </div>
  );
}

export default App;
