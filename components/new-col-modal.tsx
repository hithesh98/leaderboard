"use client";

import { Board} from "@/db/types";
import Button from "./ui/button";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface NewColModalProps {
  setShowNewCol: (show: boolean) => void;
  board: Board;
}
export default function NewColModal({
  setShowNewCol,
  board,
}: NewColModalProps) {
  const selectedColumns = board.columns.map((obj: any) => obj.key);
  const allColumns = [
    "player_name",
    "xp",
    "kills",
    "time_played",
    "deaths",
    "lap_time",
  ];
  const availableMetrics = allColumns.filter(
    (key) => !selectedColumns.includes(key)
  );
  const [currentlySelected, setCurrentlySelected] = useState(
    availableMetrics[0]
  );
  const [label, setLabel] = useState("");

  async function handleSave() {
    const response = await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_name: board.board_name,
        data: {
          key: currentlySelected,
          header: label,
        },
      }),
    });
    if (response.ok) {
      board.columns.push({ key: currentlySelected, header: label });
      setShowNewCol(false);
    } else {
      console.log("Error adding column");
      console.log(response);
    }
  }
  return (
    <div className="absolute bottom-0 w-full h-1/2 bg-slate-100 text-black pl-3 flex flex-col">
      <h1 className="my-4">{`Add New Column to ${board.label}`}</h1>
      <div className="flex-grow">
        <div className="flex mb-2">
          <p>Metrics:</p>
          <Listbox value={currentlySelected} onChange={setCurrentlySelected}>
            <div className="relative w-[200px]">
              <Listbox.Button className="relative w-full cursor-default  bg-white  pl-2 text-left focus:outline-none   focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{currentlySelected}</span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {availableMetrics.map((metric) => (
                    <Listbox.Option
                      key={metric}
                      className={({ active }) =>
                        `relative cursor-default select-none text-center py-2 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={metric}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {metric}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex">
          <p>Label:</p>
          <input
            type="text"
            maxLength={20}
            className="w-[200px] text-sm pl-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="highlight" onClick={handleSave}>
          Save
        </Button>
        <Button variant="ghost" onClick={() => setShowNewCol(false)}>
          Close
        </Button>
      </div>
    </div>
  );
}
