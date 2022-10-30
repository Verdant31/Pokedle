import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import * as React from 'react';

interface IHowToPlayProps {
    isOpen: boolean;
    toggleModal: () => void;
}

const HowToPlay: React.FC<IHowToPlayProps> = ({isOpen, toggleModal}) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={toggleModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-[340px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Pokedle Quick Start
                        </Dialog.Title>
                        <div className="mt-2">
                            <div className="text-sm text-gray-500 gap-y-2 flex flex-col">
                                <div>
                                    Our two games (
                                    <span className="italic font-semibold"> Classic</span> and
                                    <span className="italic font-semibold"> Find out</span> ) are much the same.
                                    <div className="my-1"/>
                                    <p>You will have to first chose a random Pokemon, and based on the
                                    clues you will have to guess the Pokemon.</p>
                                    <div className="my-1"/>
                                    <p>The main indicators are:</p>
                                </div>
                                <div className="w-full flex items-center justify-center gap-x-4 my-4">
                                    <div className="h-16 w-20 bg-[#16a34a] flex items-center justify-center">
                                        <p className="text-white font-bold">Correct</p>
                                    </div>
                                    <div className="h-16 w-20 bg-[#d97706] flex items-center justify-center">
                                        <p className="text-white font-bold">Partial</p>
                                    </div>
                                    <div className="h-16 w-20 bg-[#dc2626] flex items-center justify-center">
                                        <p className="text-white font-bold">Incorrect</p>
                                    </div>
                                </div>
                                <p>
                                    In cases like unit mesures (Height, Weight, Stats...)
                                    you will have clues like {"<<"} (less than) 
                                    or {">>"} (greater than) and that is relative to the Pokemon you chose.
                                </p>
                                <p>
                                    Example: 10 {"<<"} means that the pokemon you chosen has 10 as that
                                    attribute and the one you are guessing has a smaller value.
                                </p>
                            </div>
                        </div>
                           
                        <div className="mt-4">
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            onClick={toggleModal}
                            >
                            <p className="text-white font-bold">Got it, thanks!</p>
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default HowToPlay;
