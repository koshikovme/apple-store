#FROM maven:3.8.3-openjdk-17 AS backend
#WORKDIR /app/backend
#EXPOSE 8080
#COPY pom.xml ./
#RUN mvn dependency:go-offline
#COPY src ./src
#RUN mvn package -DskipTests install

FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app
COPY src ./src
COPY pom.xml .
RUN mvn clean package
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar ./store2.jar
COPY electronicsstore.sql /docker-entrypoint-initdb.d/electronicsstore.sql



EXPOSE 8080
ENTRYPOINT ["java","-jar","store2.jar"]

