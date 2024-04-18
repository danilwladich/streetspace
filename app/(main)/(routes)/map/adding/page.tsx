import MarkerForm from "@/components/forms/map/marker-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Adding() {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Add new location</CardTitle>
        <CardDescription>
          Your location will be added to the map after moderation
        </CardDescription>
      </CardHeader>

      <CardContent>
        <MarkerForm />
      </CardContent>
    </Card>
  );
}
