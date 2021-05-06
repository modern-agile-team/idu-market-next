FROM node:14
MAINTAINER 박우림 <woorimprog@gmail.com>

# 앱 디렉터리 생성
RUN mkdir /idu-market-next
WORKDIR /idu-market-next

# idu-market-next 폴더 안에 app 폴더 생성
RUN mkdir ./app

# 로컬에 있는 app폴더 안에 package*.json 파일들을 도커 컨테이너 안에 app 폴더 안으로 복사
COPY ./app/package*.json ./app/
COPY ./app/yarn.lock ./app/

# 의존성 설치
WORKDIR ./app
RUN npm install

# 노드 서버 가동을 위해 필요한 파일들 복사
COPY ./app/components ./components/
COPY ./app/Data ./Data/
COPY ./app/pages ./pages/
COPY ./app/public ./public/
COPY ./app/redux ./redux/
COPY ./app/scss ./scss/
COPY ./app/styles ./styles/
COPY ./app/.next.config.js ./
COPY ./app/.env.production ./

# Next 빌드
RUN npm run build

# 노드 서버 가동
EXPOSE 3000
CMD ["npm", "start"]