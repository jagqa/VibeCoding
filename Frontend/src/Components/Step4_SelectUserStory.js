import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Step4_SelectUserStory = ({ organization, project, sprint, pat, onUserStorySelect, setError }) => {
  const [userStories, setUserStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserStories = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.post('/api/get-user-stories', {
          organization,
          project: project.name,
          sprint: sprint.name,
          pat,
        });
        setUserStories(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.detail || `Failed to fetch user stories. Status: ${err.response.status}`);
        } else {
          setError('An unexpected error occurred while fetching user stories.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (sprint) {
      fetchUserStories();
    }
  }, [sprint, project, organization, pat, setError]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step 4: Select a User Story</h2>
      {isLoading ? (
        <Loader text="Fetching user stories..." />
      ) : (
        <div className="space-y-2">
          {userStories.map((userStory) => (
            <div
              key={userStory.id}
              onClick={() => onUserStorySelect(userStory)}
              className="p-4 bg-white rounded-lg border hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="font-semibold">{userStory.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step4_SelectUserStory;