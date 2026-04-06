import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOff,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
  Award,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import api from "../configs/api";
import toast from "react-hot-toast";
import CertificationForm from "../components/CertificationForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skill: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const [activeSectionIndex, setactiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "certification", name: "Certification", icon: Award },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId);
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeResumeVisibility = async () => {
    try {
      const { data } = await api.put("/api/resumes/update", {
        resumeId,
        resumeData: { public: !resumeData.public },
      });

      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      const { data } = await api.put("/api/resumes/update", {
        resumeId,
        resumeData,
      });

      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/app" className="flex gap-2 items-center text-slate-500">
          <ArrowLeftIcon className="size-4" /> Back
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 grid lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-lg border">

            <hr className="border-gray-200" />
            <hr
              className="h-1 bg-linear-to-br from-purple-500 to-purple-600 border-none"
              style={{
                width: `${
                  (activeSectionIndex * 100) / (sections.length - 1)
                }%`,
              }}
            />

            <div className="flex justify-between py-4">
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template) =>
                  setResumeData((p) => ({ ...p, template }))
                }
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(color) =>
                  setResumeData((p) => ({ ...p, accent_color: color }))
                }
              />
            </div>

            {/* Forms */}
            {activeSection.id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(d) =>
                  setResumeData((p) => ({ ...p, personal_info: d }))
                }
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}

            {activeSection.id === "summary" && (
              <ProfessionalSummaryForm
                data={resumeData.professional_summary}
                onChange={(d) =>
                  setResumeData((p) => ({
                    ...p,
                    professional_summary: d,
                  }))
                }
                setResumeDate={setResumeData}
              />
            )}

            {activeSection.id === "experience" && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(d) =>
                  setResumeData((p) => ({ ...p, experience: d }))
                }
              />
            )}

            {activeSection.id === "education" && (
              <EducationForm
                data={resumeData.education}
                onChange={(d) =>
                  setResumeData((p) => ({ ...p, education: d }))
                }
              />
            )}

            {activeSection.id === "projects" && (
              <ProjectForm
                data={resumeData.project}
                onChange={(d) =>
                  setResumeData((p) => ({ ...p, project: d }))
                }
              />
            )}

            {activeSection.id === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(d) =>
                  setResumeData((p) => ({ ...p, skills: d }))
                }
              />
            )}

            {activeSection.id === "certification" && (
              <CertificationForm
                data={resumeData.certification}
                onChange={(d) =>
                  setResumeData((p) => ({ ...p, certification: d }))
                }
              />
            )}

            <button
              onClick={() => toast.promise(saveResume, { loading: "Saving..." })}
              className="bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 mt-6 px-6 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7">
          <div className="flex justify-end gap-2 mb-2">
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded"
            >
              Share
            </button>

            <button
              onClick={changeResumeVisibility}
              className="px-4 py-2 bg-purple-100 text-purple-600 rounded"
            >
              {resumeData.public ? "Public" : "Private"}
            </button>

            <button
              onClick={downloadResume}
              className="px-4 py-2 bg-purple-100 text-purple-600 rounded"
            >
              Download
            </button>
          </div>

          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;