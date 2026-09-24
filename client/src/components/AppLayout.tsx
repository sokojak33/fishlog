import { Outlet } from "react-router";
import SignedInNavbar from "./SignedInNavbar";

function AppLayout() {
  return (
    <>
      <SignedInNavbar />
      <Outlet />
    </>
  );
}

export default AppLayout;
