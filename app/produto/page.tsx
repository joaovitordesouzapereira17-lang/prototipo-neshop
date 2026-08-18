import { Suspense } from "react";
import { ProdutoClient } from "./ProdutoClient";

export default function ProdutoPage() {
  return (
    <Suspense fallback={null}>
      <ProdutoClient />
    </Suspense>
  );
}
