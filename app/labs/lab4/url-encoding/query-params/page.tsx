"use client";

import { Suspense } from "react";
import QueryCalculator from "./querycalculator";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryCalculator />
    </Suspense>
  );
}
