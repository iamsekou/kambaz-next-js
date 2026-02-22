import VariablesAndConstants from "./variablesandconstants";
import VariableTypes from "./variabletypes";
import BooleanVariables from "./booleanvariables";
import ConditionalOutputInline from "./conditionaloutputinline";
import TernaryOperator from "./ternaryoperator";
import IfElse from "./ifelse";
import ConditionalOutputIfElse from "./conditionaloutputifelse";
import LegacyFunctions from "./legacyfunctions";
import ArrowFunctions from "./arrowfunctions";
import ImpliedReturn from "./impliedreturn";
import TemplateLiterals from "./templateliterals";
import SimpleArrays from "./simplearrays";
import ArrayIndexAndLength from "./arrayindexandlength";
import AddingAndRemovingToFromArrays from "./addingandremovingtofromarrays";
import ForLoops from "./forloops";
import MapFunction from "./mapfunction";
import FindFunction from "./findfunction";
import FindIndex from "./findindex";
import FilterFunction from "./indexfunction";
import House from "./house";
import Spreader from "./spreader";
import Destructing from "./destructing";
import FunctionDestructing from "./functionsdestructing";
import DestructingImports from "./destructingimports";
import Classes from "./classes";
import Styles from "./styles";
import ClientComponentDemo from "./clientcomponentdemo";
import ServerComponentDemo from "./servercomponents";
import Add from "./add";
import Square from "./square";
import Highlight from "./highlight";  
import AddPathParameters from "./add/[a]/[b]/page";
import PathParameters from "./pathparameters";
import TodoItem from "./todos/todoitem";
import TodoList from "./todos/todolist";




export default function Lab3() {
  console.log('Hello World!');
  return (
    <div>
      <h2>Lab 3</h2>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <ConditionalOutputInline />
      <ConditionalOutputIfElse/>
      <TernaryOperator />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <House />
      <Spreader />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes /> 
      <Styles />
      <ClientComponentDemo />
      <ServerComponentDemo />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
      <AddPathParameters />
      <PathParameters />
      <TodoList />
      <TodoItem />
    </div>
);}
