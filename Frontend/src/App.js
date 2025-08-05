import React, { useState } from 'react';
import Step1Connect from './Components/Step1_Connect';
import Step2SelectProject from './Components/Step2_SelectProject';
import Step2SelectTeam from './Components/Step2_SelectTeam';
import Step3SelectSprint from './Components/Step3_SelectSprint';
import Step4SelectUserStory from './Components/Step4_SelectUserStory';
import Step3Generate from './Components/Step3_Generate';
import Step4ViewResult from './Components/Step4_ViewResult';

function App() {
  const [step, setStep] = useState(1);
  const [organization, setOrganization] = useState('');
  const [pat, setPat] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [selectedUserStory, setSelectedUserStory] = useState(null);
  const [generatedGherkin, setGeneratedGherkin] = useState('');
  const [createdTask, setCreatedTask] = useState(null);
  const [error, setError] = useState('');

  const handleNextStep = () => setStep(prev => prev + 1);
  const handleReset = () => {
    setStep(1);
    setOrganization('');
    setPat('');
    setProjects([]);
    setSelectedProject(null);
    setSelectedTeam(null);
    setSelectedSprint(null);
    setSelectedUserStory(null);
    setGeneratedGherkin('');
    setCreatedTask(null);
    setError('');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Connect setOrganization={setOrganization} setPat={setPat} setProjects={setProjects} setError={setError} onConnected={handleNextStep} />;
      case 2:
        return <Step2SelectProject projects={projects} onProjectSelect={setSelectedProject} selectedProjectId={selectedProject?.id} />;
      case 3:
        return <Step2SelectTeam organization={organization} project={selectedProject} pat={pat} onTeamSelect={setSelectedTeam} setError={setError} />;
      case 4:
        return <Step3SelectSprint organization={organization} project={selectedProject} team={selectedTeam} pat={pat} onSprintSelect={setSelectedSprint} setError={setError} />;
      case 5:
        return <Step4SelectUserStory organization={organization} project={selectedProject} sprint={selectedSprint} pat={pat} onUserStorySelect={setSelectedUserStory} setError={setError} />;
      case 6:
        return <Step3Generate selectedUserStory={selectedUserStory} setGeneratedGherkin={setGeneratedGherkin} onGenerated={handleNextStep} setError={setError} />;
      case 7:
        return <Step4ViewResult selectedProject={selectedProject} selectedUserStory={selectedUserStory} generatedGherkin={generatedGherkin} setCreatedTask={setCreatedTask} createdTask={createdTask} onReset={handleReset} setError={setError} />;
      default:
        return <Step1Connect setProjects={setProjects} setError={setError} onConnected={handleNextStep} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <header className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700">Azure DevOps Gherkin Assistant</h1>
          <p className="text-gray-600 mt-2">Analyze user stories with AI and create tasks seamlessly.</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main className="bg-white shadow-md rounded-lg p-6">
          {renderStep()}
        </main>
      </div>
    </div>
  );
}

export default App;