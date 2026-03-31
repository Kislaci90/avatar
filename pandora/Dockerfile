FROM amazoncorretto:23

WORKDIR /app

# Install necessary build tools
RUN yum update -y && yum install -y findutils grep && yum clean all

# Copy the Gradle files
COPY build.gradle ./
COPY gradle ./gradle
COPY gradlew ./

# Make gradlew executable
RUN chmod +x gradlew

# Copy the source code
COPY src ./src

# Build the application
RUN ./gradlew build --no-daemon -x test

# Expose the port
EXPOSE 8080

# Run the application
CMD ["./gradlew", "bootRun"]