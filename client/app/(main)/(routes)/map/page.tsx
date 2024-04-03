import MapComponent from "@/components/pages/map/map-container";
import { Card, CardContent } from "@/components/ui/card";

export default function Map() {
  return (
    <>
      <Card>
        <CardContent>
          <MapComponent />
        </CardContent>
      </Card>
    </>
  );
}
