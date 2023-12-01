---
sidebarDepth: 4
---

# CREATING AN AWS CONNECTION

## Collecting Expected Information

**Parameters required**

| Field | Description |
| ------ | ----------- |
| ```Application Name``` | Name of the application that you want to register (Editable). |
| ```Downlink Port``` | If downlink is supported and enabled, indicate which LoRaWAN® port should be used to send the downlinks to the associated devices. As only one type of Amazon AWS platform can be created, you should set a homogeneous set of devices in the Amazon AWS IoT account.|
| ```AWS Region``` | <ul><li>Region that is hosting the AWS Application for example us-west-2.</li></ul><ul><li> In your AWS IoT account, if your endpoint is: “accountPrefix.io.exampleregion.amazonaws.com”, then your AWS region is “exampleregion”.</li></ul> |
| ```Access Key Id``` | The ID of the access key generated on your AWS IoT account, and necessary to access it.|
| ```Secret Access Key``` | A secret access key generated on your AWS IoT account, and necessary to access it. |
| ```Protocol``` | <ul><li>Protocol to be used for the connection with your AWS IoT account, possible values are ‘SSL’ (MQTT with SSL certificates) or ‘WSS’ (MQTT over secure Web Sockets). When ‘SSL’ protocol is used, the ID of the certificate registered in your AWS IoT account is displayed in parentheses. Only applies to the Application Information dashboard where the "Protocol and Authentication" field is a summary of selected protocol and authentication method.</li></ul><ul><li>Possible values are WSS and SSL.</li></ul>**Note** In the AWS creation form, the protocol to be used is labelled “Protocol” whereas it is labelled “Protocol and Authentication in the Application Information dashboard.|
| ```Certificate Id``` | <ul><li>Id of the certificate registered in your AWS IoT account.</li></ul><ul><li>This parameter does not apply to the WSS protocol.</li></ul> |
| ```Certificate``` | <ul><li>The certificate file registered in your AWS IoT account.</li></ul><ul><li>This parameter does not apply to the WSS protocol.</li></ul>|
| ```Private Key``` | <ul><li>The private key file registered in your AWS IoT account.</li></ul><ul><li>This parameter does not apply to the WSS protocol.</li></ul>|
| ```Device Type``` | AWS IoT device type to be associated with the devices processed by the application for example waterSensorType. Only one device type is supported.|
| ```Account Prefix``` | <ul><li>Account prefix of the AWS IoT account in format alpha numeric.</li></ul><ul><li>To obtain an AWS server URL you will need the account prefix and the region attributes &lt;accountPrefix&gt;.iot.&lt;region&gt;.amazonaws.com</li></ul><ul><li>In our example: <ul><li>"accountPrefix": "a2shubp7zpiozr"</li><li>"region": "us-west-2". The URL will be a2shubp7zpiozr.iot.us-west-2.amazonaws.com</li></ul></li></ul>|

### Account Prefix and Region

After you have created your AWS IoT account, you need to retrieve the parameter values that will be required to configure the AWS connector.

1. Type :

