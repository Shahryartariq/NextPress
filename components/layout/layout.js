import MainNavigation from "./main-navigation";
import Providers from "../../pages/providers";

const Layout = (props) => {
  return (
    <Providers>
      <MainNavigation />
      <main>{props.children}</main>
    </Providers>
  );
};

export default Layout;
