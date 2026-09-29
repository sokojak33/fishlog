# FishLog

FishLog is a full-stack web application for tracking freshwater fishing catches. The project is being developed as a practical full-stack application using a React and TypeScript frontend with a Java Spring Boot backend.

The goal of the project is to build a complete fishing log where users can record catches, review previous catches, and eventually manage their fishing history through persistent user accounts.

## Current Features

- Landing page with application navigation
- Login and signup interfaces with frontend validation
- Dashboard displaying catch data from the backend
- Add Catch form with field validation
- Create and retrieve catches through a REST API
- Loading and error handling for API requests
- Client/server integration using a Vite development proxy
- Separate public and application navigation layouts
- Catch History page for viewing all recorded catches
- Persistent catch storage using H2 and Spring Data JPA
- Backend integration testing for catch creation and retrieval

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- React-Bootstrap
- Vite

### Backend

- Java
- Spring Boot
- Spring Data JPA
- H2 Database
- Gradle
- REST API

## Status

FishLog is actively under development. Catch data is currently persisted using an H2 database through Spring Data JPA. Planned work includes expanded catch management such as viewing individual catches, editing and deleting catches, user authentication and account ownership, additional frontend and backend testing, and deployment.
