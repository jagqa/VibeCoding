import React, { useState } from 'react';
import axios from 'axios';

function Step1_Connect({ setOrganization, setPat, setProjects, setError, onConnected }) {
  const [orgUrl, setOrgUrl] = useState('');
  const [pat, setLocalPat] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!orgUrl || !pat) {
      setError('Please provide both the Organization URL and a PAT.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/connect', {
        ado_organization_url: orgUrl,
        ado_pat: pat,
      });
      
      setProjects(response.data.projects);
      setOrganization(orgUrl);
      setPat(pat);
      sessionStorage.setItem('ado_organization_url', orgUrl);
      sessionStorage.setItem('ado_pat', pat);
      onConnected();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data.detail || `Server responded with status: ${err.response.status}`);
        } else if (err.request) {
          setError('No response from server. Please ensure the backend is running and the proxy is configured correctly.');
        }
      } else {
        setError('Failed to parse server response. Please ensure the backend is running and restart the frontend server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleConnect} className="space-y-6">
      <div>
        <label htmlFor="orgUrl" className="block text-sm font-medium text-gray-700">
          Azure DevOps Organization URL
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="orgUrl"
            value={orgUrl}
            onChange={(e) => setOrgUrl(e.target.value)}
            placeholder="https://dev.azure.com/your-org"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="pat" className="block text-sm font-medium text-gray-700">
          Personal Access Token (PAT)
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="pat"
            value={pat}
            onChange={(e) => setLocalPat(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Connecting...' : 'Connect'}
        </button>
      </div>
    </form>
  );
}

export default Step1_Connect;