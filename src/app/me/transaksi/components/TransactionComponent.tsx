"use client";

import { Input } from "@/components/ui/input";
import { SvgShimmer } from "@/shared/components/SvgComponents";
import { Filter, Leaf, Search } from "lucide-react";
import dynamic from "next/dynamic";

const BubbleFilterCategories = dynamic(
  () => import("./BubbleFilterCategories"),
  {
    ssr: false,
    loading: () => (
      <div className="mb-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 5 }).map((_, idx) => (
          <SvgShimmer
            key={idx}
            className="h-9 w-24 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>
    ),
  }
);

const ListActivities = dynamic(() => import("./ListActivities"), {
  ssr: false,
  loading: () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, idx) => (
        <SvgShimmer
          key={idx}
          className="h-9 w-24 animate-pulse rounded-full bg-gray-200"
        />
      ))}
    </div>
  ),
});

export default function TransactionComponent() {
  return (
    <div className="p-4 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
            <Leaf className="h-4 w-4 text-emerald-500" />
          </div>
          <span className="font-medium text-emerald-500">495 pts</span>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="rounded-full border-emerald-100 bg-white pl-10 pr-4 py-5"
            placeholder="Search transactions"
          />
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          <Filter className="h-4 w-4 text-emerald-500" />
        </button>
      </div>

      <BubbleFilterCategories />
      <ListActivities />
    </div>
  );
}
