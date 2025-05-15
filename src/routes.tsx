import { Navigate, Route, Routes as RRDomRoutes } from "react-router-dom";

import { EUserType } from "@/modules/shared/types/user-type";

import { IndexPage } from "./pages/index";
import { AuthPage } from "./pages/auth";
import { AdminOwnerPage } from "./pages/admin/owner";
import { AdminWaiterPage } from "./pages/admin/waiter";

const Routes = () => (
  <RRDomRoutes>
    <Route index element={<IndexPage />} />
    <Route element={<AdminOwnerPage />} path="/admin/owner" />
    <Route element={<AdminWaiterPage />} path="/admin/waiter" />
    <Route element={<AuthPage userType={EUserType.CLIENT} />} path="/auth" />
    <Route
      element={<AuthPage userType={EUserType.OWNER} />}
      path="/admin/owner/auth"
    />
    <Route
      element={<AuthPage userType={EUserType.WAITER} />}
      path="/admin/waiter/auth"
    />
    <Route element={<Navigate to="/" />} path="*" />
  </RRDomRoutes>
);

export { Routes };
