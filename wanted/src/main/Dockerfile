# Node.js를 베이스 이미지로 사용
FROM node:16-alpine

# 작업 디렉토리를 설정
WORKDIR /app

# package.json 및 package-lock.json을 복사
COPY ./front/package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY ./front/ ./

# 빌드 실행 (빌드된 정적 파일을 생성)
RUN npm run build

# React 애플리케이션을 서비스할 Nginx 설치
FROM nginx:alpine

# 빌드된 React 파일들을 Nginx의 기본 경로로 복사
COPY --from=0 /app/build /usr/share/nginx/html

# Nginx를 실행
CMD ["nginx", "-g", "daemon off;"]
