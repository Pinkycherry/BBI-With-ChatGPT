export const getSpreadsheetMetadata = async (spreadsheetId: string, token: string) => {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`Failed to get spreadsheet metadata: ${res.statusText}`);
  return res.json();
};

export const getSheetData = async (spreadsheetId: string, range: string, token: string) => {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`Failed to get sheet data: ${res.statusText}`);
  return res.json();
};

export const updateSheetRow = async (spreadsheetId: string, range: string, values: any[][], token: string) => {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values })
  });
  if (!res.ok) throw new Error(`Failed to update sheet data: ${res.statusText}`);
  return res.json();
};

export const appendSheetRow = async (spreadsheetId: string, range: string, values: any[][], token: string) => {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values })
  });
  if (!res.ok) throw new Error(`Failed to append sheet data: ${res.statusText}`);
  return res.json();
};
