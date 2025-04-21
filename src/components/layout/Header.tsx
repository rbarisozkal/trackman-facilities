"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#2C2C2C] text-white flex items-center justify-center px-2">
      <div className="w-[74rem] py-4 flex items-center justify-start gap-12">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/trackman-logo.svg"
              alt="Trackman Logo"
              width={240}
              height={240}
            />
          </Link>
        </div>

        <nav className="flex space-x-6 items-center">
          <Link href={"/"} className={pathname === "/" ? "font-bold" : ""}>Facilities</Link>
          <Link href={"/locations"} className={pathname === "/locations" ? "font-bold" : ""}>Locations</Link>
          <Link href={"/players"} className={pathname === "/players" ? "font-bold" : ""}>Players</Link>
          <Link href={"/access-management"} className={pathname === "/access-management" ? "font-bold" : ""}>Access Management</Link>
        </nav>
      </div>
    </header>
  );
}
