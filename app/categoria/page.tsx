import { Suspense } from "react";
import { CategoriaClient } from "./CategoriaClient";

export default function CategoriaPage() {
  return (
    <Suspense fallback={null}>
      <CategoriaClient />
    </Suspense>
  );
}
