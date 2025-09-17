'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MegaMenu from '../Modals/MegaMenu';
import { Globe, Headphones, DollarSign, MapPin, UserRound, ChevronRight, ShoppingCart, Search } from 'lucide-react';
import { useUIStore } from '@/lib/store/uiStore';
import { useIsClient } from '@/hooks/useIsClient';

const Header = () => {
  const isClient = useIsClient(); // hydration
  const isMobile = useIsMobile(); //
  const [showmegaMenu, setShowMegaMenu] = useState(false);
  const { stickyHeader, setStickyHeader } = useUIStore();

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  // sticky header
  const isSticky = () => {
    if (window.scrollY > 50) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  };

  // Show MegaMenu
  const handleMegaMenu = () => {
    setShowMegaMenu(!showmegaMenu);
  };

  if (isClient) {
    return (
      <header className={`block w-full border-b-2 ${stickyHeader ? 'fixed z-[12]' : ''}`}>
        
        {/* Desktop Topbar */}
        <div className="relative hidden lg:block">
          {/* Top Bar */}
          <div className={`${stickyHeader ? 'hidden' : 'flex'} text-black bg-Brightgray px-12 py-4 w-full items-center justify-between `}>
            <div className="topheader offer flex space-x-6">
              <Link href={'/region/asia'}>Country</Link>

              <a href="/Get Exclusive offer on the App" className="text-Nileblue text-sm">
                Get Exclusive offer on the App
              </a>
              <a href="/Helpline" className="flex items-center text-Nileblue text-sm">
                <Headphones className="mr-2" />
                Helpline
              </a>
            </div>

            <div className="topheader-language flex space-x-6">
              <a href="/Get Exclusive offer on the App" className="flex items-center text-Nileblue text-sm">
                <Globe className="mr-2" />
                English
              </a>
              <a href="/Helpline" className="flex items-center text-Nileblue text-sm">
                <DollarSign className="mr-2" />
                Helpline
              </a>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="flex text-black px-12 py-4 w-full items-center bg-white">
            <div className="logo">
              <Link href="/">
                <img src="/assets/images/SiteLogo.png" alt="Logo" className="h-10" />
              </Link>
            </div>
            <nav className="flex menu flex-grow justify-center space-x-10 flex-wrap">
              <button className="relative flex items-center text-Bluewhale font-medium" onClick={handleMegaMenu}>
                {/* This is Mega Menu Handle */}
                <MapPin className="mr-2" />
                Explore Destinations
                {/* Mega Menu Absolute */}
                {showmegaMenu && <MegaMenu setShowMegaMenu={setShowMegaMenu} showmegaMenu={showmegaMenu} />}
              </button>
              <Link href="/" className="text-Bluewhale font-medium">
                Tours & Experiences
              </Link>
              <Link href="/transfers" className="text-Bluewhale font-medium">
                Transfers
              </Link>
              <Link href="/holiday" className="text-Bluewhale font-medium">
                Trips
              </Link>
              <Link href="/explore" className="text-Bluewhale font-medium">
                Explore
              </Link>
            </nav>

            {/* Account  */}
            <HeaderAccount />
          </div>
        </div>

        {/* Mobile Topbar */}
        <div className="relative lg:hidden">
          <div className={`${stickyHeader ? 'hidden' : 'flex'} text-black bg-Brightgray px-12 py-4 w-full items-center justify-between `}>
            <Link href="/Helpline" className="flex items-center text-Nileblue text-sm">
              <Headphones className="mr-2" />
              Helpline
            </Link>

            <div className="topheader-language flex space-x-6">
              <Link href="/Get Exclusive offer on the App" className="flex items-center text-Nileblue text-sm">
                <Globe className="mr-2" />
                English
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="p-2 bg-white">
            <MobileMenuSlider />
          </div>
        </div>
      </header>
    );
  }
};

export default Header;

/** Account Menu */
import { createPortal } from 'react-dom';
import Minicart from '../Modals/Minicart';
import ModalForm from '../Modals/ModalForm';
import SubmenuAccount from '../Modals/SubmenuAccount';
import useMiniCartStore from '@/lib/store/useMiniCartStore';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenuSlider } from './MobileMenu';

export const HeaderAccount = () => {
  const { isMiniCartOpen, setMiniCartOpen, cartItems } = useMiniCartStore(); //mini cart store
  const [showCart, setShowCart] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(null);
  const [showForm, setShowForm] = useState(null);

  // for handle Submenu
  const handleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  // Handle handleShowForm
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  // HanldeShowCart
  const handleShowCart = () => {
    setMiniCartOpen(!isMiniCartOpen);
  };

  return (
    <div>
      <ul className="flex items-center gap-6">
        {/* forspacing */}
        <li className="appearance-none"></li>
        <li className="appearance-none"></li>

        <li>
          <button className="relative" onClick={handleShowCart}>
            <ShoppingCart className="text-xs" size={20} />
            {cartItems?.length > 0 && <Badge className={'absolute bottom-1/4  left-1/2 scale-75 '}>{cartItems?.length}</Badge>}
          </button>
        </li>
        <li>
          <button onClick={handleShowForm}>
            <Search className="text-xs" size={20} />
          </button>
        </li>

        <li>
          <button className="flex items-center gap-1 py-1 px-2 border border-gray-300 rounded-full shadow-sm transition" onClick={handleSubmenu}>
            <div className="w-8 h-8 bg-[#b3b3b3] rounded-full  flex items-center justify-center ">
              <UserRound className="text-gray-600 fill-white stroke-white w-5 h-5 scale-125" />
            </div>

            <ChevronRight
              className={`transition-transform ease-in-out duration-500 ${showSubmenu ? 'rotate-0' : 'rotate-90'}`}
              size={16} // Optional: adjust icon size
            />
          </button>
        </li>
      </ul>

      {/* AccountSubMenu */}

      {showSubmenu && <SubmenuAccount showSubmenu={showSubmenu} setShowSubmenu={setShowSubmenu} />}

      {/* Show Form */}
      <ModalForm showForm={showForm} setShowForm={setShowForm} handleShowForm={handleShowForm} />

      {/* Mini Cart With React Portal */}
      {isMiniCartOpen && createPortal(<Minicart showCart={isMiniCartOpen} setShowCart={setMiniCartOpen} />, document.body)}
    </div>
  );
};
