type Status = "new" | "in-progress" | "completed" | "archived";

type StatusBadgeSimpleProps = {
  status: Status;
  size?: "sm" | "md";
};

const statusConfig = {
  new: {
    label: "New",
    colors: "bg-yellow-100 text-yellow-800",
    dotColor: "bg-yellow-400",
  },
  "in-progress": {
    label: "In Progress",
    colors: "bg-blue-100 text-blue-800",
    dotColor: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    colors: "bg-green-100 text-green-800",
    dotColor: "bg-green-400",
  },
  archived: {
    label: "Archived",
    colors: "bg-gray-100 text-gray-800",
    dotColor: "bg-gray-400",
  },
};

export default function StatusBadgeSimple({
  status,
  size = "sm",
}: StatusBadgeSimpleProps) {
  const currentStatus = statusConfig[status];
  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${currentStatus.colors}
        ${sizeClasses}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${currentStatus.dotColor}`}
      ></span>
      {currentStatus.label}
    </span>
  );
}
