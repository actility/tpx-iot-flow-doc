---
sidebarDepth: 4
---
# Creating an AWS GreenGrassV2 connection
## AWS GreenGrassV2 overview
### Why using GreenGrassV2 ?
Combining ***ThingPark Enterprise OCP*** together with ***AWS IoT GreenGrassV2*** provides enterprises with a dependable local infrastructure to implement their Industrial IoT use cases.  
![img](./img/GG_Overview.png)

***AWS IoT GreenGrassV2*** extends AWS services onto local devices, so that they can act locally on the data ingested, while still taking advantage of the cloud.

***ThingPark Enterprise OCP*** powers highly available LoRaWAN(tm) private networks to ensure efficient sensors’ data aggregation, and smoothly connects to the local AWS GreenGrassV2 Core Instance using its Greengrass Connector.

With this solution, sensors’ data can be aggregated and processed locally, and either synchronized to the cloud or delivered to the local application.

### Key Benefits

***Executed Locally – Managed globally -*** Combining GreenGrassV2 with ThingPark Enterprise OCP, you don’t have to send your data to a distant cloud which saves you time in cases when milliseconds matter. Data is collected, processed and routed locally to ensure compliancy with the strictest security policies. Although the solution runs locally, Greengrass Core instances are managed from the cloud, ensuring a consistent deployment and maintenance of AWS workloads across multiple facilities, as well as a global application of the company security policies.

***No cloud-dependency -*** AWS GreenGrassV2 ensures service continuity with spotty or no cloud connectivity. You may continue to perform local logic and actions based on LoRaWAN sensor input, even during loss of cloud connectivity, and buffer data until the Internet connection is restored. This complements a similar local buffering feature in LoRaWAN infrastructure gateways provided by ThingPark Enterprise and ensures that all critical sensor data is recovered after infrastructure or local connectivity outages.

***A dependable infrastructure -*** Mission critical applications require a fully redundant system, end to end. At radio level this can be provided by leveraging macro-diversity, ensuring that 2 or more gateways provide connectivity to each sensor. ThingPark Enterprise Network Server can also be deployed in HA mode with or without georedundancy, and the same applies to your GreenGrassV2 server.

***Optimal cloud service consumption -*** Not all data is worth being sent to the cloud, especially when using high-cost or bandwidth-limited backhaul connections. AWS GreenGrassV2 embeds local Lambda compute, local messaging and machine learning inference capabilities to allow data aggregation, transformation or filtering according to your needs. Such data processing is made simple with ThingPark Enterprise support for device CoDecs, making data available in JSON format to the Greengrass Core instance.

## How to install AWS GreenGrassV2

Install your AWS GreenGrassV2 in 4 steps.
![img](./img/GG_install_plan.png)

1. <a href="#set-up-your-greengrass-group">Set Up your GreenGrassV2 Group</a>
2. <a href="#linux-greengrass-core-local-installation">GreenGrassV2 Core local installation</a><br/>
  2.a. <a href="#linux-greengrass-core-local-installation">Linux GreenGrassV2 Core local installation</a><br/>
  2.b. <a href="#windows-10-greengrass-core-local-installation">Windows 10 GreenGrassV2 Core local installation</a><br/>
3. <a href="#connecting-with-thingpark">Connecting with Thingpark</a>
4. <a href="#end-to-end-testing">End to end testing</a>

### Set Up your GreenGrassV2 Group

1. To start with AWS IoT GreenGrassV2 you need first to create a GreenGrassV2
group: go to AWS IoT Core console and select *GreenGrass* -\> *Classic (V1)* -\> *Groups* -\>
<Badge vertical="middle" text="Create Group"/>

![img](./img/image1.png)

2. On next screen select <Badge vertical="middle" text="Use default creation"/>

![img](./img/image2.png)

3. Fill the group name and press <Badge vertical="middle" text="Next"/>

![img](./img/image3.png)

4. Select a name for the GreenGrassV2 Core device and a Thing Type (existing
or create a new one) and press <Badge vertical="middle" text="Next"/>

![img](./img/image4.png)

5. On Review Group creation page, press <Badge vertical="middle" text="Create Group and Core"/>

