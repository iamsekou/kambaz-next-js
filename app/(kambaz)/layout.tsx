"use client";

import { Provider } from "react-redux";
import store from "./store";
import Session from "./account/session";
import KambazNavigation from "./navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session>
        <div className="d-flex" id="wd-kambaz">
          <div className="d-none d-md-block">
            <KambazNavigation />
          </div>
          <div className="flex-fill wd-main-content-offset">{children}</div>
        </div>
      </Session>
    </Provider>
  );
}