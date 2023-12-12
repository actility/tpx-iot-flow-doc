---
sidebarDepth: 4
sidebar_label: Connecting to MQTT
---

# CREATING AN MQTT CONNECTION

The MQTT connector requires access to a MQTT broker.

## Creating a Connection from the UI

You must have deployed a MQTT server prior to configuring a MQTT Connector instance. The MQTT server must be accessible from your ThingPark Enterprise server, and you need to know the path of MQTT topics you want to publish to (uplinks) or subscribe (downlinks).

You also need to know the parameters that are required to perform this task. To learn more, click [Parameters required for connecting to a MQTT application](#requiredParameters) below in this topic.

1. Click Applications -&gt; Create -&gt; View More Applications Type.

![img](images/ui/create_connection.png)

Then, a new page will open. Select the connection type : MQTT.

![img](images/ui/create_mqtt.png)

:::tip Note
The application creation form is the same for a JSON enriched document as for a JSON legacy document.
:::

2. Fill in the form as in the example below.
   
![img](images/ui/connection_creation.png)

:::tip Note
Parameters marked with * are mandatory.

The Certificate and the Private Key are required for both SSL and WSS protocols. This does not apply to TCP.
:::

3. Click **Create**.

* A notification appears on the upper right side of your screen to confirm that the application has been created.
![img](images/ui/notification_created.png)
  
4. After creating the application, you will be redirected to the application details.

![img](images/ui/application_details.png)

<a id="requiredParameters">**Parameters required for connecting to a MQTT application**</a>

The parameters are the following:

| UI Field | Description |
| ------ | ----------- |
| **Application Name** | Name of the application that you want to register (Editable). |
| **Uplink Topic Pattern** | Defines a pattern of topic for the Uplink.|
| **Downlink Topic Pattern** | Defines a pattern of topic for the Downlink.|
| **Host Name** | The hostname/IP and port of your MQTT server. For example, "myhostname.com:8883".|
| **Protocol** | Protocol to be used for your connection with your MQTT server. Choose among SSL, WSS and TCP.|
| **Username** | The username to access your MQTT server. |
| **Password** | The password to access your MQTT server. |
| **Certificate** | <ul><li>The client certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password and client interface).</li></ul><ul><li>This parameter does not apply to TCP protocol.</li></ul>|
| **Private Key** | <ul><li>The client Private Key file (PKCS#8 format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password and client interface).</li></ul><ul><li>This parameter does not apply to TCP protocol.</li></ul> |
| **Description** | Any useful information related to the application. |

## Creating a Connection With API

MQTT over TLS v1.2 connection is the recommended protocol to use with MQTT Brokers.
You need to create a MQTT Connector instance (Connection) before you can associate it to device(s). For more information, see [Creating a Connection instance](#connectionCreation).
The creation of a Connection establishes a link from ThingPark IoT Flow to the MQTT Broker. The link can be used to publish Uplink and related metadata information for any device associated to this instance of MQTT Connector, but will also publish messages that may have been redirected from other Connectors.

To do this, you need to use the following endpoints:
+	```POST/connections``` for creation
+	```PUT/connections``` for modification
+	```DELETE/connections``` for deletion

:::tip Note
When you want to update a configuration property on a Connection, you must provide all configuration properties again.
:::

Example of the creation of a Connection.

```json
    POST /connections
    
    {
      "connectorId": "actility-mqtt-iot",
      "name": "Actility MQTT (SSL) Connection",
      "configuration": {
        "description": "MQTT (SSL) connection example",
        "uplinkTopicPattern": "mqtt/things/{DevEUI}/uplink",
        "downlinkTopicPattern": "mqtt/things/{DevEUI}/downlink",
        "hostName": "91.134.250.109:8883",
        "protocol": "SSL",
        "username": "mycompany",
        "password": "bar",
        "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
        "privateKey": "-----BEGIN RSA PRIVATE KEY-----...-----END RSA PRIVATE KEY-----"
      }
    }
```

The following table lists the expected results of the properties when applied.

| Property | Expected results |
| ------ | ----------- |
| ```connectorId```   | Must be set to actility-mqtt-iot for AWS IoT cloud platform. |
| ```configuration/uplinkTopicPattern``` | Defines a pattern of topic for the Uplink. Could contain JSONPath expression, check [common parameters section](../../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters) for examples. |
| ```configuration/downlinkTopicPattern``` | Defines a pattern of topic for the Downlink. Could contain JSONPath expression, check [common parameters section](../../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters) for examples.|
| ```configuration/hostName``` | Hostname/IP and port of your MQTT Broker. |
| ```configuration/protocol``` | Protocol to be used for the connection with your MQTT server, possible values are 'SSL' (MQTT over SSL), 'WSS' (MQTT over secure Web Sockets) or 'TCP' (MQTT over TCP without encryption). |
| ```configuration/username``` | Login to access your MQTT Broker.|
| ```configuration/trustedCaCertficate``` | Contents of the client CA certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when your+ client certificate is not self-sign). |
| ```configuration/certificate``` | Contents of the client certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password + client certificate). |
| ```configuration/privateKey``` | Contents of the client private key file (PKCS#8 format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password + client certificate). |
| ```configuration/connectionTimeout``` | Max time needed for establishing a connection. (Default=5000ms, max=30000ms) |
| ```configuration/actionTimeout``` | Max time available for each action like publishing a message or subscribe to a topic. (Default=1000ms, max = 10000ms) |

:::warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Limitations

There are currently no known limitations to the MQTT connector.

## How to test the MQTT Connection

1. Download and install a MQTT client, for example [MQTT Explorer](http://mqtt-explorer.com/) or [MQTT.fx](https://mqttfx.jensd.de/).

2. <a id="connectionCreation">**Create** a new connection and **connect** to the MQTT Broker using your configuration:</a>

 ![img](images/mqtt_create_connection.png)
 ![img](images/connect.png)

3. Select the **Subscribe** tab, fill the uplink topic you want to monitor (that is, ``mqtt/things/+/uplink``) and click Subscribe.

![img](images/subscribeTab.png)

You should see incoming uplinks (published by your IoT Flow MQTT connector) in the right part of the screen.

In order to test the processing of subscribed topic messages by the MQTT connector, you need to properly format the message.
LoRaWAN Commands targeted to a given DevEUI look like this: 
```shell
mosquitto_pub \
 -h $BROKER_PUBLIC \
 -p $TLS_PUBLIC_LISTENER \
 -u $SUPER_USERNAME \
 -P $SUPER_PASSWORD \
 -t "mqtt/things/A81758FFFE04F27E/downlink" \
 -m '{
         "DevEUI_downlink": {
             "Time": "2022-06-08T15:50:00.882+02:00",
             "DevEUI": "A81758FFFE04F27E",
             "FPort": "8",
             "payload_hex": "9e1c4852512000220020e3831071",
             "Confirmed": "1",
             "FlushDownlinkQueue": "1"
         }
     }'
```
Any other JSON message will be accepted and processed by the forwarding rules configured in the MQTT connector (forwarding rules do not apply to Commands).
Messages not properly JSON-formatted will be ignored.

## Troubleshooting

[comment]: &lt;&gt; (<a name="troubleshooting"></a>)

### MQTT Broker timeouts

If your MQTT Broker is really far from the Actility platform, the network latency can cause the MQTT connection to timeout. These two parameters may need to be tuned accordingly :

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| **configuration/connectionTimeout** | Max time allowed for establishing a connection. | Default=5s, max=10s |
| **configuration/actionTimeout** | Max time available for each action, e.g. publishing a message or subscribe to a topic. | Default=1s, max = 10s |
