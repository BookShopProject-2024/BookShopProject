# 베이스 이미지로 Java 17 사용
FROM eclipse-temurin:17-jdk-alpine

# 빌드된 JAR 파일을 이미지에 추가
ADD ./build/libs/*.jar app.jar

# 애플리케이션을 실행하는 엔트리포인트 설정
ENTRYPOINT ["java", "-jar", "app.jar"]