![img](./img/image5.png)

6. On the final page press <Badge vertical="middle" text="Download these resources as a tar.gz"/> to save
the GreenGrassV2 Core device settings that allow local GreenGrassV2 to
communicate with AWS IoT Core.

On this page you can also download GreenGrassV2 Core software to install
it on your device. Alternative is to use the docker version of it, as we
detail later in the doc.

![img](./img/image6.png)

7. Press <Badge vertical="middle" text="Finish"/> and you will see the new GreenGrassV2 Group is created.

![img](./img/image7.png)

8. Select the newly created GreenGrassV2 Group

![img](./img/image8.png)

::: warning Important note
Each GreenGrassV2 Group has one Core. <br/>
We will create automatically a single virtual device (GreenGrassV2 Aware Device GGAD) that will connect to local GreenGrassV2 and multiplex all messages over a MQTT connection. This GGAD is created only when an uplink is sent.<br/>
Also we need to add Subscriptions from local to cloud (for uplink path) and from cloud to local (for downlink path). See  <a href="#creation-of-subscriptions">**Creation of subscriptions**</a><br/>
Of course GreenGrassV2 allows much complex scenarios like *Device -\> Lambda -\> Device* all local, without sending data to cloud at all. The customer can define other Subscriptions, Lambdas etc than default ones.
:::

### Linux GreenGrassV2 Core local installation

1. The downloaded certificate tar.gz file at the end of the GreenGrassV2 group creation
contains 2 folders: *certs* and *config*.<br/>
Extract the archive for example under `/greengrass` folder, so you will have `/greengrass/certs` and
`/greengrass/config` paths.

Beside Core Device certificate/privateKey you need also AWS Root CA too:

    curl https://www.amazontrust.com/repository/AmazonRootCA1.pem -o
    /greengrass/certs/root.ca.pem

2a. For ***Linux*** env run the following command (assuming you use `/greengrass`
folder):

    docker run \--rm \--privileged \--init -it \--name aws-iot-greengrass
    \--entrypoint /greengrass-entrypoint.sh -v
    /greengrass/certs:/greengrass/certs -v
    /greengrass/config:/greengrass/config -v
    /greengrass/ggc/var/log:/greengrass/ggc/var/log -p 8883:8883
    amazon/aws-iot-greengrass

### Windows 10 GreenGrassV2 Core local installation

1. The downloaded certificate tar.gz file at the end of the GreenGrassV2 group creation
contains 2 folders: *certs* and *config*.<br/>
Extract the archive under `C:/greengrass` folder, so you will have `C:/greengrass/certs` and
`C:/greengrass/config` paths.

2. You also need to download the AWS Root CA:

```
  curl https://www.amazontrust.com/repository/AmazonRootCA1.pem -o
    C:/greengrass/certs/root.ca.pem
```

3. Start GreenGrassV2 core by running the following command: 

```
    docker run --rm --privileged --init -it --name aws-iot-greengrass -v c:/greengrass/certs:/greengrass/certs -v c:/greengrass/config:/greengrass/config -v c:/greengrass/ggc/var/log:/greengrass/ggc/var/log -p 8883:8883 amazon/aws-iot-greengrass
```

After execution, it should open the bash prompt. Then, Remount the proc directory as rw by running this command:

    mount -o remount rw /proc

After remounting the proc directory, edit the protected_hardlinks with this command:

    echo 1 \> /proc/sys/fs/protected_hardlinks

Edit the protected_symlinks with this command:

    echo 1 \> /proc/sys/fs/protected_symlinks

 Start GreenGrassV2 with the command below:

    ./greengrass-entrypoint.sh

The result could be similar to:  

    bash-4.2# ./greengrass-entrypoint.sh
    grep: /greengrass/ggc/deployment/group/group.json: No such file or directory
    Setting up greengrass daemon
    Validating hardlink/softlink protection
    Waiting for up to 1m10s for Daemon to start

    Greengrass successfully started with PID: 15

