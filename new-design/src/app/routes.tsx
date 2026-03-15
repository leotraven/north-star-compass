import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AddGoal } from "./pages/AddGoal";
import { CheckAction } from "./pages/CheckAction";
import { Strategy } from "./pages/Strategy";
import { CreateStrategy } from "./pages/CreateStrategy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/add-goal",
    Component: AddGoal,
  },
  {
    path: "/check-action",
    Component: CheckAction,
  },
  {
    path: "/strategy",
    Component: Strategy,
  },
  {
    path: "/create-strategy",
    Component: CreateStrategy,
  },
]);
