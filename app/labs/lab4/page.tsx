"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import ClickEvent from "./clickevent";
import PassingDataOnEvent from "./passingdataonevent";
import PassingFunctions from "./passingfunctions";
import Counter from "./counter";
import BooleanStateVariables from "./booleanstatevariables";
import StringStateVariables from "./stringstatevariables";
import DateStateVariable from "./datastatevariable";
import ObjectStateVariable from "./objectstatevariable";
import ArrayStateVariable from "./arraystatevariable";
import ParentStateComponent from "./parentstatecomponent";
import UrlEncoding from "./query-parameters";
import QueryCalculator from "./url-encoding/query-params/page";
import store from "./store";
import { Provider } from "react-redux";
import { Suspense } from "react";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <main className={styles.container}>
        <div>
          <h2>Lab 4</h2>

          <ClickEvent />
          <PassingDataOnEvent />
          <PassingFunctions theFunction={sayHello} />
          <Counter />
          <BooleanStateVariables />
          <StringStateVariables />
          <DateStateVariable />
          <ObjectStateVariable />
          <ArrayStateVariable />
          <ParentStateComponent />
          <UrlEncoding />
          <Suspense fallback={<div>Loading...</div>}>
  <QueryCalculator />
</Suspense>
          
          <h3>React Examples</h3>
          <Link href="./redux">Redux Examples</Link>
          
          <h3>React Context Examples</h3>
          <Link href="./lab4/react-context">React Context Examples</Link>

          <h3>Zustand Examples</h3>
          <Link href="./lab4/zustand">Zustand Examples</Link> 
        </div>
      </main>
    </Provider>
  );
}