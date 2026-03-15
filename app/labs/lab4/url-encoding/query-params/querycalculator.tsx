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

      <div className="mb-2">
        <label>A:</label>
        <input
          className="form-control"
          type="number"
          value={valueA}
          onChange={(e) => setValueA(Number(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label>B:</label>
        <input
          className="form-control"
          type="number"
          value={valueB}
          onChange={(e) => setValueB(Number(e.target.value))}
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={calculate}>
        Calculate
      </button>

      <h4>Result: {a + b}</h4>
    </div>
  );
}