import React from 'react';

const Step2_SelectProject = ({ projects, onProjectSelect, selectedProjectId }) => {
  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    const project = projects.find(p => p.id === projectId);
    onProjectSelect(project);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step 2: Select a Project</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
          <select value={selectedProjectId || ''} onChange={handleProjectChange} className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">-- Select a Project --</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step2_SelectProject;