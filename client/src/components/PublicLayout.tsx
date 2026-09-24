import { Outlet } from "react-router";
import PublicNavbar from "./PublicNavbar";

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
}

export default PublicLayout;
