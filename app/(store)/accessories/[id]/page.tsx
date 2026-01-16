import { getAccessory } from "@/server-api/accessories";
import { notFound } from "next/navigation";
import { AccessoryDetailClient } from "./accessory-detail-client";

export default async function AccessoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accessory = await getAccessory(id);

  if (!accessory) {
    notFound();
  }

  return <AccessoryDetailClient accessory={accessory} />;
}
