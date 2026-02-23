import { WorkStatusSelect } from "./WorkStatusSelect";
import useSharedProfile from "../../shared/store/useSharedProfile";
import { WorkStatus } from "../../shared/types";

export const WorkStatusCard = ({ className = "" }: { className?: string }) => {
  const { profile, setWorkStatus } = useSharedProfile();

  const handleStatusChange = (val: WorkStatus) => {
    setWorkStatus(val);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Your Work Status
      </h3>
      <div className="py-2">
        <WorkStatusSelect value={profile.workStatus} onChange={handleStatusChange} />
      </div>
    </div>
  );
};
