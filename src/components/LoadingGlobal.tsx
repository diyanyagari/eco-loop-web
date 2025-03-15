import { LoaderCircle } from "lucide-react";

export default function LoadingGlobal() {
  return (
    <div className="fixed z-[4000] top-0 left-0 w-full h-full flex items-center bg-blue-950/40 backdrop-blur-md justify-center">
      <div className="rounded-3xl flex flex-col items-center gap-4">
        <LoaderCircle className="animate-spin h-10 w-10" />
        Memuat...
      </div>
    </div>
  );
}
