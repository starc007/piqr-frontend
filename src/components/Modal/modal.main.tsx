import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { ModalProps } from "./typings";
import { DeleteSVG } from "@assets/index";
import { Button } from "..";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  children,
  title,
  cls,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as="div"
            enter="ease-in "
            enterFrom="opacity-0"
            enterTo="opacity-100 "
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo=" opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50 blur-[6px]" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-bottom sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="translate-y-40 opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`inline-block bg-white text-left overflow-hidden shadow transform transition-all align-middle w-full rounded-xl font-poppins ${cls}`}
            >
              <div className="flex justify-between p-5">
                <Dialog.Title className="font-medium text-dark capitalize">
                  {title}
                </Dialog.Title>
                <Button variant="tertiary" onClick={closeModal}>
                  <DeleteSVG className="w-5" />
                </Button>
              </div>

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
