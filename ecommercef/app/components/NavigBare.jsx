'use client';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { appleImg, searchImg, bagImg } from '../utils';

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = {
  categories: [
    {
      id: 'Nos produit',
      name: 'Nos produit',
      featured: [
        {
          name: 'New Arrivals',
          href: '/new-arrivals',
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOPpEZWs5-aif5n5F7nih-2EJyB9H6s6_bg&s',
          imageAlt: 'New arrival products',
        },
        {
          name: 'Best Sells',
          href: '/best-sellers',
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHd38Zas18mXcXoqRWzDdzqAKZlVqyqZCkCre8N7BYsHzWli_mb8flP4IBj_NUCfWfHw&usqp=CAU',
          imageAlt: 'Best selling products',
        },
      ],
      sections: [
        {
          id: 'Nos produits',
          name: 'Nos produits',
          items: [
            { name: 'Smartwatch', href: '/products/smartphones' },
            { name: 'Home Appliances', href: '/products/cameras' },
            { name: 'PC & Laptop', href: '/products/smartwatches' },
            { name: 'Headphones & Airpods', href: '/products/laptops' },
            { name: 'Phone & Tablet', href: '/products/cameras' },
            { name: 'Accessories', href: '/products/smartwatches' },
          ],
        },
      ],
    },
    {
      id: 'premium-products',
      name: 'Nos produits premium',
      featured: [
        {
          name: 'New Arrivals',
          href: '/premium/new-arrivals',
          imageSrc: 'https://specials-images.forbesimg.com/imageserve/61d8a1eb3a9cf24443034ea8/Asus-Zenbook-17-Fold-OLED/960x0.jpg?fit=scale',
          imageAlt: 'Premium new arrivals',
        },
        {
          name: 'Best Sells',
          href: '/premium/best-sellers',
          imageSrc: 'https://static.wui.fr//photos/319808/zoom-ces-2022--%C2%A010-nouveaut%C3%A9s-fun-et-high-tech-%C3%A0-las-vegas.jpg',
          imageAlt: 'Premium best sellers',
        },
      ],
      sections: [
        {
          id: 'Nos produits',
          name: 'Nos produits',
          items: [
            { name: 'Smart Phones', href: '/premium/smartphones' },
            { name: 'Cameras', href: '/premium/cameras' },
            { name: 'Smart watches', href: '/premium/smartwatches' },
            { name: 'PC Portables', href: '/premium/laptops' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '/aboutus' },
    { name: 'Stores', href: '/stores' },
  ],
};

export default function Example() {
  const [cartCount, setCartCount] = useState(0);
  const [activeNav, setActiveNav] = useState('');

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
  };

  return (
    <div className="bg-black">
      <header className="relative bg-black z-50">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center ml-100">
              <Image src="/logoWeb.svg" alt="logo" width={50} height={50} />
            </div>

            {/* Main navigation */}
            <PopoverGroup className="hidden lg:flex lg:gap-x-8 z-50">
              {navigation.categories.map((category) => (
                <Popover key={category.name} className="flex">
                  <div className="relative flex">
                    <PopoverButton
                      className={`relative z-10 flex items-center pt-px text-sm font-medium ${
                        activeNav === category.name ? 'text-white' : 'text-gray-400'
                      } hover:text-white transition-colors`}
                      onClick={() => handleNavClick(category.name)}
                    >
                      {category.name}
                    </PopoverButton>
                  </div>

                  {/* Panel */}
                  <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-400 z-0 pointer-events-none">
                    <div className="absolute inset-0 top-1/2 bg-black shadow-sm" />
                    <div className="relative bg-black pointer-events-auto">
                      <div className="mx-auto max-w-7xl px-8">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                          <div className="col-start-2 grid grid-cols-2 gap-x-8">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-base sm:text-sm">
                                <img
                                  alt={item.imageAlt}
                                  src={item.imageSrc}
                                  className="aspect-square w-full rounded-lg bg-gray-800 object-cover group-hover:opacity-75"
                                />
                                <Link
                                  href={item.href}
                                  className="mt-6 block font-medium text-white"
                                  onClick={addToCart}
                                >
                                  {item.name}
                                </Link>
                                <p className="mt-1 text-gray-400">Shop now</p>
                              </div>
                            ))}
                          </div>
                          <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                            {category.sections.map((section) => (
                              <div key={section.name}>
                                <p className="font-medium text-white">{section.name}</p>
                                <ul className="mt-6 space-y-6">
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <Link
                                        href={item.href}
                                        className="-m-2 block p-2 text-gray-400 hover:text-white"
                                        onClick={addToCart}
                                      >
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </Popover>
              ))}

              {/* Static Pages */}
              {navigation.pages.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`text-sm font-medium ${
                    activeNav === page.name ? 'text-white' : 'text-gray-400'
                  } hover:text-white transition-colors`}
                  onClick={() => handleNavClick(page.name)}
                >
                  {page.name}
                </Link>
              ))}
            </PopoverGroup>

            {/* Cart */}
            <div className="flex items-center space-x-4">
              <button
                onClick={addToCart}
                className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">{cartCount > 0 ? cartCount : ''}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
