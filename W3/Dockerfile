FROM nginx:alpine

# Copy static site files to Nginx web root
COPY index.html /usr/share/nginx/html/index.html
COPY display.html /usr/share/nginx/html/display.html
COPY style.css /usr/share/nginx/html/style.css
COPY index.js /usr/share/nginx/html/index.js

EXPOSE 80

# cd "D:\PICT-IT\3 TE IT\SEM-6\WAD\WAD-Assignments-main\assignment_1B"
# docker build -t assignment1b-web .
# docker rm -f assignment1b-container
# docker run -d --name assignment1b-container -p 8081:80 assignment1b-web
# docker ps

# start http://localhost:8081/index.html