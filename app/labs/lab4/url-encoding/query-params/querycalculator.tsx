"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function QueryCalculator() {
  const router = useRouter();
  const params = useSearchParams();

  const a = Number(params.get("a")) || 0;
  const b = Number(params.get("b")) || 0;

  const [valueA, setValueA] = useState(a);
  const [valueB, setValueB] = useState(b);

  const calculate = () => {
    router.push(`?a=${valueA}&b=${valueB}`);
  };

  return (
    <div id="wd-query-calculator">
      <h3>Query Parameter Calculator</h3>

      <input
        className="form-control mb-2"
        type="number"
        value={valueA}
        onChange={(e) => setValueA(Number(e.target.value))}
      />

      <input
        className="form-control mb-2"
        type="number"
        value={valueB}
        onChange={(e) => setValueB(Number(e.target.value))}
      />

      <button className="btn btn-primary mb-2" onClick={calculate}>
        Calculate
      </button>

      <div>Result: {a + b}</div>
    </div>
  );
}