::: tip Note
Alternative is to follow the instructions how to install GreenGrassV2 Core
software depending on your OS:
[AWS IoT GreenGrassV2 downloads](https://docs.aws.amazon.com/greengrass/latest/developerguide/what-is-gg.html#gg-downloads)
:::


3. At this point you can go to the GreenGrassV2 Group page and from *Actions*
menu do a new <Badge vertical="middle" text="Deploy"/>, so that the latest config done on the cloud is
synced with local GreenGrassV2.

![img](./img/image10.png)

4. Select <Badge vertical="middle" text="Automatic detection"/> on next page of the deployment:

![img](./img/image11.png)

After a few seconds you should be able to see the deployment result:

![img](./img/image12.png)

What we did until now was to run and configure the GreenGrassV2 Core
software so that in can communicate with AWS IoT Core over MQTT using
the Core Device:

![img](./img/image13.png)

::: tip Note
All security details could be found here : [Overview of AWS IoT GreenGrassV2 security](https://docs.aws.amazon.com/greengrass/latest/developerguide/gg-sec.html)
:::

![img](./img/image14.png)

Now devices can connect to the local GreenGrassV2 Core broker over MQTT
using Group CA and device certificate/privateKey and use their
thingName as a clientId of the MQTT connection. To be able to multiplex
all devices messages over a single MQTT connection we will add a virtual
bridge device to the AWS IoT Core and add it to the GreenGrassV2 Group, so
it will be the only GreenGrassV2 Aware Device (GGAD) in the group. After
that we will add proper Subscriptions to allow message exchange between
local GreenGrassV2 and cloud AWS IoT Core broker.

5. Select Devices -\> <Badge vertical="middle" text="Add your first Device"/>

![img](./img/image15.png)

6. On the next page select <Badge vertical="middle" text="Create New Device"/>

![img](./img/image16.png)

7. On next page set the bridge GGAD thing name and type and click <Badge vertical="middle" text="Next"/>

![img](./img/image17.png)

8. On device security page select <Badge vertical="middle" text="Use defaults"/>
![img](./img/image18.png)

9. And on the final page save the device certificate and private key (click on <Badge vertical="middle" text="Download these resources as a tar.gz"/>) and click <Badge vertical="middle" text="Finish"/>

![img](./img/image19.png)

Now the group has one GreenGrassV2 aware device that will act as a bridge device:

![img](./img/image20.png)

::: warning 
After any modification to GreenGrassV2 Group, you need to do a new deploy, otherwise new devices, subscriptions and other stuff are not sent to local GreenGrassV2 software and GreenGrassV2 Discovery RESTful API does not find new added devices.
:::

![img](./img/image21.png)

To test the bridge device use the following command:

    curl --key cb129e54bc.private.key --cert cb129e54bc.cert.pem https://greengrass-ats.iot.eu-central-1.amazonaws.com:8443/greengrass/discover/thing/demoGGG_Bridge

The result should be similar to 
```json
{
  "GGGroups": [
    {
      "GGGroupId": "0267d30c-a639-4a33-94e5-f0aed5a8383f",
	    "Cores": [
	      {
		    "thingArn": "arn:aws:iot:eu-central-1:076081621542:thing/demoGGG_Core",
		    "Connectivity": [
			  {
		      "Id": "AUTOIP_127.0.0.1_0",
			    "HostAddress": "127.0.0.1",
			    "PortNumber": 8883,
			    "Metadata": ""
		    },
			  {
			    "Id": "AUTOIP_172.17.0.2_1",
			    "HostAddress": "172.17.0.2",
			    "PortNumber": 8883,
			    "Metadata": ""
			  }
		  ]
		}
	  ],
	  "CAs": ["-----BEGIN CERTIFICATE-----*****-----END CERTIFICATE-----\n"]
	}
  ]
}
```
### Connecting with Thingpark

#### Bridge topic or device topic ?
Depending of your use case, you need do a choice that impact your architecture. The communication between Thingpark and GreenGrassV2 Core (Local), could be done throught one unique topic (Bridge topic) that collect all uplinks of all Thingpark devices, or you can choose a more traditionnal way by using one topic per devices.

#### Bridge topic architecture (recommanded)
A bridge topic concentrate all uplinks of all devices on a local Lambda function, you can create your own security rules and dispatch on AWS IoT-Core Cloud all messages that you want see. You control the traffic exchanged with the Cloud.
![img](./img/GG_BridgeTopic.png)

Your `uplinkTopicPattern` should be similar to this : `tpx/things/ActilityGreenGrassBridge/uplink`

#### Device topic architecture
Each device has is own topic. You assume that all of your local devices can communicate with your AWS IoT-Core. If you already use AWS IoT-Core, this behavior is more traditionnal, but not recommanded on a GreenGrassV2 architecture, the traffic generated is not really controlled.

![img](./img/GG_DeviceTopic.png)


Your `uplinkTopicPattern` should be similar to this : `tpx/things/{DevEUI}/uplink`

#### Using REST API
The connection can be created throught REST API by using :

* `POST/connections` to create a new Connection instance
* `PUT/connections/{connectionId}` to update a Connection instance
* `DELETE/connections/{connectionId}` to delete a Connection instance
::: tip Note
We follow the REST-full API pattern, when updating configuration properties for a connection resource. Thus, you must also provide the whole configuration again.
:::

Example for creation of a new connection instance :
```json
{
  "connectorId": "actility-aws-iot-greengrass",
  "name": "GreenGrass Core connection",
  "configuration": {
    "region": "eu-central-1",
    "accessKeyId": "I2DGDNWRAKNITFIAR74Q",
    "secretAccessKey": "UKLctg3V/tFORwr9EF8Gxs/ciZlgH5bDNmVwyzlj",
    "awsRootCa": "-----BEGIN CERTIFICATE-----MIIDQTCCAimgAwIBAxxxx-----END CERTIFICATE-----",
    "ggHostName": "127.0.0.1:8883",
    "ggadThingName": "ActilityGreenGrassBridge",
    "ggadCertificateId": "arn:aws:iot:eu-central-1:054281621076:cert/b129xxxx",
    "ggadCertificate": "-----BEGIN CERTIFICATE-----MIIDWTCCAkGgAwIBxxxxxxx-----END CERTIFICATE-----",
    "ggadPrivateKey": "-----BEGIN RSA PRIVATE KEY-----MIIEowxxxxxx-----END RSA PRIVATE KEY-----",
    "deviceType": "ActilityGGADType",
    "uplinkTopicPattern": "tpx/things/ActilityGreenGrassBridge/uplink",
    "downlinkTopicPattern": "tpx/things/ActilityGreenGrassBridge/downlink"
  }
}
```

::: warning WARNING
We recommend doing these steps to generate the inline certificates ggadPrivateKey and ggadCertificate:

**ggadPrivateKey**:

1. Inside your greengrass/certs folder, save the .private.key file on a linux machine
2. Execute the following command:    `cat cb129e54bc.private.key | sed 's/$/\n/' | tr -d '\n'`
3. Copy and paste the value inside the json payload

**ggadCertificate**:

1. Inside your greengrass/certs folder, save the .cert.pem file on a linux machine
2. Execute the following command:    `cat cb129e54bc.cert.pem | tr -d '\n'` 
3. Copy and paste the value inside the json payload
:::

#### Using TPE UI

On ThingPark Enterprise (TPE), you can create your Greengrass connection.
![img](./img/TPE_Connection_1.png)
![img](./img/TPE_Connection_2.png)

#### Creation of subscriptions

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

### End to end testing
Now we can test the uplink path. 
1. Go to Test and subscribe to your topic (tpx/things/ActilityGreenGrassBridge/uplink)

![img](./img/image34.png)

![img](./img/image35.png)

2. Start the Actility AWS Greengrass connection and wait for devices to send uplinks.

![img](./img/image36.png)

The missing devices are automatically created (unless `createDevices` is set explicit to false in connection config) using the specified deviceType inside connection config and having same thingPrincipal as bridge device.

![img](./img/image37.png)

##  Troubleshooting

<a id="troubleshooting"></a>

### MQTT broker endpoints

To be able to connect Mqtt client to hostname:port (eg broker.preview.thingpark.com:9994) you need to add the addess as an MQTT broker endpoint on GGv2Core device using AWS console:

![img](./img/image38.png)

![img](./img/image39.png)


