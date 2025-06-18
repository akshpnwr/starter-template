import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BuildingIcon, Building, Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-4 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-0">
        <div className="mr-4 hidden md:flex md:gap-8">
          <div className="mr-6 flex items-center space-x-2">
            <BuildingIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Real Estate
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link className="text-sm" to="/dashboard">
              Dashboard
            </Link>
          </nav>
        </div>
        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-lg hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-16 w-16" size="30px" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetTitle className="sr-only">Mobile menu</SheetTitle>
            <SheetDescription className="sr-only">
              This is the mobile menu
            </SheetDescription>
            <Button
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Building className="mr-2 h-4 w-4" />
              <span className="font-bold">Real Estate</span>
            </Button>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10">
              <div className="flex flex-col space-y-3">
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </div>
              {/* <div className="flex flex-row items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  className="justify-start w-fit min-w-20"
                  asChild
                >
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button className="justify-start w-fit min-w-20" asChild>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div> */}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/auth/register">Sign up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
