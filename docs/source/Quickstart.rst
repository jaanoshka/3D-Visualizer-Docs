Quickstart
===========

Development Setup
------------------

### Prerequisites
- Python 3.10 or later
- Node.js and npm
- Google Maps API key

### Backend Setup
1. Clone the repository.
2. Create a virtual environment:
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables in `.env` file:
   ```env
   FLASK_APP=run.py
   SQLALCHEMY_DATABASE_URI=postgresql://<user>:<password>@localhost/<dbname>
   GOOGLE_MAPS_API_KEY=<your_api_key>
   ```
5. Run the backend:
   ```bash
   flask run
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

