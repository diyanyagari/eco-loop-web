import { LoaderCircle } from "lucide-react";

export default function LoadingGlobalTypeModal() {
  return (
    <div className="fixed z-[4000] top-0 left-0 w-full h-full flex items-center bg-blue-950/40 justify-center">
      <div className="rounded-3xl flex flex-col items-center aspect-square p-4 dark:bg-white bg-[#202122] dark:text-[#202124]">
        <LoaderCircle className="animate-spin h-12 w-12" />
        <p className="text-xs grow content-center">Tunggu Seben...</p>
      </div>
    </div>
  );
}
