import Clients from "@/components/clients";
import { getClientImages } from "@/content/queries";

export default async function ClientsServer() {
  const data = await getClientImages();

  if (!data) return null;

  const images = data?.assetCollection.items;

  return <Clients images={images} />;
}
