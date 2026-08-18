import { Suspense } from "react";
import { BuscaClient } from "./BuscaClient";

export default function BuscaPage() {
  return (
    <Suspense fallback={null}>
      <BuscaClient />
    </Suspense>
  );
}
