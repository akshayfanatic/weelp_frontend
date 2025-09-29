import React from 'react';
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
// import MegaMenu from '../Modals/MegaMenu';

const MegaMenu = dynamic(() => import('../Modals/MegaMenu/MegaMenu'), { ssr: false });

const navMenuItems = [
  {
    title: 'Tour & Experience',
    href: '/tours',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Transfer & Holidays',
    href: '/transfers',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Explore',
    href: '/docs/primitives/progress',
    description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
];
const NavMenuDesktop = () => {
  return (
    <NavigationMenu viewport={'false'} className="w-fit menu z-20">
      <NavigationMenuList className="flex gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MegaMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Navigaitons */}
        {navMenuItems.map((nav, index) => {
          return (
            <Button key={index} asChild variant="link">
              <Link href={nav.href}>{nav.title}</Link>
            </Button>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenuDesktop;

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
