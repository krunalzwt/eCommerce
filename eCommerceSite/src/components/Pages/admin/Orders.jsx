import { useContext, useEffect } from "react";
import { ShopContext } from "../../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const { allOrders, fetchAllOrders, updateOrderStatus } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role !== "admin") {
      alert("Access denied. Only admins can view orders.");
      return;
    }

    fetchAllOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="profile-orders">
      <div className="profile-info">
        <div className="profile-heading">
          <div className="profile-title">
            <h1>Orders</h1>
          </div>
        </div>
      </div>
      <div className="orders">
        <div className="cartitems-format-main">
          <p>Order ID</p>
          <p>User ID</p>
          <p>Total Price</p>
          <p>Status</p>
        </div>

        {allOrders && allOrders.length > 0 ? (
          allOrders.map((order, index) => (
            <div key={index} className="cartitems-format cartitems-format-main">
              <p>{order.id}</p>
              <p>{order.user_id}</p>
              <p>&#8377;{order.total_price}</p>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          ))
        ) : (
          <p>No Order History!</p>
        )}
      </div>
    </div>
  );
};
