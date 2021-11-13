import React, { Fragment, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";

import { useVideos } from "../video";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Filters: React.FunctionComponent<{
  onClose: () => void;
}> = ({ onClose }) => {
  const {
    languages,
    technologies,
    selectedLanguages,
    setSelectedLanguages,
    selectedTechnologies,
    setSelectedTechnologies,
  } = useVideos();
  const panels = useMemo(
    () => [
      {
        items: technologies,
        title: "Technologies",
        selected: selectedTechnologies,
        setSelected: setSelectedTechnologies,
      },
      {
        items: languages,
        title: "Languages",
        selected: selectedLanguages,
        setSelected: setSelectedLanguages,
      },
    ],
    [
      languages,
      technologies,
      selectedTechnologies,
      setSelectedTechnologies,
      selectedLanguages,
      setSelectedLanguages,
    ]
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <dl className="space-y-6 divide-y divide-gray-200">
            {panels.map((panel) => (
              <Disclosure
                defaultOpen={true}
                as="div"
                key={panel.title}
                className="pt-6"
              >
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">
                          {panel.title}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2">
                      <p className="text-base text-gray-800 grid grid-cols-2">
                        {panel.items.map((item) => (
                          <div
                            key={`${panel.title}:${item}`}
                            className="relative flex items-start"
                          >
                            <div className="flex items-center h-5">
                              <input
                                aria-describedby={`${panel.title}_${item}`}
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                checked={panel.selected.includes(item)}
                                onClick={() => {
                                  if (panel.selected.includes(item)) {
                                    panel.setSelected(
                                      panel.selected.filter((i) => i !== item)
                                    );
                                  } else {
                                    panel.setSelected([
                                      ...panel.selected,
                                      item,
                                    ]);
                                  }
                                }}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label
                                htmlFor={`${panel.title}_${item}`}
                                className="font-medium text-gray-700"
                              >
                                {item}
                              </label>
                            </div>
                          </div>
                        ))}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="flex-grow">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setSelectedTechnologies([]);
              setSelectedLanguages([]);
              onClose();
            }}
          >
            <XCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Clear Filters
          </button>
        </div>
        <div className="flex-end">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              onClose();
            }}
          >
            <CheckCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoFilterPanel: React.FunctionComponent<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-10"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Filters
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <Filters onClose={onClose} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default VideoFilterPanel;
