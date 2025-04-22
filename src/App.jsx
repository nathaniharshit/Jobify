import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/authContext.jsx';
import UserJobsPage from './pages/UserJobPage.jsx';
import AppliedJobsPage from './components/AppliedJobsList.jsx';

function App() {
  
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return res;
  };

  return (
    <AuthProvider>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/jobs' element={<JobsPage />} />
              <Route
                path='/add-job'
                element={<AddJobPage addJobSubmit={addJob} />}
              />
              <Route path="/applied-jobs" element={<AppliedJobsPage />} />
              <Route path="/my-jobs" element={<UserJobsPage />} />
              <Route path='/job/:id' element={<JobPage />} loader={jobLoader} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          )
        )}
      />
    </AuthProvider>
  );
}

export default App;
