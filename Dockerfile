FROM quay.io/wildfly/wildfly:26.0.0.Final
ADD server.war /opt/jboss/wildfly/standalone/deployments/
COPY standalone.xml /opt/jboss/wildfly/standalone/configuration/