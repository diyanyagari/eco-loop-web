import { useCategories } from "../../homepageComponents/hooks/useCategories";

export default function BubbleFilterCategories() {
  const { data: categories } = useCategories();
  if (!categories) return null;
  return (
    <div className="mb-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      <button className="whitespace-nowrap rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white">
        All
      </button>
      {categories?.data.map((category) => (
        <button
          key={category.id}
          className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
