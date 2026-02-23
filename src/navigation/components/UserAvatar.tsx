import { useState } from "react";
import useSharedProfile from "../../shared/store/useSharedProfile";
import { WorkStatus } from "../../shared/types";

export const UserAvatar = () => {
  const { profile, setWorkStatus } = useSharedProfile();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const statusLabels: Record<WorkStatus, string> = {
    looking: "Currently looking for work",
    passive: "Passively looking for work",
    not_looking: "Don't want to hear about work",
  };

  const handleStatusChange = (status: WorkStatus) => {
    setWorkStatus(status);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{profile.name}</span>
          <span className="text-xs text-gray-600">
            {statusLabels[profile.workStatus]}
          </span>
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute bottom-full mb-4 -right-4 bg-white shadow-lg rounded-md p-4 w-62 z-10 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Update your work status:
          </h4>
          <ul className="space-y-2">
            <li
              onClick={() => handleStatusChange("looking")}
              className="text-sm py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              Currently looking for work
            </li>
            <li
              onClick={() => handleStatusChange("passive")}
              className="text-sm py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              Passively looking for work
            </li>
            <li
              onClick={() => handleStatusChange("not_looking")}
              className="text-sm py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              Don't want to hear about work
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
