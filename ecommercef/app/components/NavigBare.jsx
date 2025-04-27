'use client'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = {
  categories: [
    {
      id: 'Nos produit',
      name: 'Nos produit',
      featured: [
        {
          name: 'New Arrivals',
          href: '/new-arrivals',
          imageSrc:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOPpEZWs5-aif5n5F7nih-2EJyB9H6s6_bg&s',
          imageAlt: 'New arrival products'
        },
        {
          name: 'Best Sells',
          href: '/best-sellers',
          imageSrc:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHd38Zas18mXcXoqRWzDdzqAKZlVqyqZCkCre8N7BYsHzWli_mb8flP4IBj_NUCfWfHw&usqp=CAU',
          imageAlt: 'Best selling products'
        },
      ],
      sections: [
        {
          id: 'Nos produits',
          name: 'Nos produits',
          items: [
            { name: 'Smart Phones', href: '/products/smartphones' },
            { name: 'Cameras', href: '/products/cameras' },
            { name: 'Smart watches', href: '/products/smartwatches' },
            { name: 'PC Portables', href: '/products/laptops' },
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
          imageSrc:
            'https://specials-images.forbesimg.com/imageserve/61d8a1eb3a9cf24443034ea8/Asus-Zenbook-17-Fold-OLED/960x0.jpg?fit=scale',
          imageAlt: 'Premium new arrivals'
        },
        {
          name: 'Best Sells',
          href: '/premium/best-sellers',
          imageSrc:
            'https://static.wui.fr//photos/319808/zoom-ces-2022--%C2%A010-nouveaut%C3%A9s-fun-et-high-tech-%C3%A0-las-vegas.jpg',
          imageAlt: 'Premium best sellers'
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
    { name: 'Company', href: '/about' },
    { name: 'Stores', href: '/stores' },
  ],
}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-black">
      <Dialog open={open} onClose={setOpen} className="relative z-[1000] lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-black pb-12 shadow-xl z-[1001]">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <TabGroup className="mt-2">
              <div className="border-b border-gray-700">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-white data-selected:border-white data-selected:text-white ml-8"
                      style={{ fontSize: '2em', fontWeight: '500', lineHeight: '1em' }}
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm h-full">
                          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                            <img
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              className="h-full w-full object-cover group-hover:opacity-75"
                            />
                          </div>
                          <Link href={item.href} className="mt-6 block font-medium text-white">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </Link>
                          <p aria-hidden="true" className="mt-1 text-gray-300">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-bold italic text-white text-xl">
                          {section.name}
                        </p>
                        <ul className="mt-6 flex flex-col space-y-6 items-center">
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root text-center">
                              <a href={item.href} className="-m-2 block p-2 text-gray-300 text-lg italic">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-12 border-t border-gray-700 px-6 py-8">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link href={page.href} className="-m-2 block p-2 font-medium text-white">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-black">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-700">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Logo or other elements can go here */}
              </div>

              <div className="flex items-center justify-center">
                <PopoverGroup className="hidden lg:flex lg:gap-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton
                          className="relative z-10 flex items-center border-b-2 border-transparent pt-px text-white hover:text-gray-300 data-open:border-white"
                          style={{  fontSize: '1.1rem',
                            fontWeight: '300', 
                            letterSpacing: '0.5px', 
                            fontFamily: '"SF Pro Display", "Helvetica Neue", sans-serif'  }}
                        >
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel className="absolute z-10 inset-x-0 top-full text-sm text-white">
                        <div className="absolute inset-0 top-1/2 bg-black shadow" aria-hidden="true" />
                        <div className="relative bg-black">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 h-64">
                                      <img
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <a href={item.href} className="mt-6 block font-medium text-white">
                                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                                      {item.name}
                                    </a>
                                    <p className="text-gray-300">Shop now</p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p className="font-bold italic text-white text-xl">
                                      {section.name}
                                    </p>
                                    <ul className="mt-6 space-y-6 sm:space-y-4 flex flex-col items-center">
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex justify-center">
                                          <a href={item.href} className="hover:text-white text-gray-300 text-lg italic">
                                            {item.name}
                                          </a>
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
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-xl font-bold text-white hover:text-gray-300"
                    >
                      {page.name}
                    </a>
                  ))}
                </PopoverGroup>
              </div>

              <div className="flex items-center">
                <a href="#" className="flex items-center text-gray-300 hover:text-white">
                  {/* Shopping bag or other icons can go here */}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}