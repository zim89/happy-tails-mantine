import { User2, Truck, LockKeyhole, FileText, BookUser } from "lucide-react";

export const profileMenu = [
  { id: 0, label: "My account", href: "/profile/", icon: User2 },
  { id: 1, label: "Order history", href: "/profile/order", icon: FileText },
  { id: 2, label: "Update your details", href: "/profile/update", icon: BookUser },
  { id: 3, label: "Update your password", href: "/profile/pw-change", icon: LockKeyhole },
  { id: 4, label: "Delivery addresses", href: "/profile/devivery", icon: Truck },
]