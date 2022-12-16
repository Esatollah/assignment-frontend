export const INITIAL_MOCK_DATA = {
  "cards": {
    "card-1": { "id": 1, "content": "Interview for the Asis. Sales Manager" },
    "card-2": { "id": 2, "content": "Change the height of the top bar because it looks too chunky" },
    "card-3": { "id": 3, "content": "Integrate Stripe API" },
    "card-4": { "id": 4, "content": "Release minimals DS" },
    "card-5": { "id": 5, "content": "Call with sales of HubSpot" },
    "card-6": { "id": 6, "content": "Update the customer API for payments" },
  },
  "columns": {
    "column-1": {
      "id": 1,
      "title": "Backlog",
      "cardIds": [5,1,2]
    },
    "column-2": {
      "id": 2,
      "title": "Progress",
      "cardIds": [3,6],
    },
    "column-3": {
      "id": 3,
      "title": "Q&A",
      "cardIds": [],
    },
    "column-4": {
      "id": 4,
      "title": "Production",
      "cardIds": [4],
    },
  },

  "columnOrder": ["column-1", "column-2", "column-3", "column-4"]
}

export default INITIAL_MOCK_DATA;
