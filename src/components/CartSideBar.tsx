"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useCartSidebarStore,
  useShoppingCartStore,
} from "@/state/shoppingCartStore";

const CartSidebar = () => {
  const { items, updateItemQuantity, removeItem } = useShoppingCartStore();
  const sideBarStore = useCartSidebarStore();
  const subtotalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleUpdateItemQuantity = (
    itemId: string,
    quantity: number,
    itemSize: string
  ) => {
    updateItemQuantity(itemId, quantity, itemSize);
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    productId: string,
    itemSize: string
  ) => {
    const newQuantity = parseInt(event.target.value, 10);
    handleUpdateItemQuantity(productId, newQuantity, itemSize);
  };

  return (
    <>
      <Transition.Root show={sideBarStore.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => sideBarStore.close()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => sideBarStore.close()}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {items.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/products/${product.slug}`}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <div className="flex flex-col">
                                          <p className="ml-4 whitespace-nowrap">
                                            $ {product.price * product.quantity}
                                          </p>
                                          <span className="self-end text-sm text-gray-500">
                                            {product.size.toUpperCase()}
                                          </span>
                                        </div>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">
                                        {product.description}
                                      </p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2 text-gray-500">
                                        <span>Qty</span>
                                        <select
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              e,
                                              product.id,
                                              product.size
                                            )
                                          }
                                          value={product.quantity}
                                          className="w-16 rounded-md border-gray-300 text-gray-500"
                                        >
                                          {[...Array(10)].map((_, index) => (
                                            <option
                                              key={index}
                                              value={index + 1}
                                            >
                                              {index + 1}
                                            </option>
                                          ))}
                                        </select>
                                        <span className="self-end text-gray-500">
                                          x ${product.price}
                                        </span>
                                      </div>

                                      <div className="flex">
                                        <button
                                          onClick={() => {
                                            removeItem(
                                              product.id,
                                              product.size
                                            );
                                          }}
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${subtotalPrice.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => sideBarStore.close()}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CartSidebar;
