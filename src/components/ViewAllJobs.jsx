import { Link } from "react-router-dom"
import './viewalljobs.css'
const ViewAllJobs = () => {
    return (
        <section className="m-auto max-w-lg my-10 px-6">
            <Link
                to="/jobs"
                className="browse-more-jobs-button"
            >
            Browse more jobs
            </Link>
        </section>
    )
}

export default ViewAllJobs