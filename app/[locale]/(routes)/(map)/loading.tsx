import { AppLoader } from "@/components/ui/app-loader";

export default function MapLoader() {
  return (
    <div className="absolute left-0 top-0 h-dvh w-dvw">
      <AppLoader />
    </div>
  );
}
