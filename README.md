# Headcode CMS

Headcode CMS is a 100% open-source headless CMS. It does not require a separate CMS server or cloud service. Simply embed it into your Next.js 13 project - configure Supabase for database, storage, and Auth - and you are DONE! Future versions will support additional front-end frameworks and cloud services.

## Setup and Installation

To run the prototype locally you need to perform the following steps:

1. Clone or download the repository from GitHub
2. Run "npm install --legacy-peer-deps" to install the dependencies
3. Copy .env.local.example to .env.local
4. Create a new [Supabase](https://supabase.com) project
5. Add Supabase connection strings to .env.local
6. Run "npm run dev" to start the server
7. Open http://localhost:3000 to setup the database tables and storage.

### Upload Demo Data

Headcode CMS works without data as well, but if you'd like to import the demo data for the database and storage, just import them in Supabase Studio after you finished the setup. You find the demo data in the _demo_data folder.

#### Import demo data to v01_sections table

Import the file supabase-sections.csv from the folder _demo_data in your Supabase Tables Dashboard.

![Import Demo Data](/_demo_data/supabase-data.png?raw=true "Import Demo Data")

#### Import demo images to Supabase storage

Unzip the file supabase-storage.zip from the folder _demo_data and upload the files to the public folder of the headcode bucket.

![Upload Demo Images](/_demo_data/supabase-storage-step-1.png?raw=true "Upload Demo Images")

![Upload Demo Images](/_demo_data/supabase-storage-step-2.png?raw=true "Upload Demo Images")

### Environment Variables

The prototype requires Supabase to work correctly. Therefore configure the following environment variables (e.g.: .env.local):

    NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_ID>.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
    SUPABASE_CONNECTION_STRING=postgresql://postgres:xxx
