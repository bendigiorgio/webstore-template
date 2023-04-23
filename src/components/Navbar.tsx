"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useScrollDirection from "@/utils/useScrollDirection";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCartSidebarStore,
  useShoppingCartStore,
} from "@/state/shoppingCartStore";

const navigation = [
  { name: "This Product", href: "#" },
  { name: "Our Design", href: "#" },
  { name: "About", href: "#" },
  { name: "Store", href: "/products" },
];

const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const getTotalItems = useShoppingCartStore();
  const totalItems = getTotalItems.getTotalItems();
  const sideBarState = useCartSidebarStore();
  return (
    <>
      <AnimatePresence>
        {scrollDirection === "up" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={"fixed left-0 top-0 z-10 h-16 w-screen"}
          >
            <Disclosure
              as="nav"
              className="bg-white/30 bg-opacity-10  text-[#070915] backdrop-blur-sm backdrop-filter"
            >
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                          <a href="/">
                            <img
                              className="block h-12 w-auto lg:hidden"
                              src="/MDLogo.png"
                              alt="Your Company"
                            />
                            <img
                              className="hidden h-12 w-auto lg:block"
                              src="/MDLogo.png"
                              alt="Your Company"
                            />
                          </a>
                        </div>
                        <div className="hidden items-center sm:ml-6 sm:flex">
                          <div className="flex space-x-4">
                            {navigation.map((item, index) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className=" rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                          onClick={() => sideBarState.open()}
                          type="button"
                          className="rounded-full p-1  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View Cart</span>
                          <div className="relative flex items-center">
                            <span className="absolute -right-2 top-0 z-20 h-4 w-4 rounded-full bg-[#070915] text-center  text-xs font-bold text-white">
                              {totalItems ? totalItems : 0}
                            </span>
                            <ShoppingCartIcon
                              className="h-8 w-8"
                              aria-hidden="true"
                            />
                          </div>
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    My Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    My Orders
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className=" block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
