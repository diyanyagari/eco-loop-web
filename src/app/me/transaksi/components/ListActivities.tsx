import { Card, CardContent } from "@/components/ui/card";
import { useActivity } from "../../homepageComponents/hooks/useActivity";
import { iconMap } from "@/lib/iconMap";
import { formattedDate } from "@/utils/formatDate";

export default function ListActivities() {
  const { data: activities } = useActivity();
  const renderDate = (date: string) => {
    if (!date) return "";
    const parts = formattedDate(date).split(" ");
    const final = `${parts[0]} ${parts[1]}, ${parts[2]}`;
    return final;
  };
  return (
    <div className="space-y-3">
      {activities?.data.map((activity) => (
        <Card
          key={activity.id}
          className="overflow-hidden rounded-2xl border-none shadow-sm"
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  {iconMap[activity.category.name.toLowerCase()]}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {activity.category.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {renderDate(activity.created_at)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-emerald-500">
                  +{activity.category.point} pts
                </p>
                <p className="text-xs text-gray-500">{activity.weight} kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
