export const INITIAL_STATE = {
  "tasks": {
  },
  "columns": {
  },

  "columnOrder": []
}


export const INITIAL_MOCK_DATA = {
  "tasks": {
    "task-1": { "id": 1, "content": "Interview for the Asis. Sales Manager" },
    "task-2": { "id": 2, "content": "Change the height of the top bar because it looks too chunky" },
    "task-3": { "id": 3, "content": "Integrate Stripe API" },
    "task-4": { "id": 4, "content": "Release minimals DS" },
    "task-5": { "id": 5, "content": "Call with sales of HubSpot" },
    "task-6": { "id": 6, "content": "Update the customer API for payments" },
  },
  "columns": {
    "column-1": {
      "id": 1,
      "title": "Backlog",
      "taskIds": [5,1,2]
    },
    "column-2": {
      "id": 2,
      "title": "Progress",
      "taskIds": [3,6],
    },
    "column-3": {
      "id": 3,
      "title": "Q&A",
      "taskIds": [],
    },
    "column-4": {
      "id": 4,
      "title": "Production",
      "taskIds": [4],
    },
  },

  "columnOrder": ["column-1", "column-2", "column-3", "column-4"]
}

export default INITIAL_STATE;
