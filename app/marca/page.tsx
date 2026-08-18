import { Suspense } from "react";
import { MarcaClient } from "./MarcaClient";

export default function MarcaPage() {
  return (
    <Suspense fallback={null}>
      <MarcaClient />
    </Suspense>
  );
}