[https://eu-central-1.console.aws.amazon.com/iot/home?region=eu-central-1#/dashboard ](https://eu-central-1.console.aws.amazon.com/iot/home?region=eu-central-1#/dashboard) to open AWS IoT.

* This looks like this:

![img](images/AwsIotInterface.png)

2. Click ***Settings***.

* This opens the page showing the Custom endpoint information. It looks like this:

![img](images/AwsIotSettings.png)

3.

::: tip Note
The ***Endpoint*** string has the following format ```accountPrefix.iot.region.amazonaws.com```. If the accountPrefix does not end in ``‘-ats’``, follow the instructions for setting up your [Amazon Trust Services (ATS) endpoint to avoid connection issues due to deprecated trust CAs.](https://aws.amazon.com/fr/blogs/iot/aws-iot-core-ats-endpoints/)
**TPE-OCP only**: Please configure your firewall to authorize the outgoing traffic on ports ***443***,***8443***,***8883*** towards:
- *accountPrefix*.iot.*region*.amazonaws.com
- iot.*region*.amazonaws.com
:::

4.	Copy the **accountPrefix** and **region** connector parameters (respectively 'd4g5d321sd465d-ats' and 'eu-central-1' in the following example).

### Device Type

1. Go back to the ***Manage*** section and click ***Types*** to access the list of Device types.

![img](images/AwsManageType.png)

* The page that opens displays all existing types of Devices.

2.	Click ***Create***.

![img](images/AwsCreateType.png)

3.	Fill in the form by entering the name of the new thing type such as below and click on **Create thing type**.

![img](images/AwsFormFilled.png)

* The Device type is created and appears in the Types’ page.

### Access Key Id and Secret Access Key

An Access key id and a Secret Access Key are required for the Device registration.
To retrieve this information you must create a user.

1.	Click ***Services*** in the ***Banner***.

2.	Click the (Identity and Access Management)***IAM*** link as shown in the following capture.

![img](images/AwsServicesIam.png)

3.	In the dashboard page that opens, click Users. This looks like this:

![img](images/dashboardUser.png)

4.	Click ***Add user***.

5.	In the Add user’s page that opens type a Username and select the Programmatic access as shown in the following capture:

![img](images/programmaticAcces.png)

6.	Click ***Next Permissions***.

7.	In the Set Permissions’ page that opens click ***Attach existing policies directly*** as shown in the following capture:

![img](images/setPermissions.png)

8.	Click ***Create policy***.

9.	In the Create Policy’s page that opens select the policies that you are interested in either by using the Visual Editor or the JSON editor as shown in the following capture.

::: tip Note
In this release the minimum rights that are granted to the policies are the following actions:

* iot:ListThings
* iot:CreateThing
* iot:AttachThingPrincipal
  :::

<html>
  <ul>
    <ol type="a">
      <li>Creating the new policy using the Visual Editor is shown in the following capture.</li>
    </ol>
  </ul>
</html>

![img](images/createPolice.png)

<html>
  <ul>
    <ol start="2" type="a">
      <li>Creating the new policy using JSON format:Copy the JSON body and paste it in the JSON Editor.</li>
    </ol>
  </ul>
</html>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "iot:ListThings",
                "iot:CreateThing",
                "iot:DescribeThing",
                "iot:AttachThingPrincipal",
                "iot:Connect",
                "iot:Subscribe",
                "iot:Receive",
                "iot:Publish"
            ],
            "Resource": "*"
        }
    ]
}
```

This looks like this in the Editor:

![img](images/theeditor.png)

10.	Click ***Review policy***.

11.	In the Review page that opens click ***Create Policy***.

![img](images/reviewpage.png)

12.	Close the ***Policy*** tab.

13.	On the Add user page, click ***Refresh***.

14.	Select the policy that you created and click ***Next Tag*** as shown in the following capture:

![img](images/nextTag.png)

15.	Leave the Tags’ pages as is and further click ***Next:Review*** until the ***Create User*** page displays as shown in the following capture.

![img](images/leaveTheTags.png)

16.	Click ***Create User***.

* A screen informing that you created the user displays.

In this screen, copy the Access key ID and the Secret access key or download those via the csv file as shown:

![img](images/copyTheAcces.png)

17.	Click **Close**.

### Certificate and Policy

A certificate is required for the registration of the TLS connection protocol (MQTT over TLS v1.2 connection) and the Device.

1. Go to the dashboard and open the Certificates’ page.

![img](images/certificates.png)

2. Click **Create**.

3. In the Create a Certificate’s page, choose **Auto-generate new certificate (recommended)** and **Active**.

![img](images/createCertificate.png)

4.	Click **Create**.

5.	Once the certificate is created, you will be able to download the certificate file and the associated private key.

![img](images/downloadCertificate.png)

6.	Click **Continue**.

* A notification appears to confirm that the certificate is created.

![img](images/certificateActivated.png)

7. By clicking on your certificate you just created, you'll be able to get the **Certificate ARN** required to accomplish a connection

![img](images/certificateARN.png)

8. Now, go to **Policies** section, and click on **Create policy**.

![img](images/createPolicy.png)

9. Give it a name, Copy this JSON body, and paste it in **Policy statements**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "iot:Publish",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iot:Subscribe",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iot:Connect",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "iot:Receive",
      "Resource": "*"
    }
  ]
}
```
![img](images/policyStatements.png)

10. Click **Create**.

* A noticication appears to confirm that the policy is created.

11. Return to your certificate details page and click **Attach policy**.

![img](images/attachPolicy.png)

12. Select your policy and click **Attach Policy**.

![img](images/attachPolicyToCert.png)

13. Your policy is now attached to your certificate. A notification appears to confirm it.

![img](images/policyAttachConfirmation.png)

