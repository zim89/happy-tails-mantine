import { User2, Truck, LockKeyhole, FileText, BookUser } from "lucide-react";

export const profileMenu = [
  { id: 0, label: "My account", href: "/my-account", icon: User2 },
  { id: 1, label: "Order history", href: "/profile/order", icon: FileText },
  { id: 2, label: "Update your details", href: "/update-profile", icon: BookUser },
  { id: 3, label: "Update your password", href: "/change-password", icon: LockKeyhole },
  { id: 4, label: "Delivery addresses", href: "/devivery", icon: Truck },
]