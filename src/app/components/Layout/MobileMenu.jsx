import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRegions } from '@/hooks/api/public/region/region';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import Minicart from '../Modals/Minicart';
import useMiniCartStore from '@/lib/store/useMiniCartStore';
import { createPortal } from 'react-dom';
import { Badge } from '@/components/ui/badge';

export function MobileMenuSlider() {
  return (
    <Sheet>
      <div className="flex justify-between items-center">
        <SheetTrigger asChild>
          <Button variant="link">
            <MenuIcon />{' '}
          </Button>
        </SheetTrigger>

        {/* Site Logo */}
        <div className="logo">
          <Link href="/">
            <Image src="/assets/images/SiteLogo.png" alt="Logo" width={120} height={120} />
          </Link>
        </div>

        {/* Mobile Account and MiniCart */}
        <HeaderAccountMobile />
      </div>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">Make changes to your profile here. Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>

        {/* Site Logo */}
        <div className="logo">
          <Link href="/">
            <Image src="/assets/images/SiteLogo.png" alt="Logo" width={120} height={120} />
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <NavigationMenuMobile />
      </SheetContent>
    </Sheet>
  );
}

// Nav Items
const NavigationMenuMobile = () => {
  const { data, isLoading: isRegionLoading, error: isRegionError } = useRegions(); // fetch region through api
  const [menuList, setMenuList] = useState('');

  if (isRegionError) return <span className="text-red-400">Someting went wrong</span>;
  if (isRegionLoading) return <span className="loader"></span>;

  const regions = data?.data || [];

  // navigation
  const staticNavigation = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Hover Card',
      href: '/docs/primitives/hover-card',
    },
    {
      title: 'Progress',
      href: '/docs/primitives/progress',
    },
  ];
  return (
    <NavigationMenu className="flex-col">
      <NavigationMenuList className="flex-col items-start w-full gap-2">
        {staticNavigation.map(({ title, href }, index) => {
          return (
            <NavigationMenuItem key={index} className="!ml-0">
              <Link href={href} className="text-xl ">
                {title}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>

      {/* Seprator */}
      <Separator />
    </NavigationMenu>
  );
};

// My Account Mobile
const HeaderAccountMobile = () => {
  const { isMiniCartOpen, setMiniCartOpen, cartItems } = useMiniCartStore(); //mini cart store

  // HanldeShowCart
  const handleShowCart = () => {
    setMiniCartOpen(!isMiniCartOpen);
  };
  return (
    <div>
      <div className="flex gap-4">
        <button className="relative" onClick={handleShowCart}>
          <ShoppingCart className="text-xs" size={20} />
          {cartItems?.length > 0 && <Badge className={'absolute bottom-1/4  left-1/2 scale-75 '}>{cartItems?.length}</Badge>}
        </button>
        <Link href="/user/login">
          <UserRound />
        </Link>
      </div>

      {/* Minicart */}
      {isMiniCartOpen && createPortal(<Minicart showCart={isMiniCartOpen} setShowCart={setMiniCartOpen} />, document.body)}
    </div>
  );
};
