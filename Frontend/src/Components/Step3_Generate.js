import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Step3Generate = ({ selectedUserStory, setGeneratedGherkin, onGenerated, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/generate-gherkin', {
        user_story_id: selectedUserStory.id,
      });
      setGeneratedGherkin(response.data.gherkin);
      onGenerated();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.detail || `Failed to generate Gherkin. Status: ${err.response.status}`);
      } else {
        setError('An unexpected error occurred while generating Gherkin syntax.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step 3: Analyze User Story</h2>
      <div className="bg-gray-50 p-4 rounded-md border mb-6">
        <h3 className="font-semibold text-lg mb-2">Selected User Story: {selectedUserStory.title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{selectedUserStory.description}</p>
      </div>
      {isLoading ? (
        <Loader text="AI is analyzing the story..." />
      ) : (
        <button
          onClick={handleGenerate}
          className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Generate Gherkin Syntax
        </button>
      )}
    </div>
  );
};

export default Step3Generate;