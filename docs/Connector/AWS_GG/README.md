---
sidebarDepth: 4
---
# Creating an AWS GreengrassV2 connection

## AWS GreengrassV2 overview

### Why using GreengrassV2 ?

Combining ***ThingPark Enterprise OCP*** together with ***AWS IoT GreengrassV2*** provides enterprises with a dependable local infrastructure to implement their Industrial IoT use cases.
![img](./img/GG_Overview.png)

***AWS IoT GreengrassV2*** extends AWS services onto local devices, so that they can act locally on the data ingested, while still taking advantage of the cloud.

***ThingPark Enterprise OCP*** powers highly available LoRaWAN(tm) private networks to ensure efficient sensors’ data aggregation, and smoothly connects to the local AWS GreengrassV2 Core Instance using its Greengrass Connector.

With this solution, sensors’ data can be aggregated and processed locally, and either synchronized to the cloud or delivered to the local application.

### Key Benefits

***Executed Locally – Managed globally -*** Combining GreengrassV2 with ThingPark Enterprise OCP, you don’t have to send your data to a distant cloud which saves you time in cases when milliseconds matter. Data is collected, processed and routed locally to ensure compliancy with the strictest security policies. Although the solution runs locally, Greengrass Core instances are managed from the cloud, ensuring a consistent deployment and maintenance of AWS workloads across multiple facilities, as well as a global application of the company security policies.

***No cloud-dependency -*** AWS GreengrassV2 ensures service continuity with spotty or no cloud connectivity. You may continue to perform local logic and actions based on LoRaWAN sensor input, even during loss of cloud connectivity, and buffer data until the Internet connection is restored. This complements a similar local buffering feature in LoRaWAN infrastructure gateways provided by ThingPark Enterprise and ensures that all critical sensor data is recovered after infrastructure or local connectivity outages.

***A dependable infrastructure -*** Mission critical applications require a fully redundant system, end to end. At radio level this can be provided by leveraging macro-diversity, ensuring that 2 or more gateways provide connectivity to each sensor. ThingPark Enterprise Network Server can also be deployed in HA mode with or without georedundancy, and the same applies to your GreengrassV2 server.

***Optimal cloud service consumption -*** Not all data is worth being sent to the cloud, especially when using high-cost or bandwidth-limited backhaul connections. AWS GreengrassV2 embeds local Lambda compute, local messaging and machine learning inference capabilities to allow data aggregation, transformation or filtering according to your needs. Such data processing is made simple with ThingPark Enterprise support for device CoDecs, making data available in JSON format to the Greengrass Core instance.

## How to install AWS GreengrassV2 in 6 steps

