---
sidebarDepth: 4
---

# CREATING AN ADVANTECH CONNECTION

## Collecting Expected Information

**Parameters required**

| Field | Description |
| ------ | ----------- |
| ```App arguments``` | As for now, we can't describe |


## Creating a Connection With API

The creation of a connection establishes a unidirectional messaging transport link to the cloud provider.

To do this, you need to use the **Connections** group resource:
*	`POST/connections` to create a new Connection instance
*	`PUT/connections` to update a Connection instance
*	`DELETE/connections` to delete a Connection instance

::: tip Note
We follow the REST-full API pattern, when updating configuration properties for a connection resource. Thus, you must also provide the whole configuration again.
:::

Example for creation of a new connection instance :

```json
POST /connections
{
    "connectorId": "actility-advantech-iot",
    "name": "Actility ADVANTECH (SSL) Connection",
    "configuration": {
      "description": "ADVANTECH (SSL) connection example",
      "uplinkTopicPattern": "mqtt/things/{DevEUI}/uplink",
      "downlinkTopicPattern": "mqtt/things/{DevEUI}/downlink",
      "hostName": "91.134.250.109:8883",
      "protocol": "SSL",
      "username": "mycompany",
      "password": "bar",
      "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
      "privateKey": "-----BEGIN RSA PRIVATE KEY-----...-----END RSA PRIVATE KEY-----",
      "appargs": "WISE-2410"
    }
}
```

The following table lists the properties applicable to a connection instance.

| Property | Expected results |
| ------ | ----------- |
| ```connectorId```   | Must be set to actility-mqtt-iot for AWS IoT cloud platform. |
| ```configuration/uplinkTopicPattern``` | Defines a pattern of topic for the Uplink. |
| ```configuration/downlinkTopicPattern``` | Defines a pattern of topic for the Downlink. |
| ```configuration/hostName``` | Hostname/IP and port of your MQTT Broker. |
| ```configuration/protocol``` | Protocol to be used for the connection with your MQTT server, possible values are 'SSL' (MQTT over SSL), 'WSS' (MQTT over secure Web Sockets) or 'TCP' (MQTT over TCP without encryption). |
| ```configuration/username``` | Login to access your MQTT Broker.|
| ```configuration/password``` | Login to access your MQTT Broker.|
| ```configuration/trustedCaCertficate``` | Contents of the client CA certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when your+ client certificate is not self-sign). |
| ```configuration/certificate``` | Contents of the client certificate file (X.509 with .crt format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password + client certificate). |
| ```configuration/privateKey``` | Contents of the client private key file (PKCS#8 format only) used to connect to your MQTT server. Only required when you are using double factor authentication (login/password + client certificate). |
| ```configuration/connectionTimeout``` | Max time needed for establishing a connection. (Default=5000ms, max=10000ms) |
| ```configuration/actionTimeout``` | Max time available for each action like publishing a message or subscribe to a topic. (Default=1000ms, max = 10000ms) |
| ```configuration/appargs``` | Your application arguments |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection With UI

1. Click Connections -> Create -> **ThingPark X IoT Flow**
![create](./images/create.png)


2. Then, a new page will open. Select the connection type: **ADVANTECH**.
![select](./images/select.png)

3. Fill in the form as in the example below and click on **Create**.
![filled_form](./images/filled_form.png)
![filled_form_2](./images/filled_form_2.png)

::: tip Note
Parameters marked with * are mandatory.
:::

4. A notification appears on the upper right side of your screen to confirm that the application has been created.

5. After creating the application, you will be redirected to the connection details.

## Limitations

ADVANTECH connector is limited to Advantech WISE-2410 device.

## Displaying information to know if it worked

As for now, we can't describe this part.

## Troubleshooting

As for now, there are no detected bugs.
