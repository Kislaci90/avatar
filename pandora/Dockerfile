FROM openjdk:23-jdk-slim

WORKDIR /app

# Copy the Gradle files
COPY build.gradle ./
COPY gradle ./gradle
COPY gradlew ./

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy the source code
COPY src ./src

# Build the application
RUN ./gradlew build --no-daemon

# Expose the port
EXPOSE 8080

# Run the application
CMD ["./gradlew", "bootRun"]