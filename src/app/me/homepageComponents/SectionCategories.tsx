import { getDictionary } from "@/lib/getDictionary";
import { SvgShimmer } from "@/shared/components/SvgComponents";
import { Category } from "@/shared/entities/category.entity";
import { useCategories } from "./hooks/useCategories";

export default function SectionCategories() {
  const { homepage: dict } = getDictionary("id");
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-medium text-gray-700">{dict.categories}</h2>
        <button className="text-sm text-emerald-500">{dict.seeAll}</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SvgShimmer key={idx} className="rounded-full h-9 w-full" />
            ))}
          </div>
        ) : (
          <BubbleCategories categories={categories?.data ?? []} />
        )}
      </div>
    </div>
  );
}

function BubbleCategories({ categories }: { categories: Category[] }) {
  if (!categories) {
    return <div className="">Data Tidak Tersedia!</div>;
  }
  return categories?.map((category) => (
    <button
      key={category.id}
      className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white"
    >
      {category.name}
    </button>
  ));
}
