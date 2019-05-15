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
  <div>
    <h1>Landing page</h1>
    <p></p>
  </div>)
}

const ProductPage = (): JSX.Element => {
  return (
  <div>
    <h1>Product page</h1>
    <p></p>
  </div>)
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
        <Route path="/product" component={ProductPage}/>
      </div>
    </div>
  );
}

export default App;
