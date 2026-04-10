import { createBrowserRouter } from "react-router";
import { LoginPage } from "./components/LoginPage";
import { ProfilePage } from "./components/ProfilePage";
import { JobSearchPage } from "./components/JobSearchPage";
import { NetworkPage } from "./components/NetworkPage";
import { MessagesPage } from "./components/MessagesPage";
import { AppliedPage } from "./components/AppliedPage";

export const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  { path: "/profile", Component: ProfilePage },
  { path: "/jobs", Component: JobSearchPage },
  { path: "/network", Component: NetworkPage },
  { path: "/messages", Component: MessagesPage },
  { path: "/applied", Component: AppliedPage },
]);
