import { Card, CardContent } from "@/components/ui/card";
import { iconMap } from "@/lib/iconMap";
import { SvgShimmer } from "@/shared/components/SvgComponents";
import { Activity } from "@/shared/entities/activity.entity";
import { formattedDate } from "@/utils/formatDate";
import { useActivity } from "./hooks/useActivity";

export default function SectionActivity() {
  const { data: activities, isLoading } = useActivity();
  return (
    <Card className="overflow-hidden rounded-3xl border-none bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
          <button className="text-sm text-emerald-500">View All</button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SvgShimmer key={idx} className="w-full h-12 rounded-lg" />
              ))}
            </div>
          ) : (
            <ListingActivity activities={activities?.data ?? []} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ListingActivity({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return <div className="">Data Tidak Ditemukan!</div>;
  }

  const renderDate = (date: string) => {
    if (!date) return "";
    const parts = formattedDate(date).split(" ");
    const final = `${parts[0]} ${parts[1]}, ${parts[2]}`;
    return final;
  };

  return activities?.map((activity) => (
    <div
      key={activity.id}
      className="flex items-center justify-between border-b border-gray-100 pb-3"
    >
      <div className="flex items-center">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          {iconMap[activity.category.name.toLowerCase()]}
        </div>
        <div>
          <p className="font-medium capitalize text-gray-800">
            {activity.category.name} Recycling
          </p>
          <p className="text-xs text-gray-500">
            {renderDate(activity.created_at)}
          </p>
        </div>
      </div>
      <p className="font-medium text-emerald-500">
        +{activity.category.point} pts
      </p>
    </div>
  ));
}
