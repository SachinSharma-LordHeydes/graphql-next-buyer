import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderItem from "./OrderItem";
export default function OrdersSection({ orders }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