## Creating a Connection With API

MQTT over TLS v1.2 connection is the transport protocol recommended by Amazon and its use is mandatory in ThingPark X IoT Flow to connect to AWS cloud platform.
You need to create an instance of AWS connection first, before you can use it is an IoT Flow instance.

The creation of a connection establishes a bidirectional messaging transport link between ThingPark X IoT Flow and the cloud provider. Events and commands from multiple Devices will be multiplexed over this messaging transport link.

To do this, you need to use the **Connections** group resource:

*	`POST/connections` to create a new Connection instance
*	`PUT/connections` to update a Connection instance
*	`DELETE/connections` to delete a Connection instance

::: tip Note
We follow the REST-full API pattern, when updating configuration properties for a connection resource. Thus, you must also provide the whole configuration again.
:::

Example for the creation of a new connection instance :

```json
POST /connections
 
{
"connectorId": "actility-aws-iot",
"name": "Actility AWS Connection",
  "configuration": {
    "description": "AWS Europe Datacenter",
    "uplinkTopicPattern": "tpx/things/{DevEUI}/uplink",
    "downlinkTopicPattern": "tpx/things/{DevEUI}/downlink",
    "deviceType": "actilitytestsensor",
    "region": "eu-central-1",
    "accountPrefix": "a2plmnutiyt-ats",
    "secretAccessKey": "lymHcNdzkkolnhZHnV5Q5YN/GTMFNiARtAj/7dz6758",
    "accessKeyId": "AKIFAQFMTO34B3XZGHYA",
    "certificateId": "arn:aws:iot:eu-central-1:101510985872:cert/8be79f58542e4f2345t45fjuk08424657ee3azd4554fa974",
    "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
    "privateKey": "-----BEGIN RSA PRIVATE KEY-----...-----END RSA PRIVATE KEY-----"
  }
}
```

The following table lists the properties applicable to a connection instance.
| Property | Configuration value |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-aws-iot for AWS IoT cloud platform. |
| ```configuration/uplinkTopicPattern``` | Defines a pattern of MQTT topic for Uplink messages.  <div class="custom-block tip">**Note** Ensure to be compliant with AWS topic semantics, e.g.: <ul><li>`tpx/things/{DevEUI}/uplink`</li></ul></div> For more information on available dynamic keywords, see the chapter about Keywords and patterns in the [AWS documentation](https://docs.aws.amazon.com/iot/latest/developerguide/topics.html). |
| ```configuration/downlinkTopicPattern``` | Defines a pattern of topic for the Downlink.<ul><li>Ensure your pattern matches the AWS pattern</li></ul>e.g. `tpx/things/{DevEUI}/uplink` is matches AWS expression tpx/things/+/uplink |
| ```configuration/deviceType``` | AWS IoT Device type to be associated with the Devices processed by the connector. |
| ```configuration/region``` | Region of the AWS IoT datacenter: <ul><li>eu-central-1 : EU(Frankfurt)</li><li>us-east-1 : US East (N. Virginia)</li><li>cn-north-1 : China (Beijing)</li></ul> For more information see the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html) |
| ```configuration/accountPrefix``` | Account prefix of the AWS IoT account. |
| ```configuration/secretAccessKey``` | Secret access key for accessing the AWS IoT account, required for registering Devices. |
| ```configuration/accessKeyId``` | Id of the access key for accessing the AWS IoT account, required for registering Devices. |
| ```configuration/accessKeyId``` | Id of the certificate registered in the AWS IoT account, required for registering Devices. |
| ```configuration/certificate``` | Contents of the certificate file registered in the AWS IoT account, required for building the MQTT over TLS v1.2 connection. |
| ```configuration/privateKey``` | Contents of the private key file registered in the AWS IoT account, required for building the MQTT over TLS v1.2 connection. |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection From UI

