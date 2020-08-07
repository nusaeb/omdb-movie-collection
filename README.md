Welcome to the OMDB Movie Collection. This web app is developed using the content from http://www.omdbapi.com/

The application has two search modes: - Basic mode: - Search by title; - Advanced mode: - Two additioanl search parameters: - Type (possible options: episode, movie, series); - Year (possible options: 1900 - current year);

Upon a successful search, detail info of a movie or series can be viewed by clicking on the particular item on the search result list.

Please follow the steps below to run the app:

1. Open command-prompt or terminal and navigate to the directory where you wish to download the project;

2. Clone the project repository using the command:
git clone https://github.com/nusaeb/omdb-movie-collection.git

3. Navigate to the directory omdb-movie-collection

4. Run the following command to install the required dependencies:
   npm install
5. To start the app, run the command:
   npm start

   5.1 By default, the app runs on the port 4200 on localhost. If a different port needs to be used, the following command should be used (replace xxxx with the desired port number):
   npm start -- --port=xxxx

6. To run the unit tests, use the following command:
   npm test

PS! The project needs nodejs and npm to be installed in the machine to run. If you need to install nodejs and npm, please follow the instruction provided in the official nodejs website-

https://nodejs.org/en/download/package-manager/
