1.  프로젝트 사용 도구
    이슈 관리 : JIRA
    형상 관리 : Gitlab
    커뮤니케이션 : Notion, Mattermost
    디자인 : Figma
    CI/CD : Jenkins

2.  개발 환경
    gradle version : 7.6.2
    jdk : 17
    JPA : 3.1.4
    Fastapi : 0.90.1
    Python : 3.10.5
    Nodejs : 18.17.1
    mysql : 8.0.33
    Spring : 3.1.3
    vscode : 1.79.2
    Intellij IDEA : 2023.2.1 (Ultimate Edition)
    DB : mysql (azure)
    SERVER : AWS EC2 Ubuntu 20.04.3 LTS
    NGINX : 1.18.0
    Docker : 24.0.6

3.  외부 서비스
    피나타(finata):
    nft Service(API키 필요)
    클로바OCR:
    사진의 text를 불러옴(API키 필요)
    ngrok:
    AI fastapi public url 생성(계정 연결 시 세션시간 연장)

4.  빌드하기
    front-react:
    npm i
    npm start
    back-spring:
    gradle 실행
    Bootjar 실행
    back-fastapi:
    pip install -r requirements.txt
    python launch.py
    back-node:
    npm i
    npm start

5.  환경 변수
    MYSQL_DATABASE: diti
    MYSQL_ROOT_PASSWORD: 1234
    TZ: Asia/Seoul
    SPRING_DATASOURCE_URL: 'jdbc:mysql://diti_mysql:3306/diti'
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: 1234
    SPRING_JPA_HIBERNATE_DDL-AUTO: 'update'
    MYSQL_DATABASE: uniqon
    MYSQL_ROOT_PASSWORD: ssafyuniqon
    TZ: Asia/Seoul
    SPRING_DATASOURCE_URL: 'jdbc:mysql://uniqonMysql:3306/uniqon'
    SPRING_DATASOURCE_USERNAME: root
    SPRING_DATASOURCE_PASSWORD: ssafyuniqon
    SPRING_JPA_HIBERNATE_DDL-AUTO: 'update'
    SERVER_PORT: 5001
    REDIRECT_URL: https://j9c201.p.ssafy.io
    SPRING_SERVER_URI: http://uniqonSpringServer:5001
    DITI_SERVER_URL: https://j9c201.p.ssafy.io
    BC_NETWORK: 'https://gethrpc.ssafy-blockchain.com'
    BC_NETWORK_NAME: 'sepolia'
    BC_SMART_CONTRACT_ADDRESS: '0xc9C8Db9F05bF5A0ab10511Bc6Df56c300fbcf3B3'
