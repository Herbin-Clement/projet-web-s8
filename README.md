# Projet application web

## Prérequis
- Docker (Pour éviter d'installer Jboss à la main, de plus, on peut éxécuter l'image sur n'importe quel pc avec Docker)
- NodeJS (Pour le front-end)

## Lancer le projet

### Démarrer le serveur
Il faut une archive **server.war**. Ensuite, il faut télécharger l'image docker Jboss avec la commande:
```bash
docker pull quay.io/wildfly/wildfly:26.0.0.Final
```
Enfin, il suffit de build l'image et de la démarrer en lançant:
```bash
sudo docker build --tag=project-jboss . # build l'image docker à partir du Dockerfile
sudo docker run -p 8080:8080 -p 9990:9990 project-jboss # démarre le conteneur en bindant le port 8080 sur 8080 et 9990 sur 9990
```
ou encore:
```bash
./run.sh
```
On peut vérifier que cela marche en allant sur: **http://localhost:8080/server/**.

### Démarrer le client
Il faut se déplacer dans le dossier du client puis lancer:
```bash
cd quizz
npm install
npm run start
```
On peut vérifier que cela marche en allant sur **http://localhost:3000**.