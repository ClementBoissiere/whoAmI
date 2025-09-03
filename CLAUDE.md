# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Spring Boot application called "whoamI" - a guessing game where users try to identify a personality of the day through chat interactions. The application uses LangChain4J with Mistral AI for intelligent conversations.

## Architecture

The application follows a standard Spring Boot structure with these key components:

- **Chat System**: `messages/` package handles chat interactions with AI
  - `ChatController` exposes `/test` endpoint for chat messages
  - `ChatService` interface with implementation for AI communication
  - Chat models for request/response handling

- **Personality System**: `personality/` package manages daily personalities
  - `PersonalityController` provides endpoints for current/past personalities
  - `PersonalityService` handles personality logic and win condition checking
  - Endpoints: `/personality`, `/oldPersonalities`, `/lastPersonality`

- **Configuration**: 
  - Spring Security configured in `configurations/SpringBootSecurityConfiguration`
  - Chat configuration in `configurations/ChatConfiguration`
  - API keys managed in `key/ApiKeys`

## Development Commands

**Build the application:**
```bash
cd whoami
./mvnw clean compile
```

**Run the application:**
```bash
cd whoami
./mvnw spring-boot:run
```

**Run tests:**
```bash
cd whoami
./mvnw test
```

**Package the application:**
```bash
cd whoami
./mvnw clean package
```

## Key Dependencies

- Spring Boot 3.2.5 (Java 21)
- Spring Security
- LangChain4J 0.30.0 with Mistral AI integration
- Lombok for boilerplate reduction
- Log4j for logging

## API Configuration

The application uses Mistral AI for chat functionality. API configuration is managed through `application.properties` and the `ApiKeys` class.

## Frontend

There's a separate `whoamI-front/` directory that contains the frontend component of the application.