::: tip Note
This documentation still an overview for understanding main expected steps. Please also read the official documentation: [AWS IoT Greengrass V2 tutorials](https://docs.aws.amazon.com/greengrass/v2/developerguide/tutorials.html)
:::

![img](./img/GG_Workflow.png)

* Step 1. <a href="#prepare-iam-roles">Prepare IAM roles</a>
* Step 2. <a href="#gg-core-device-installation">GG Core Device installation</a>
* Step 3. <a href="#components-installation-&-setup">Components installation & setup</a>
* Step 4. <a href="#create-a-bridge-device">Create a bridge device</a>
* Step 5. <a href="#connecting-with-thingpark" style="color:teal" >Connecting with Thingpark</a>
* Step 6. <a href="#end-to-end-test">End to end test</a>

## Step 1 - Prepare IAM roles
For installing a GreengrassV2 localy, you need obtain credentials like describe here : [Managing access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)
All expected operations are described in "Step 1 of the getting started guide".
You need collect these two parameters :
```
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
```
## Step 2 - GG Core Device installation
Once you have set up your environment (Step 2 of the getting started guide), install your Greengrass core device following the Step 3 of the [Getting Started guide](https://docs.aws.amazon.com/greengrass/v2/developerguide/getting-started.html).
![img](./img/SetupOneCoreDevice.png)
![img](./img/SetupOneCoreDeviceStep1.png)

## Step 3 - Components installation & setup
You need follow this tutorial : [Tutorial: Interact with local IoT devices over MQTT](https://docs.aws.amazon.com/greengrass/v2/developerguide/client-devices-tutorial.html)

Expected components are : 
* aws.greengrass.clientdevices.Auth
* aws.greengrass.clientdevices.IPDetector
* aws.greengrass.clientdevices.mqtt.Moquette
* aws.greengrass.clientdevices.mqtt.Bridge (Optional) Only expected if you want relay messages from you local Greengrass to AWS IoT-Core.

Configuration on Auth is expected by the Actility connection (Component aws.greengrass.clientdevices.Auth). 
WARNING : You should adapt the thingName `GGActilityBridge` but the policyName could stay unchanged. 
```json
{
  "deviceGroups": {
    "formatVersion": "2021-03-05",
    "definitions": {
      "MyDeviceGroup": {
        "selectionRule": "thingName: GGActilityBridge",
        "policyName": "ActilityDevicePolicy"
      }
    },
    "policies": {
      "ActilityDevicePolicy": {
        "AllowConnect": {
          "statementDescription": "Allow client devices to connect.",
          "operations": [
            "mqtt:connect"
          ],
          "resources": [
            "*"
          ]
        },
        "AllowPublish": {
          "statementDescription": "Allow client devices to publish to all topics.",
          "operations": [
            "mqtt:publish"
          ],
          "resources": [
            "*"
          ]
        },
        "AllowSubscribe": {
          "statementDescription": "Allow client devices to subscribe to all topics.",
          "operations": [
            "mqtt:subscribe"
          ],
          "resources": [
            "*"
          ]
        }
      }
    }
  }
}
```

Configuration on Bridge is expected if you want relay your messages on AWS IoT-Core. 

Depending of your use case, you need do a choice that impact your architecture. The communication between Thingpark and GreengrassV2 Core (Local), could be done through one unique topic (Bridge topic) that collect all uplinks of all Thingpark devices, or you can choose a more traditional way by using one topic per devices.

### Bridge topic architecture (recommended)

A bridge topic concentrate all uplinks of all devices on a local Lambda function, you can create your own security rules and dispatch on AWS IoT-Core Cloud all messages that you want see. You control the traffic exchanged with the Cloud.
![img](./img/GG_BridgeTopic.png)

You bridge configuration is similar to this (Component aws.greengrass.clientdevices.mqtt.Bridge): 
```json
{
  "mqttTopicMapping": {
    "ThingParkToAwsIoTCoreMapping": {
      "topic": "tpx/things/ActilityGreengrassBridge/uplink",
      "source": "LocalMqtt",
      "target": "IotCore"
    }
  }
}
```
On Thingpark `uplinkTopicPattern` should be similar to this : `tpx/things/ActilityGreengrassBridge/uplink`
Collect this information for setup Actility connector.

### Device topic architecture
Each device has is own topic. You assume that all of your local devices can communicate with your AWS IoT-Core. If you already use AWS IoT-Core, this behavior is more traditional, but not recommended on a GreengrassV2 architecture, the traffic generated is not really controlled.

![img](./img/GG_DeviceTopic.png)

You bridge configuration should be similar to this (Component aws.greengrass.clientdevices.mqtt.Bridge): 
```json
{
  "mqttTopicMapping": {
    "ThingParkToAwsIoTCoreMapping": {
      "topic": "tpx/things/+/uplink",
      "source": "LocalMqtt",
      "target": "IotCore"
    }
  }
}
```
On Thingpark `uplinkTopicPattern` should be similar to this : `tpx/things/{DevEUI}/uplink`
Collect this information for setup Actility connector.

## Step 4 - Create a bridge device
The association with a client device still mandatory for our current connector implementation. You need create a Thing that represent a bridge.
You need follow these instructions on Step 2: [Tutorial: Interact with local IoT devices over MQTT](https://docs.aws.amazon.com/greengrass/v2/developerguide/client-devices-tutorial.html)

During this step, you need create a ThingPolicy. 
This setup could help you :
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:Publish",
        "iot:Subscribe",
        "iot:Connect",
        "iot:Receive"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "greengrass:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

Once you do it, you obtain the following informations : 
* Public key file also named Certificate
* Private key file
* AWS CA Certificate file (RSA 2048 Amazon Root CA 1)
* Certificate ARN of your created device. (Explore the created Things certificate.)

## Step 5 - Connecting with Thingpark
### Using TPE UI

On ThingPark Enterprise (TPE), you can create your Greengrass connection and inject all collected informations.
![img](./img/TPE_Connection_1.png)
![img](./img/TPE_Connection_2.png)

### Using REST API
The connection can be created throught REST API by using :

* `POST/connections` to create a new Connection instance
* `PUT/connections/{connectionId}` to update a Connection instance
* `DELETE/connections/{connectionId}` to delete a Connection instance

Example for creation of a new connection instance :

```json
{
  "connectorId": "actility-aws-iot-greengrass",
  "name": "Greengrass Core connection",
  "configuration": {
    "region": "eu-central-1",
    "accessKeyId": "I2DGDQPEUJNDTGFAR98Q",
    "secretAccessKey": "UKLctg3V/rFORwr9EF8Gxs/ciZlbI5bDNmPoellj",
    "deviceType": "ActilityGGADType",
    "uplinkTopicPattern": "tpx/things/ActilityGreengrassBridge/uplink",
    "downlinkTopicPattern": "tpx/things/ActilityGreengrassBridge/downlink",
    "ggHostName": "<IP Detected>:8883",
    "ggadThingName": "ActilityGreengrassBridge",
    "ggadCertificateId": "arn:aws:iot:eu-central-1:054762841076:cert/b129xxxx",
    "ggadCertificate": "-----BEGIN CERTIFICATE-----MIIDWTCQAkGsAwIB-----END CERTIFICATE-----",
    "ggadPrivateKey": "-----BEGIN RSA PRIVATE KEY-----MIIEsr-----END RSA PRIVATE KEY-----",
    "awsRootCa": "-----BEGIN CERTIFICATE-----MIIDQTCAAimgAwIBGxxxx-----END CERTIFICATE-----"
  }
}
```

::: warning WARNING
We recommend doing these steps to generate the inline certificates ggadPrivateKey and ggadCertificate:

**ggadPrivateKey**:

1. Inside your greengrass/certs folder, save the .private.key file on a linux machine
2. Execute the following command: `cat cb908e54bc.private.key | sed 's/$/\n/' | tr -d '\n'`
3. Copy and paste the value inside the json payload

**ggadCertificate**:

1. Inside your greengrass/certs folder, save the .cert.pem file on a linux machine
2. Execute the following command:    `cat cb783e54bc.cert.pem | tr -d '\n'`
3. Copy and paste the value inside the json payload
:::

## Step 6 - End to end test

Now we can test the uplink path.

1. Go to Test and subscribe to your topic (tpx/things/ActilityGreengrassBridge/uplink)

![img](./img/image34.png)

![img](./img/image35.png)

2. Start the Actility AWS Greengrass connection and wait for devices to send uplinks.

![img](./img/image36.png)

The missing devices are automatically created (unless `createDevices` is set explicit to false in connection config) using the specified deviceType inside connection config and having same thingPrincipal as bridge device.

![img](./img/image37.png)
