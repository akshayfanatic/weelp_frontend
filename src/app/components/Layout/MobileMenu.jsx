import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRegions } from '@/hooks/api/public/region/region';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Badge } from '@/components/ui/badge';
import useMiniCartStore from '@/lib/store/useMiniCartStore';
import dynamic from 'next/dynamic';
import { CityList } from '../Modals/MegaMenu/MegaMenu';

const MiniCartNew = dynamic(() => import('../Modals/MiniCartNew', { ssr: false })); // lazy load minicart

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

// export function AccordionDemo() {
//   return (
//     <Accordion
//       type="single"
//       collapsible
//       className="w-full"
//       defaultValue="item-1"
//     >
//       <AccordionItem value="item-1">
//         <AccordionTrigger>Product Information</AccordionTrigger>
//         <AccordionContent className="flex flex-col gap-4 text-balance">
//           <p>
//             Our flagship product combines cutting-edge technology with sleek
//             design. Built with premium materials, it offers unparalleled
//             performance and reliability.
//           </p>
//           <p>
//             Key features include advanced processing capabilities, and an
//             intuitive user interface designed for both beginners and experts.
//           </p>
//         </AccordionContent>
//       </AccordionItem>x
//       <AccordionItem value="item-2">
//         <AccordionTrigger>Shipping Details</AccordionTrigger>
//         <AccordionContent className="flex flex-col gap-4 text-balance">
//           <p>
//             We offer worldwide shipping through trusted courier partners.
//             Standard delivery takes 3-5 business days, while express shipping
//             ensures delivery within 1-2 business days.
//           </p>
//           <p>
//             All orders are carefully packaged and fully insured. Track your
//             shipment in real-time through our dedicated tracking portal.
//           </p>
//         </AccordionContent>
//       </AccordionItem>
//       <AccordionItem value="item-3">
//         <AccordionTrigger>Return Policy</AccordionTrigger>
//         <AccordionContent className="flex flex-col gap-4 text-balance">
//           <p>
//             We stand behind our products with a comprehensive 30-day return
//             policy. If you&apos;re not completely satisfied, simply return the
//             item in its original condition.
//           </p>
//           <p>
//             Our hassle-free return process includes free return shipping and
//             full refunds processed within 48 hours of receiving the returned
//             item.
//           </p>
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   )
// }

export function MobileMenuSlider() {
  const { data, error, isLoading } = useRegions(); // get regions

  const menu = data?.data; // get menus

  return (
    <Sheet>
      <div className="flex justify-between items-center">
        <SheetTrigger asChild>
          <Button variant="link">
            <MenuIcon />
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

  console.log(regions);

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

        {regions.map((item) => {
          return (
            <NavigationMenuItem key={item?.slug} className="!ml-0">
              <span className="text-xl ">{item?.name}</span>
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
      {isMiniCartOpen && createPortal(<MiniCartNew />, document.body)}
    </div>
  );
};

// Dynamic Mega Menu Content
const MenuItemList = ({ selectedContinent = '' }) => {
  const { data: cityData, isLoading: isCityLoading, error: cityError } = useSWR(selectedContinent ? `/api/public/region/${selectedContinent}/getcities/` : null, fetcher);

  if (cityError) return <span className="text-red-400">Something Went Wrong</span>;
  if (isCityLoading) return <span className="loader"></span>;

  const citiesList = cityData?.data || [];

  return <CityList citiesList={citiesList} />;
};
