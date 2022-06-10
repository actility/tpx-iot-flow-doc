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

## How to install AWS GreengrassV2

Install your AWS GreengrassV2 in 3 steps.

![img](./img/GG_install_plan.png)

1. <a href="#linux-greengrass-core-local-installation">GreengrassV2 Core local installation</a>

2. <a href="#connecting-with-thingpark" style="color:teal" >Connecting with Thingpark</a>

3. <a href="#end-to-end-testing" style="color:teal" >End to end testing</a>

## GreengrassV2 Core local installation

::: tip Note
This documentation still an overview for understanding main expected steps. Please also read the official documentation: <a href="https://docs.aws.amazon.com/greengrass/v2/developerguide/tutorials.html" style="color:teal" >AWS IoT Greengrass V2 tutorials</a>
:::


1. <a href="#obtain-iam-access-keys">Obtain IAM Access keys</a>

2. <a href="#connecting-with-thingpark" style="color:teal" >Connecting with Thingpark</a>

3. <a href="#end-to-end-testing" style="color:teal" >End to end testing</a>


## Obtain IAM Access keys
For installing a GreengrassV2 localy, you need obtain credentials like describe here : <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html" style="color:teal" >Managing access keys for IAM users</a>
All expected operations are described in "Step 1 of the getting started guide".
You need collect these two parameters :
```
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "secretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
```
## Install your GreengrassV2 core device
Once you have set up your environment (Step 2 of the getting started guide), you install your Greengrass core device (Step 3).

## Install expected components on GreengrassV2 core device
You need follow this tutorial : <a href="https://docs.aws.amazon.com/greengrass/v2/developerguide/client-devices-tutorial.html" style="color:teal" >Tutorial: Interact with local IoT devices over MQTT</a>

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

## Configure client discovery
The association with a client device still mandatory for our current connector implementation.
You need follow these instructions on Step 2: <a href="You need follow this tutorial : <a href="https://docs.aws.amazon.com/greengrass/v2/developerguide/client-devices-tutorial.html" style="color:teal" >Tutorial: Interact with local IoT devices over MQTT</a>

Once you do it, you obtain the following informations : 
* Public key file also named Certificate
* Private key file
* AWS CA Certificate file (RSA 2048 Amazon Root CA 1)
* Certificate ARN of your created device. (Explore the created Things certificate.)

## Test your deployment
You can test your deployment by run the following command to check the status of the deployment. Replace MyGreengrassCore with the name of your core device.

`aws greengrassv2 list-effective-deployments --core-device-thing-name MyGreengrassCore`

A result similar to this could help you to know if your latest modification on Bridge component is really deployed.
```json 
{
  "effectiveDeployments": [
    {
      "deploymentId": "f7448f11-dd3d-441a-b8f2-5534d70e5817",
      "deploymentName": "Deployment for GGActilityGroup",
      "iotJobId": "95b65771-d221-492d-af1b-789e5d343e07",
      "iotJobArn": "arn:aws:iot:eu-central-1:066681621542:job/95b65771-d221-492d-af1b-789e5d343e07",
      "targetArn": "arn:aws:iot:eu-central-1:066681621542:thinggroup/GGActilityGroup",
      "coreDeviceExecutionStatus": "SUCCEEDED",
      "reason": "SUCCESSFUL",
      "creationTimestamp": "2022-06-08T22:04:37.520000+02:00",
      "modifiedTimestamp": "2022-06-08T22:40:12.525000+02:00"
    }
  ]
}
```

## Connecting with Thingpark
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

### Using TPE UI

On ThingPark Enterprise (TPE), you can create your Greengrass connection.
![img](./img/TPE_Connection_1.png)
![img](./img/TPE_Connection_2.png)

### Creation of subscriptions

To allow messages to flow from bridge device to cloud and from cloud to
bridge device we need to add 2 Subscriptions and do a new deployment.

1. Go to Subscriptions and select <Badge vertical="middle" text="Add Subscription"/>

![img](./img/image22.png)

2. For uplink path select source bridge device to service IoT Cloud and
click <Badge vertical="middle" text="Next"/>

![img](./img/image23.png)

![img](./img/image24.png)
::: tip Note
If you use a topic per device (that contain {DevEUI}),  you need replace {DevEUI} variable with +<br/>
*Example:* tpx/things/{DevEUI}/uplink become tpx/things/+/uplink
:::
![img](./img/image25.png)

3. On confirmation page press <Badge vertical="middle" text="Finish"/>

![img](./img/image26.png)

![img](./img/image27.png)

We do the same steps to add a Subscription for downlink path, from IoT Cloud Service to bridge device and choose topic filter similar to downlinkTopicPattern `tpx/things/+/downlink`

![img](./img/image28.png)

![img](./img/image29.png)

![img](./img/image30.png)

![img](./img/image31.png)

![img](./img/image32.png)

In the end don't forget to do a new <Badge vertical="middle" text="Deploy"/>

![img](./img/image33.png)

## End to end testing

Now we can test the uplink path.

1. Go to Test and subscribe to your topic (tpx/things/ActilityGreengrassBridge/uplink)

![img](./img/image34.png)

![img](./img/image35.png)

2. Start the Actility AWS Greengrass connection and wait for devices to send uplinks.

![img](./img/image36.png)

The missing devices are automatically created (unless `createDevices` is set explicit to false in connection config) using the specified deviceType inside connection config and having same thingPrincipal as bridge device.

![img](./img/image37.png)
