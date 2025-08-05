import React, { useState } from 'react';
import { createTask } from '../Services/api';
import Loader from './Loader';

const Step4ViewResult = ({ selectedProject, selectedUserStory, generatedGherkin, setCreatedTask, createdTask, onReset, setError }) => {
  const [taskTitle, setTaskTitle] = useState(`Test Plan for: ${selectedUserStory.title}`);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await createTask(selectedProject.name, selectedUserStory.id, taskTitle, generatedGherkin);
      setCreatedTask(response.data);
    } catch (err) {
      setError('Failed to create task in Azure DevOps.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step 4: Review and Create Task</h2>
      <div className="bg-gray-50 p-4 rounded-md border mb-6">
        <h3 className="font-semibold text-lg mb-2">Generated Gherkin Syntax</h3>
        <pre className="bg-gray-900 text-white p-4 rounded-md whitespace-pre-wrap text-sm">{generatedGherkin}</pre>
      </div>

      {!createdTask ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              id="task-title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {isLoading ? (
            <Loader text="Creating task..." />
          ) : (
            <button
              onClick={handleCreateTask}
              className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Create Task in Azure DevOps
            </button>
          )}
        </div>
      ) : (
        <div className="text-center bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-700 mb-2">Task Created Successfully!</h3>
          <p className="text-gray-800">Task ID: <strong className="font-semibold">{createdTask.id}</strong></p>
          <a
            href={createdTask.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            View Task in Azure DevOps
          </a>
        </div>
      )}
      
      <button
        onClick={onReset}
        className="mt-8 w-full bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
      >
        Start Over
      </button>
    </div>
  );
};

export default Step4ViewResult;