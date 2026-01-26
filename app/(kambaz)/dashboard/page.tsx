import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />

      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack Software Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/algo.png" width={200} height={150} alt="algo" />
            <div>
              <h5> CS3000 </h5>
              <p className="wd-dashboard-course-title">
                Algorithms and Data
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpg" width={200} height={150} alt="ood" />
            <div>
              <h5> CS3500 Java </h5>
              <p className="wd-dashboard-course-title">
                Object-Oriented Design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/1210" className="wd-dashboard-course-link">
            <Image src="/images/coopclass.jpg" width={200} height={150} alt="coopclass" />
            <div>
              <h5> CS 1210 Khoury </h5>
              <p className="wd-dashboard-course-title">
                Professional Development for Khoury Co-op
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/2484" className="wd-dashboard-course-link">
            <Image src="/images/HCI.jpg" width={200} height={150} alt="HCI" />
            <div>
              <h5> CS 2484 </h5>
              <p className="wd-dashboard-course-title">
                Human-Computer Interaction
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/1290" className="wd-dashboard-course-link">
            <Image src="/images/typography.jpg" width={200} height={150} alt="typography" />
            <div>
              <h5> ARTG 1290 </h5>
              <p className="wd-dashboard-course-title">
                Typographic Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/3302" className="wd-dashboard-course-link">
            <Image src="/images/advancedwriting.png" width={200} height={150} alt="advancedwriting" />
            <div>
              <h5> ENGW 3302 </h5>
              <p className="wd-dashboard-course-title">
                Advanced Writing in the Technical Professions
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
