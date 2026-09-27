import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Screening from "./pages/screening/Screening";
import Analysis from "./pages/analysis/Analysis";
import Explainability from "./pages/analysis/Explainability";
import DoctorReview from "./pages/doctor/DoctorReview";
import Doctor from "./pages/doctor/Doctor";

import Patients from "./pages/patients/Patients";
import PatientDetail from "./pages/patients/PatientDetail";

import Referrals from "./pages/referrals/Referrals";

import PHC from "./pages/phc/PHC";

import Analytics from "./pages/analytics/Analytics";

import Simulation from "./pages/simulation/Simulation";

import Validation from "./pages/validation/Validation";

import Research from "./pages/research/Research";

import Settings from "./pages/setting/Setting";

function Page({ title, description }) {
  return (
    <main className="min-h-screen bg-[#040609] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/30">
          VISIONX
        </p>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/40">
          {description}
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/screening"
          element={<Screening />}
        />

        <Route path="/screening" element={<Screening />} />
        <Route path="/screening/analysis" element={<Analysis />} />
        <Route
          path="/screening/explainability"
          element={<Explainability />}
        />

        <Route
          path="/doctor/review/:id"
          element={<DoctorReview />}
        />


        <Route path="/doctor" element={<Doctor />} />

       <Route path="/patients" element={<Patients />} />

<Route
  path="/patients/:id"
  element={<PatientDetail />}
/>

<Route path="/referrals" element={<Referrals />} />

<Route path="/phc" element={<PHC />} />

<Route path="/analytics" element={<Analytics />} />

<Route path="/simulation" element={<Simulation />} />

<Route path="/validation" element={<Validation />} />

<Route path="/research" element={<Research />} />

<Route path="/settings" element={<Settings />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}