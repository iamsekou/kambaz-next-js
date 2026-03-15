import ZustandCounter from "./counter";
import Zustandtodolist from "./todos/zustandtodolist";
import zustandtodolist from "./todos/zustandtodolist";

export default function zustandexamples() {
  return (
    <div>
      <h2>Zustand Examples</h2>
      <ZustandCounter />
      <hr />
      <Zustandtodolist />
    </div>
  );
}