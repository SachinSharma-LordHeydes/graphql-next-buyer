"use client";

import AddressesSection from "@/components/page/account/AddressesSection";
import NotificationsSection from "@/components/page/account/NotificationsSection";
import OrdersSection from "@/components/page/account/OrdersSection";
import PaymentMethodsSection from "@/components/page/account/PaymentMethodsSection";
import ProfileSection from "@/components/page/account/ProfileSection";
import SecuritySection from "@/components/page/account/SecuritySection";
import SettingsSection from "@/components/page/account/SettingsSection";
import SidebarNav from "@/components/page/account/SidebarNav";
import WishlistSection from "@/components/page/account/WishlistSection";
import { useState } from "react";
interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
}

interface Address {
  id: string;
  type: "SHIPPING" | "BILLING" | "BUSINESS" | "WAREHOUSE";
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string | null;
  isDefault: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";
  total: number;
  createdAt: string;
}

const mockUser: UserProfile = {
  id: "1",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
};

const mockAddresses: Address[] = [
  {
    id: "1",
    type: "SHIPPING",
    label: "Home",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    country: "USA",
    postalCode: "10001",
    phone: "+1234567890",
    isDefault: true,
  },
  {
    id: "2",
    type: "BILLING",
    label: "Office",
    line1: "456 Business Ave",
    line2: null,
    city: "New York",
    state: "NY",
    country: "USA",
    postalCode: "10002",
    phone: "+1234567891",
    isDefault: false,
  },
];

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    status: "DELIVERED",
    total: 299.99,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    status: "SHIPPED",
    total: 149.5,
    createdAt: "2024-01-20",
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(mockUser);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [orders] = useState(mockOrders);

  const renderActiveSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "addresses":
        return <AddressesSection setAddresses={setAddresses} />;
      case "orders":
        return <OrdersSection orders={orders} />;
      case "wishlist":
        return <WishlistSection />;
      case "payment":
        return <PaymentMethodsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "security":
        return <SecuritySection />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarNav
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1">{renderActiveSection()}</div>
        </div>
      </div>
    </div>
  );
}
