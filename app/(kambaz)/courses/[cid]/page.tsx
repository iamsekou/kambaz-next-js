import { redirect } from "next/navigation";


/* Navigate to the home screen when you click a course from the dashboard*/
export default async function CoursesPage({ params, }: { params: Promise<{ cid: string }>; }) {
 const { cid } = await params;
 redirect(`/courses/${cid}/home`);
}
