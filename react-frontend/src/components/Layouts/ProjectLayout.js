import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import CartItemPage from "../CartItemPage/CartItemPage";
import VoucherPage from "../VoucherPage/VoucherPage";
import CategoryPage from "../CategoryPage/CategoryPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "cartItem":
                return <CartItemPage />;
case "voucher":
                return <VoucherPage />;
case "category":
                return <CategoryPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
