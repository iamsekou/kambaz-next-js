import PathParameters from "./pathparameters";
import QueryParameters from "./queryparameters";
import WorkingWithObjects from "./workingwithobjects";
import WorkingWithArrays from "./workingwitharrays";
import HttpClient from "./httpclient";
import WorkingWithObjectsAsynchronously from "./workingwithobjectsasynchronously";
import WorkingWithArraysAsynchronously from "./workingwitharraysasynchronously";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>

      <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
        Welcome
      </a>

      <hr />

      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays /> 
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}