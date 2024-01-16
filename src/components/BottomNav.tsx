import {
  HomeIcon,
  PlusCircleIcon,
  BellIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/Search", icon: MagnifyingGlassIcon, label: "Search" },
    { href: "/Add", icon: PlusCircleIcon, label: "Add" },
    { href: "/Activity", icon: BellIcon, label: "Activity" },
    { href: "/Profile", icon: UserIcon, label: "Profile" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-900 text-white z-50 shadow-lg">
      <nav className="flex justify-around items-center p-2">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
              className={`flex flex-col items-center px-2 py-1 ${
                pathname === href
                  ? "text-blue-500"
                  : "hover:text-gray-300"
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{label}</span>
           
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavBar;
