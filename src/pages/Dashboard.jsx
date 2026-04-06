import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [showCreteResume, setShowCreteResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes");
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post("/api/resumes/create", { title });
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreteResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post("/api/ai/upload-resume", {
        title,
        resumeText,
      });
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();

      const confirmEdit = window.confirm("Update resume title?");
      if (confirmEdit) {
        const { data } = await api.put("/api/resumes/update", {
          resumeId: editResumeId,
          resumeData: { title },
        });

        setAllResumes(
          allResumes.map((resume) =>
            resume._id === editResumeId ? { ...resume, title } : resume
          )
        );

        setTitle("");
        setEditResumeId("");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume"
      );

      if (confirmDelete) {
        const { data } = await api.delete(
          `/api/resumes/delete/${resumeId}`
        );
        setAllResumes(allResumes.filter((r) => r._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreteResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
          >
            <PlusIcon className="size-11 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        {/* Create Modal */}
        {showCreteResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreteResume(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-50 rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 mb-4 px-4 focus:border-purple-600 ring-purple-600"
                required
              />

              <button className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Create
              </button>
            </div>
          </form>
        )}

        {/* Upload Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-50 rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 mb-4 px-4 focus:border-purple-600 ring-purple-600"
                required
              />

              <label
                className="block border-dashed border p-6 text-center hover:border-purple-500 cursor-pointer"
              >
                {resume ? (
                  <p className="text-purple-700">{resume.name}</p>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud />
                    <p>Upload Resume PDF</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                />
              </label>

              <button className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mt-4">
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;