Prior to connecting a Cloud application to a ThingPark Enterprise platform you need to be aware of the application provisioning constraints.&nbsp;To learn more, click [this topic](https://docs.thingpark.com/thingpark-enterprise/Content/TPE_UG/Application%20provisioning%20constraints.htm).

You must have an active Amazon AWS IoT account prior to connecting to an Amazon AWS IoT Application. ThingPark does not create any AWS application instances.

You also need to know the parameters that are required to perform this task. To learn more, check Parameters required for connecting to an Amazon AWS IoT platform below in this topic.

You can connect this type of application using the SSL or the WSS protocol depending on the security level that you want to put in place.

This procedure describes how you can connect an Amazon AWS application using the SSL protocol. The difference between both protocols resides in the fact that there is neither a certificate, nor a private key that are required for creating a connection via WSS.

1. Click **Connections** -> **Create** -> **ThingPark X IoT Flow**.

![img](images/ui/create.png)

Then, a new page will open. Select the connection type : **AWS IoT Core**.

![img](images/ui/select.png)

::: tip Note
The application creation form is the same for a JSON enriched document as for a JSON legacy document.
:::

2. Fill in the form as in the example below.

![img](images/ui/creating_aws_app_filled.png)

::: tip Note
Parameters marked with * are mandatory.
:::

3. Click **Save**.

* A notification appears on the upper right side of your screen to confirm that the application has been created.

4. Click View the Application to view the application details.

* You are redirected to the Application Information pane.

### Changing the Protocol of the Amazon AWS Connection after Creation

You can change the protocol after the creation of the Amazon AWS application.

If you change the protocol from SSL to WSS, the Certificate ID, Certificate and Private Key fields are hidden, but their current values are kept and still provided in dataflow properties. The values are automatically recovered if the protocol is updated to "SSL", and the Certificate ID, Certificate and Private Key fields are displayed again.

If you change the protocol from WSS to SSL, the Certificate ID, Certificate and Private Key fields are displayed.

To do this, proceed as follows:

1. Select the AWS application for which you want to change the protocol.

2. In the application information dashboard, go to the Protocol and Authentication parameter.

3. Click Edit.

* The Protocol and Authentication window displays.

![img](images/ui/protocol_auth_1.png)

4. In the drop-down box in Protocol, change from WSS to SSL.

5. For each parameter enter a value. This look like this:

![img](images/ui/protocol_auth_2.png)

6. Click **Save**.

## Limitations

**Protocol** : MQTT over TLS v1.2 connection is the recommended protocol by Amazon and is mandatory for use with ThingPark X IoT Flow.

**Uplink :**

* The Uplink rate is limited to 1000 msg/s max (connection pool can have max 10 mqtt clients).

*  Uplinks are sent using QoS 0.

**Downlink :**
   The Downlink rate limited to 100 msg/s.

**Device :**

* Device shadows are not supported in the current ThingPark X IoT Flow release.
* The number of Devices that you can use is unlimited.

| Limitation   |      Description      |
|----------|-------------|
| Protocol | MQTT over TLS v1.2 connection is the recommended protocol by Amazon and is mandatory for use with ThingPark X IoT Flow.|
| Uplink |  <ul><li>The Uplink rate is limited to 1000 msg/s max (connection pool can have max 10 mqtt clients).</li></ul> <ul><li>Uplinks are sent using QoS 0.</li></ul>   |
| Downlink | The Downlink rate limited to 100 msg/s. |
| Device | <ul><li>Device shadows are not supported in the current ThingPark X IoT Flow release.</li></ul><ul><li>The number of Devices that you can use is unlimited.</li></ul>  |

**For more information, see the following links:**

1. [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html#limits_iot)
   Messages are not stored in the AWS cloud. If the connection has not been established during a short time, all downlink messages cannot flow to ThingPark, they are lost. This message is displayed: “The message broker maintains a list of all client sessions and the subscriptions for each session. When a message is published on a topic, the broker checks for sessions with subscriptions that map to the topic. The broker then forwards the publish message to all sessions that have a currently connected client.”

2. [Device communication protocols](https://docs.aws.amazon.com/iot/latest/developerguide/iot-message-broker.html)  
   This means that disconnected clients will not receive any uplinks/downlinks that were sent during the time they were offline.&nbsp;  
   [Things could change in the future AWS SDK for Java](https://docs.aws.amazon.com/iot/latest/developerguide/mqtt-persistent-sessions.html)

## Displaying information to know if it worked

1.	Go to your AWS account, open the Test menu.

![img](images/AwsTest.png)

2.	Check if you are connected to the right endpoint (On the right of the window).

3.	Subscribe to a topic, for example: ``tpx/things/65EF801200000345/uplink``

![img](images/subscribeTopic.png)

You should see something like that:

![img](images/dispayinginformation.png)

All received messages are displayed on the same window.

![img](images/samewindow.png)

## Troubleshooting

<a id="troubleshooting"></a>

As for now, there are no detected bugs.
