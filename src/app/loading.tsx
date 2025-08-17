import {Loader2} from "lucide-react"
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDF9F5]">
      <Loader2 className="animate-spin h-16 w-16 text-gray-900" />
    </div>
  );
}