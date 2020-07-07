import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavPage from "./components/views/NavPage/NavPage";
import TestPage from "./components/views/TestPage/TestPage";
import DefaultPage from "./components/views/DefaultPage/DefaultPage";
import UploadVideoPage from "./components/views/UploadVideoPage/UploadVideoPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./components/views/SubscriptionPage/SubscriptionPage";
import Auth from "./hoc/Auth";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavPage />
      <div
        style={{
          paddingTop: "75px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/subscription"
            component={Auth(SubscriptionPage, true)}
          />
          <Route
            exact
            path="/video/upload"
            component={Auth(UploadVideoPage, true)}
          />
          <Route
            exact
            path="/video/:id"
            component={Auth(VideoDetailPage, null)}
          />
          <Route exact path="/test" component={TestPage} />
          <Route component={DefaultPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
