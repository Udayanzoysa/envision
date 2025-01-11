// Utility function to render status badges
const StausBadge = (status: string) => {
  let badgeColor = "bg-gray-500";
  let statusText = "Unknown";

  switch (status) {
    case "published":
      badgeColor = "bg-green-500";
      statusText = "Published";
      break;
    case "draft":
      badgeColor = "bg-yellow-500";
      statusText = "Draft";
      break;
    case "archived":
      badgeColor = "bg-red-500";
      statusText = "Archived";
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium text-white ${badgeColor} rounded-full`}>{statusText}</span>
  );
};

export default StausBadge;
