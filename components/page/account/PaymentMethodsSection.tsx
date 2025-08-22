import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentMethodsSection() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment Methods</CardTitle>
          <Button>Add Payment Method</Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          No payment methods added yet.
        </p>
      </CardContent>
    </Card>
  );
}