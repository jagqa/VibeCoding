import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Step3_SelectSprint = ({ organization, project, team, pat, onSprintSelect, setError }) => {
  const [sprints, setSprints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSprints = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.post('/api/get-sprints', {
          organization,
          project: project.name,
          team: team.name,
          pat,
        });
        setSprints(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.detail || `Failed to fetch sprints. Status: ${err.response.status}`);
        } else {
          setError('An unexpected error occurred while fetching sprints.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (team) {
      fetchSprints();
    }
  }, [team, project, organization, pat, setError]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step 3: Select a Sprint</h2>
      {isLoading ? (
        <Loader text="Fetching sprints..." />
      ) : (
        <div className="space-y-2">
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              onClick={() => onSprintSelect(sprint)}
              className="p-4 bg-white rounded-lg border hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="font-semibold">{sprint.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step3_SelectSprint;