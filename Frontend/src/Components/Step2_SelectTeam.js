import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Step2_SelectTeam = ({ organization, project, pat, onTeamSelect, setError }) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.post('/api/get-teams', {
          organization,
          project: project.name,
          pat,
        });
        setTeams(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.detail || `Failed to fetch teams. Status: ${err.response.status}`);
        } else {
          setError('An unexpected error occurred while fetching teams.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (project) {
      fetchTeams();
    }
  }, [project, organization, pat, setError]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step 2b: Select a Team</h2>
      {isLoading ? (
        <Loader text="Fetching teams..." />
      ) : (
        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => onTeamSelect(team)}
              className="p-4 bg-white rounded-lg border hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="font-semibold">{team.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step2_SelectTeam;
