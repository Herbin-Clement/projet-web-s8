sudo docker build --tag=project-jboss .
sudo docker run -p 8080:8080 -p 9990:9990 project-jboss