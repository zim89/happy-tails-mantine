import { OrderTabs } from "../components/OrderTabs";

function OrderPage() {
  return (
    <>
    <h1 className="hidden lg:block text-4xl leading-[43.2px] mb-6">Order History</h1>    
    <OrderTabs />
    </>
  );
}

export default OrderPage;