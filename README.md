# Collaborative Note-Taking App

<br/>
<p align="center">
    <a href="https://www.openai.com/" >
        <img alt="OpenAI's GPT-3 (for AI-powered features) - An autoregressive language model that uses deep learning to produce human-like text" src="https://img.shields.io/static/v1.svg?label=OpenAI&message=GPT-3-turbo&color=brightgreen" /></a>
    <a href="https://handlebarsjs.com/" >
        <img alt="Handlebars.js - A minimal templating engine that allows you to use semantic templates with your server-side Node.js and Express.js applications." src="https://img.shields.io/static/v1.svg?label=Handlebars.js&message=templating engine&color=orange" /></a>
    <a href="https://sequelize.org/">
        <img alt="Sequelize ORM - A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication, and more" src="https://img.shields.io/static/v1.svg?label=Sequelize ORM&message=Node.js ORM&color=blueviolet" /></a>
    <a href="https://www.mysql.com/">
        <img alt="MySQL - An open-source relational database management system" src="https://img.shields.io/static/v1.svg?label=MySQL&message=database&color=yellowgreen" /></a>
    <a href="https://www.heroku.com/">
        <img alt="Heroku (for deployment) - A platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud" src="https://img.shields.io/static/v1.svg?label=Heroku&message=deployment&color=red" /></a>
    <a href="https://www.npmjs.com/package/express-session">
        <img alt="express-session - A session middleware for Express.js, used for handling user sessions" src="https://img.shields.io/static/v1.svg?label=express-session&message=middleware&color=green" /></a>
    <a href="https://socket.io/">
        <img alt="Socket.IO (for real-time collaboration) - Enables real-time, bidirectional, and event-based communication between web clients and servers" src="https://img.shields.io/static/v1.svg?label=Socket.IO&message=real-time collaboration&color=yellow" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Glossary/MVC">
        <img alt="MVC Architecture - A software design pattern for developing web applications. MVC is an acronym for Model, View, and Controller. The pattern isolates the application logic from the user interface, allowing for efficient code organization and separation of concerns" src="https://img.shields.io/static/v1.svg?label=MVC Architecture&message=design pattern&color=lightcyan" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX" >
        <img alt="AJAX (Asynchronous JavaScript and XML) - A set of web development techniques that allows a web page to communicate with a server without reloading the page, enhancing the user experience by making it smoother and more interactive" src="https://img.shields.io/static/v1.svg?label=AJAX&message=web dev techniques&color=yellow" /></a>
    <a href="https://quilljs.com/">
        <img alt="Quill - A powerful, rich text editor built for compatibility and extensibility" src="https://img.shields.io/static/v1.svg?label=Quill&message=text editor&color=darkgreen" /></a>
    <a href="https://nodejs.org/" >
        <img alt="Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building fast and scalable network applications" src="https://img.shields.io/static/v1.svg?label=Node.js&message=JavaScript runtime&color=lightyellow" /></a>
    <a href="https://expressjs.com/" >
        <img alt="Express.js - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications" src="https://img.shields.io/static/v1.svg?label=Express.js&message=web app framework&color=blue" /></a>
    <a href="https://www.npmjs.com/" >
        <img alt="Node Package Manager" src="https://img.shields.io/static/v1.svg?label=npm&message=packages&color=lightblue" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" >
        <img alt="JavaScript - ES6" src="https://img.shields.io/static/v1.svg?label=JavaScript&message=ES6&color=violet" /></a>
    <a href="https://github.com/">
        <img alt="GitHub (for repository hosting and project management) - Provides hosting for software development and version control using Git" src="https://img.shields.io/static/v1.svg?label=GitHub&message=hosting&color=black" /></a>
    <a href="https://git-scm.com/">
        <img alt="Git (for version control) - A free and open-source distributed version control system" src="https://img.shields.io/static/v1.svg?label=Git&message=version control&color=black" /></a>
    <a href="https://unb.ca/cel/bootcamps/coding.html">
        <img alt="University of New Brunswick" src="https://img.shields.io/static/v1.svg?label=UNB&message=Bootcamp&color=red" /></a>
    <a href="https://opensource.org/license/mit/">
        <img alt="The MIT License" src="https://img.shields.io/static/v1.svg?label=License&message=MIT&color=lightgreen" /></a>
