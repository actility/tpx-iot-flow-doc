---
sidebarDepth: 4
---

# CREATING AN MQTT CONNECTION

The MQTT connector requires an existing MQTT Broker installed and configured upfront.

## Creating a Connection With API

MQTT over TLS v1.2 connection is the recommended protocol to use with MQTT Brokers.
You need to create the connection prior to creating the flow. For more information, see [Creating a Connection instance](#connectionCreation).
The creation of a connection establishes a link from ThingPark Wireless to the MQTT Broker that you want to associate a Device with. The link can be used to transport any Uplink regardless the DevEUI parameter.
To do this, you need to use the following endpoints:
+	```POST/connections``` for creation
+	```PUT/connections``` for modification
+	```DELETE/connections``` for deletion

::: tip Note
When you update a configuration property on a connection, you must provide the whole configuration properties again.
:::

Example of the creation of a connection.

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
| ```configuration/uplinkTopicPattern``` | Defines a pattern of topic for the Uplink. |
| ```configuration/downlinkTopicPattern``` | Defines a pattern of topic for the Downlink. |
| ```configuration/hostName``` | Hostname/IP and port of your MQTT Broker. |
| ```configuration/protocol``` | Protocol to be used for the connection with your MQTT server, possible values are 'SSL' (MQTT over SSL), 'WSS' (MQTT over secure Web Sockets) or 'TCP' (MQTT over TCP without encryption). |
| ```configuration/username``` | Login to access your MQTT Broker.|
| ```configuration/trustedCaCertficate``` | Contents of the client CA certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when your+ client certificate is not self-sign). |
| ```configuration/certificate``` | Contents of the client certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password + client certificate). |
| ```configuration/privateKey``` | Contents of the client private key file (PKCS#8 format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password + client certificate). |
| ```configuration/connectionTimeout``` | Max time needed for establishing a connection. (Default=5000ms, max=10000ms) |
| ```configuration/actionTimeout``` | Max time available for each action like publishing a message or subscribe to a topic. (Default=1000ms, max = 10000ms) |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection From UI

You must have deployed a MQTT server prior to connecting with the MQTT protocol-based application. The MQTT server must be accessible from your ThingPark Enterprise server.

You also need to know the parameters that are required to perform this task. To learn more, click [Parameters required for connecting to a MQTT application](#requiredParameters) below in this topic.

1. Click Applications -> Create -> View More Applications Type.

![img](./images/ui/create_connection.png)

Then, a new page will open. Select the connection type : MQTT.

![img](./images/ui/create_mqtt.png)

::: tip Note
The application creation form is the same for a JSON enriched document as for a JSON legacy document.
:::

2. Fill in the form as in the example below.
   
![img](./images/ui/connection_creation.png)

::: tip Note
Parameters marked with * are mandatory.

The Certificate and the Private Key are required for both SSL and WSS protocols. This does not apply to TCP.
:::

3. Click **Create**.

* A notification appears on the upper right side of your screen to confirm that the application has been created.
![img](./images/ui/notification_created.png)
  
4. After creating the application, you will be redirected to the application details.

![img](./images/ui/application_details.png)

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

## Limitations

There are currently no known limitations to the MQTT connector.

## Displaying Information to Know if it Worked

1. Download and install a MQTT client, for example [MQTT.fx](https://mqttfx.jensd.de/).

2. <a id="connectionCreation">**Create** a new connection and **connect** to the MQTT Broker using your configuration:</a>

 ![img](./images/mqtt_create_connection.png)
 ![img](./images/connect.png)

3. Select the **Subscribe** tab, fill the uplink topic you want to monitor (that is, ``loopBackTool/mqtt/things/78AF110300000345/uplink``) and click Subscribe.

![img](./images/subscribeTab.png)

You should see incoming uplinks in the right part of the screen.

## Troubleshooting

[comment]: <> (<a name="troubleshooting"></a>)

### MQTT Broker so far

Probably, if your MQTT Broker is really far from the Actility platform, the connection could take time to be establish, the latency can be to high and a timeout could appear. These two parameters can help you :

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| **configuration/connectionTimeout** | Max time needed for establishing a connection. | Default=5s, max=10s |
| **configuration/actionTimeout** | Max time available for each action like publishing a message or subscribe to a topic. | Default=1s, max = 10s |

### AWS MQ Broker tips

If you want use security rules on AWS MQ broker, you can be inspirate by this one.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:Connect"
      ],
      "Resource": "arn:aws:iot:eu-west-1:696969696969:client/*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "iot:Publish",
        "iot:Receive"
      ],
      "Resource": "arn:aws:iot:eu-west-1:696969696969:topic/lora/uplink",
      "Effect": "Allow"
    },
    {
      "Action": [
        "iot:Publish",
        "iot:Receive"
      ],
      "Resource": "arn:aws:iot:eu-west-1:696969696969:topic/lora/downlink",
      "Effect": "Allow"
    },
    {
      "Action": [
        "iot:Subscribe"
      ],
      "Resource": "arn:aws:iot:eu-west-1:696969696969:topicfilter/lora/downlink",
      "Effect": "Allow"
    }
  ]
}
```
