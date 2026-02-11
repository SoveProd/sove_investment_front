import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NavBar } from "./NavBar";

export function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <Container className="flex items-center justify-between py-6">
        <NavBar />
        {/* Nav / MobileMenu */}
      </Container>
    </header>
  );
}
