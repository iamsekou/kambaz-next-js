export default function Modules() {
  return (
    <div>
      <ul id="wd-modules">

         {/* MODULE TOOLBAR */}
      <div id="wd-modules-toolbar">
        <button>Collapse All</button>{" "}
        <button>View Progress</button>{" "}
        <select>
          <option>Publish All</option>
          <option>Unpublish All</option>
        </select>{" "}
        <button>+ Module</button>
      </div>

      <br />
        {/* Module 1 */}
        <li className="wd-module">
          <div className="wd-title">CS 2500 - Fundamentals of Computer Science 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Systematic problem solving through programming</li>
                <li className="wd-content-item">Models of computation and expression evaluation</li>
                <li className="wd-content-item">Design recipes, testing, and debugging habits</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">CONTENT</span>
              <ul className="wd-content">
                <li className="wd-content-item">Function design + examples and tests</li>
                <li className="wd-content-item">Lists and structural recursion</li>
                <li className="wd-content-item">Data definitions and templates</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 2 */}
        <li className="wd-module">
          <div className="wd-title">CS 3500 - Object-Oriented Design</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Abstraction, modularity, and code reuse in large systems</li>
                <li className="wd-content-item">Core OOP concepts: classes, interfaces, encapsulation, polymorphism</li>
                <li className="wd-content-item">Designing clean APIs and reasoning about tradeoffs</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">CONTENT</span>
              <ul className="wd-content">
                <li className="wd-content-item">Interfaces vs inheritance and composition</li>
                <li className="wd-content-item">MVC-style organization and separation of concerns</li>
                <li className="wd-content-item">Testing strategies for object-oriented code</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Module 3 */}
        <li className="wd-module">
          <div className="wd-title">ARTG 1290 - Typographic Systems</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Typography principles applied across contexts and formats</li>
                <li className="wd-content-item">Typography history, development, and contemporary practice</li>
                <li className="wd-content-item">Research-informed design decisions and cultural meaning in type</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">CONTENT</span>
              <ul className="wd-content">
                <li className="wd-content-item">Type hierarchy: scale, weight, spacing, and rhythm</li>
                <li className="wd-content-item">Grid systems and alignment for readability</li>
                <li className="wd-content-item">Accessibility: legibility, contrast, and layout clarity</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
