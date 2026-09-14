import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/auth';
import { getSheetData, updateSheetRow } from '../lib/google-sheets';
import { Button } from '../components/ui/button';

export const Route = createFileRoute('/process-ideas')({
  component: ProcessIdeasPage,
});

const SPREADSHEET_ID = '1Jx4-kCmcKXl2eOsivEBWnlSmkkGOql49_x54ssKqDZ8';
const SHEET_NAME = 'ideas'; // Fallback to 'Updated SuperBase1' if 'ideas' doesn't work

function ProcessIdeasPage() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, t) => {
        setToken(t);
        setNeedsAuth(false);
      },
      () => {
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setNeedsAuth(false);
        fetchSheetData(result.accessToken);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchSheetData = async (accessToken: string) => {
    setLoading(true);
    setError(null);
    try {
      // Columns A to AK is A:AK
      const data = await getSheetData(SPREADSHEET_ID, `${SHEET_NAME}!A:AK`, accessToken);
      if (data.values) {
        setRows(data.values);
      } else {
        // Try the other sheet name
        const altData = await getSheetData(SPREADSHEET_ID, `Updated SuperBase1!A:AK`, accessToken);
        if (altData.values) setRows(altData.values);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Idea Processor Admin</h1>
        <p className="mb-8 text-gray-600">Please sign in to access the Google Sheet.</p>
        <button
          className="gsi-material-button bg-white border border-gray-300 rounded shadow-sm px-4 py-2 flex items-center hover:bg-gray-50"
          onClick={handleLogin}
          disabled={isLoggingIn}
        >
          <div className="gsi-material-button-icon mr-3 w-5 h-5">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="font-medium text-gray-700">{isLoggingIn ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    );
  }

  // Find rows where research_facts (AK, index 36) is empty
  const pendingRows = rows.filter((r, i) => i > 0 && (!r[36] || r[36].trim() === ''));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Idea Processor</h1>
        <div className="flex gap-4">
          <Button onClick={() => fetchSheetData(token!)} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Sheet'}
          </Button>
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-8">{error}</div>}

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">Pending Ideas</h2>
          <span className="text-sm text-gray-500">{pendingRows.length} rows need research</span>
        </div>
        
        {loading && rows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Loading sheet data...</div>
        ) : pendingRows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No pending rows found. Column AK is fully populated!</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendingRows.slice(0, 50).map((row, index) => {
              const rowIndex = rows.indexOf(row) + 1; // +1 for 1-based indexing in Sheets
              return (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="font-medium">{row[0] || 'Unknown ID'}</div>
                    <div className="text-sm text-gray-600">{row[5] || 'No Title'}</div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => alert(`Ready to process row ${rowIndex} (coming soon)`)}>
                    Process Row
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