</p>
<br/>

## Description
SynthNotes is a cutting-edge, Collaborative Note-Taking App designed to improve productivity and collaboration among users. With AI-powered summarization, real-time collaboration, and an array of other advanced features, SynthNotes stands out as the go-to solution for students, professionals, and teams who aspire to manage their notes efficiently and collaborate seamlessly.

Collaborators of the project: Karen Bourgeois, Ikechukwu Mbanugo and Arnaldo Sepulveda

## Features
- **User Authentication:** Secure signup, login, and profile management.
- **Note Management:** Create, edit, delete, and categorize notes with rich text formatting.
- **Collaborative Editing:** Share and collaborate on notes in real-time with other users.
- **AI-Powered Summarization:** Get concise, accurate summaries of lengthy notes.
- **Actionable Item Extraction:** Automatically convert action points in notes into tasks or reminders.
- **Contextual Recommendations:** Receive suggestions for related notes and external references based on the content.
- **Search and Filter:** Easily find notes with robust search and filter capabilities.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** Handlebars.js, AJAX for smooth interactions
- **Database:** MySQL, Sequelize ORM
- **Authentication:** express-session, cookies
- **AI Services:** OpenAI's GPT-3 for summarization and other AI-driven features
- **Deployment:** Render

## Getting Started

### Prerequisites
Ensure you have the following installed before proceeding:
- Node.js and npm
- Git (for version control)

### Installation
1. **Clone the repository:**
```shell
   git clone https://github.com/naturuplift/CollaborativeNoteTakingApp.git
   cd CollaborativeNoteTakingApp
```

2. **Install dependencies:**
```shell
    npm install
```

3. **Set up environment variables:**
- Rename the .env.example file to .env.
- Fill in the necessary environment variables.

4. **Start the application:**
```shell
    npm run devStart
```

5. **Visit the application in your browser:**
- Open http://localhost:3000 to access your application.

## Usage
- Create an Account: Sign up to start creating and collaborating on notes.
- Create/Edit Notes: Use the rich text editor to jot down your thoughts or meeting minutes.
- Collaborate: Share notes with your peers and work on them together in real-time.
- Summarize: Use the AI-powered summarization feature to condense long notes into digestible summaries.

## State Flow Diagram

For a visual representation of the sequence of actions involved in the [Collaborative Note-Taking App][note-taking-app], refer to the [Project Setup and Functionality][project-setup] and the [State Diagram Collaborative Note-Taking App][state-flow] provided in the project documentation.


## Contributing
Contributions to the SynthNotes project are welcome!
- Fork the project.
- Create your feature branch (git checkout -b feature/AmazingFeature).
- Commit your changes (git commit -m 'Add some AmazingFeature').
- Push to the branch (git push origin feature/AmazingFeature).
- Open a pull request.

## License
Distributed under the MIT License. See [LICENSE][MIT] for more information.

[project-app]: <>
[project-code]: <>
[note-taking-app]: <https://github.com/naturuplift/CollaborativeNoteTakingApp/blob/main/assets/img/Collaborative%20Note-Taking%20App%20v1.png>
[project-setup]: <https://github.com/naturuplift/CollaborativeNoteTakingApp/blob/main/assets/img/Project%20Setup%20and%20Functionality%20v1.png>
[state-flow]: <https://github.com/naturuplift/CollaborativeNoteTakingApp/blob/main/assets/img/State%20Diagram%20Collaborative%20Note-Taking%20App%20v1.png>
[MIT]: <https://github.com/naturuplift/CollaborativeNoteTakingApp/blob/main/LICENSE>
