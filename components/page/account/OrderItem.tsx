import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function getStatusColor(status) {
}

export default function OrderItem({ order }) {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Order #{order.orderNumber}</p>
            <p className="text-sm text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">${order.total.toFixed(2)}</p>
            <p
              className={`text-sm font-medium ${getStatusColor(order.status)}`}
            >
              {order.status}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-3 space-x-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          {order.status === "DELIVERED" && (
            <Button variant="outline" size="sm">
              Reorder
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
