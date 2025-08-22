"use client";

import { GET_USER_PROFILE_DETAILS } from "@/client/user/user.queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@apollo/client";
import {
  Bell,
  CreditCard,
  Edit2,
  Heart,
  LogOut,
  MapPin,
  Package,
  Save,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

// Types based on the schema
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

// Mock data - replace with actual data from your API
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
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  const sidebarItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const {
    data: userPeofileDetails,
    loading: userPeofileLoading,
    error: userPeofileError,
  } = useQuery(GET_USER_PROFILE_DETAILS);
  if (userPeofileLoading) console.log("Loading userPeofile");
  if (userPeofileError) console.log("userPeofile error", userPeofileError);

  console.log("userPeofileDetails-->", userPeofileDetails);
  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditingProfile(false);
  };

  const handleSaveAddress = (addressId: string) => {
    // Save address logic here
    setEditingAddress(null);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600";
      case "SHIPPED":
        return "text-blue-600";
      case "PROCESSING":
        return "text-yellow-600";
      case "CANCELLED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 w-full">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {user.firstName?.[0] || "U"}
                  </div>
                  <div>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                  <Separator className="my-4" />
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-muted text-red-600">
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    <Button
                      variant={isEditingProfile ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                    >
                      {isEditingProfile ? <X size={16} /> : <Edit2 size={16} />}
                      {isEditingProfile ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <Input
                        value={user.firstName || ""}
                        onChange={(e) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                        disabled={!isEditingProfile}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input
                        value={user.lastName || ""}
                        onChange={(e) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                        disabled={!isEditingProfile}
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        value={user.email}
                        disabled={true} // Email typically shouldn't be editable
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <Input
                        value={user.phone || ""}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        disabled={!isEditingProfile}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Gender
                      </label>
                      <Select disabled={!isEditingProfile}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Date of Birth
                      </label>
                      <Input type="date" disabled={!isEditingProfile} />
                    </div>
                  </div>
                  {isEditingProfile && (
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "addresses" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Addresses</CardTitle>
                    <Button>Add New Address</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <Card key={address.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">
                                  {address.label}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    address.type === "SHIPPING"
                                      ? "bg-blue-100 text-blue-800"
                                      : address.type === "BILLING"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {address.type}
                                </span>
                                {address.isDefault && (
                                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                    Default
                                  </span>
                                )}
                              </div>
                              {editingAddress === address.id ? (
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input
                                      placeholder="Address Line 1"
                                      defaultValue={address.line1}
                                    />
                                    <Input
                                      placeholder="Address Line 2"
                                      defaultValue={address.line2 || ""}
                                    />
                                    <Input
                                      placeholder="City"
                                      defaultValue={address.city}
                                    />
                                    <Input
                                      placeholder="State"
                                      defaultValue={address.state}
                                    />
                                    <Input
                                      placeholder="Country"
                                      defaultValue={address.country}
                                    />
                                    <Input
                                      placeholder="Postal Code"
                                      defaultValue={address.postalCode}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleSaveAddress(address.id)
                                      }
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingAddress(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-muted-foreground">
                                  <p>{address.line1}</p>
                                  {address.line2 && <p>{address.line2}</p>}
                                  <p>
                                    {address.city}, {address.state}{" "}
                                    {address.postalCode}
                                  </p>
                                  <p>{address.country}</p>
                                  {address.phone && (
                                    <p>Phone: {address.phone}</p>
                                  )}
                                </div>
                              )}
                            </div>
                            {editingAddress !== address.id && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingAddress(address.id)}
                              >
                                <Edit2 size={14} />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                Order #{order.orderNumber}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${order.total.toFixed(2)}
                              </p>
                              <p
                                className={`text-sm font-medium ${getStatusColor(
                                  order.status
                                )}`}
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Your wishlist is empty. Start adding items you love!
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === "payment" && (
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
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about your orders
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Toggle
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get text updates about deliveries
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Toggle
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Change Password</h3>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Current password" />
                        <Input type="password" placeholder="New password" />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                        />
                        <Button>Update Password</Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Language & Region</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Language
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Currency
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD</SelectItem>
                              <SelectItem value="eur">EUR</SelectItem>
                              <SelectItem value="gbp">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2 text-red-600">
                        Danger Zone
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}