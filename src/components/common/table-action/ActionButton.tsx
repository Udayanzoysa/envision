import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ActionButton = ({ data, actions }: any) => {
  return (
    <div className="flex items-center gap-2 w-full h-full">
      {actions.map((action: any, index: any) => {
        const Icon =
          action.label === "Edit" ? (
            <PencilIcon className="h-5 w-5" />
          ) : action.label === "Delete" ? (
            <TrashIcon className="h-5 w-5" />
          ) : null;

        const buttonColor =
          action.label === "Edit"
            ? "bg-teal-500 text-white hover:bg-teal-600"
            : action.label === "Delete"
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-300 text-black hover:bg-gray-400";

        return (
          <button
            key={index}
            className={`p-2 rounded-full ${buttonColor}`}
            onClick={() => action.onClick(data)}
            aria-label={action.label}
          >
            {Icon}
          </button>
        );
      })}
    </div>
  );
};

export default ActionButton;
