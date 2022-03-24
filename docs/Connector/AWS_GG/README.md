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

* <a href="#linux-greengrass-core-local-installation" style="color:teal" >GreengrassV2 Core local installation With Automatic Provisioning</a>

* <a href="#linux-greengrass-core-local-installation" style="color:teal" >GreengrassV2 Core local installation With Manual Provisioning</a>

2. <a href="#connecting-with-thingpark" style="color:teal" >Connecting with Thingpark</a>

3. <a href="#end-to-end-testing" style="color:teal" >End to end testing</a>

## GreenGrassV2 Core local installation

Your AWS account needs to have the following IAM permissions to be able to complete the installation of GreengrassV2;

```
    "access-analyzer:Get*",
    "access-analyzer:List*",
    "access-analyzer:ValidatePolicy"
    "iam:UpdateAssumeRolePolicy"
```

### Installation With Automatic Provisioning

1. Provide AWS credentials to the device:

On your device, provide AWS credentials by doing one of the following

**Use long-term credentials from an IAM user:**

Provide the access key ID and secret access key for your IAM user.
Run the following commands to provide the credentials to the AWS IoT Greengrass Core software.

```
    export AWS_ACCESS_KEY_ID=AANELNGPLCYU7EXAMPLE
    export AWS_SECRET_ACCESS_KEY=wJsiuSZdnFPLI/K7GTVNG/bPxDxcHJEXAMPLEKEY
```

**Use temporary security credentials from an IAM role:**

Provide the access key ID, secret access key, and session token from an IAM role that you assume.
Run the following commands to provide the credentials to the AWS IoT Greengrass Core software.

```
    export AWS_ACCESS_KEY_ID=AKMPAONBSDNN7EXAMPLE
    export AWS_SECRET_ACCESS_KEY=wJaleUHnnFPLI/K7MOUIK/AKXVFNGFODNN7EXAMPLE
    export AWS_SESSION_TOKEN=AAoYTBdzPLr1K...o5OxtwEXAMPLE=
```

2. Download the AWS IoT Greengrass Core software

* You can download the latest version of the AWS IoT Greengrass Core software from the following location:

<a href="https://d2s8p88vqu9w66.cloudfront.net/releases/greengrass-nucleus-latest.zip" style="color:teal">https://d2s8p88vqu9w66.cloudfront.net/releases/greengrass-nucleus-latest.zip</a>

* Unzip the AWS IoT Greengrass Core software to a folder on your device. Replace GreengrassInstaller with the folder that you want to use.

```
    unzip greengrass-nucleus-latest.zip -d GreengrassInstaller && rm greengrass-nucleus-latest.zip
```

3. Install the AWS IoT Greengrass Core software

Run the installer with arguments that specify to do the following:

* Create the AWS resources that the core device requires to operate.

* Use the ``ggc_user`` system user and ``ggc_group`` system group to run software components on the core device. The installer creates this default user and group if they don't exist.

* Install the software as a system service that runs on boot, if your device has the systemd init system.

To set up a development device with local development tools, specify the --deploy-dev-tools true argument. The local development tools can take up to a minute to deploy after the installation completes.

4. Run the AWS IoT Greengrass Core installer. Replace argument values in your command as follows.

* **/greengrass/v2:** The path to the root folder to use to install the AWS IoT Greengrass Core software.

* **GreengrassInstaller:** The path to the folder where you unpacked the AWS IoT Greengrass Core software installer.

* **region:** The AWS Region in which to find or create resources.

* **MyGreengrassCore:** The name of the AWS IoT thing for your Greengrass core device. If the thing doesn't exist, the installer creates it. The installer downloads the certificates to authenticate as the AWS IoT thing.

* **MyGreengrassCoreGroup:** The name of AWS IoT thing group for your Greengrass core device. If the thing group doesn't exist, the installer creates it and adds the thing to it. If the thing group exists and has an active deployment, the core device downloads and runs the software that the deployment specifies.

* **GreengrassV2IoTThingPolicy:** The name of the AWS IoT policy that allows the Greengrass core devices to communicate with AWS IoT and AWS IoT Greengrass. If the AWS IoT policy doesn't exist, the installer creates a permissive AWS IoT policy with this name. You can restrict this policy's permissions for you use case.

* **GreengrassV2TokenExchangeRole:** The name of the IAM role that allows the Greengrass core device to get temporary AWS credentials. If the role doesn't exist, the installer creates it and creates and attaches a policy named GreengrassV2TokenExchangeRoleAccess.

* **GreengrassCoreTokenExchangeRoleAlias:** The alias to the IAM role that allows the Greengrass core device to get temporary credentials later. If the role alias doesn't exist, the installer creates it and points it to the IAM role that you specify.

```
  sudo -E java -Droot="/greengrass/v2" -Dlog.store=FILE \
    -jar ./GreengrassInstaller/lib/Greengrass.jar \
    --aws-region region \
    --thing-name MyGreengrassCore \
    --thing-group-name MyGreengrassCoreGroup \
    --thing-policy-name GreengrassV2IoTThingPolicy \
    --tes-role-name GreengrassV2TokenExchangeRole \
    --tes-role-alias-name GreengrassCoreTokenExchangeRoleAlias \
    --component-default-user ggc_user:ggc_group \
    --provision true \
    --setup-system-service true
```

### Installation With Manual Provisioning

1. Create AWS IoT Thing Group

* To start with AWS IoT GreengrassV2 you need first to create a GreengrassV2
  group: go to AWS IoT Core console and select *Manage* -\> *Thing groups* -\> <Badge vertical="middle" text="Create thing group"/>

![img](./img/ggv2_create_thnig_group_1.png)

* Select <Badge vertical="middle" text="Create static thing group"/> and click <Badge vertical="middle" text="Next"/> button

![img](./img/ggv2_create_thnig_group_2.png)

* Enter a group name, such as MyGreengrassCoreGroup and click <Badge vertical="middle" text="Create thing group"/> button

![img](./img/ggv2_create_thnig_group_3.png)

2. Create an AWS IoT thing:

* Go to AWS IoT Core console and select *Manage* -\> *Things* -\> <Badge vertical="middle" text="Create things"/>

![img](./img/ggv2_create_thing_1.png)

* Select <Badge vertical="middle" text="Create single thing"/> and click <Badge vertical="middle" text="Next"/> button

![img](./img/ggv2_create_thing_2.png)

* Enter a thing name, such as MyGreengrassCore and click <Badge vertical="middle" text="Next"/> button

![img](./img/ggv2_create_thing_3.png)

* Select <Badge vertical="middle" text="Auto-generate new certificate"/> and click <Badge vertical="middle" text="Next"/> button

![img](./img/ggv2_create_thing_4.png)

* On the next screen (Attach policies to certificate), click the <Badge vertical="middle" text="Create policy"/> button

![img](./img/ggv2_create_thing_5.png)

* On the next screen (Create a policy), Give a name to your policy, such as **GreengrassV2IoTThingPolicy**. Also, switch to the advanced mode
bu clicking on the <Badge vertical="middle" text="Advanced mode"/> link. This will allow you to enter the policy as a json document.
Copy/Paste the following text to the the black text-edit canvas for policy content and click the <Badge vertical="middle" text="Create"/> button.

```json
{
  "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
          "Action": [
            "iot:Publish",
            "iot:Subscribe",
            "iot:Receive",
            "iot:Connect",
            "greengrass:*"
          ],
          "Resource": [
            "*"
          ]
      }
  ]
}
```

![img](./img/ggv2_create_thing_6.png)

* When you return to Attach policies to certificate screen, select the policy you have just created in the previous step (click the refresh button
  if you cannot see it), and click the <Badge vertical="middle" text="Create thing button"/>

![img](./img/ggv2_create_thing_7.png)

* The thing will creation will complete and you will be presented with the device certificate, the device key files and AWS Root CA Certificates.
  Download all of them (device certificate, device public and private keys and Root CA certificates) to a folder called **~/greengrass-v2-certs**
  on your local computer.

![img](./img/ggv2_create_thing_8.png)

3. Add AWS IoT Thing to the Thing group

* Go to AWS IoT Core console and select *Manage* -\> *Things* -\> and select the MyGreengrassCore thing that you have recently created.

![img](./img/ggv2_add_thing_to_group_1.png)

* Select the Thing groups tab and click the <Badge vertical="middle" text="Add to group"/> button.

![img](./img/ggv2_add_thing_to_group_2.png)

* Select the Thing group named MyGreengrassCoreGroup that you had created in step 1 and click the <Badge vertical="middle" text="Add"/> button.

![img](./img/ggv2_add_thing_to_group_3.png)

The device is now added to the Thing group.

4. Retrieve AWS IoT endpoints

* Get the AWS IoT data endpoint for your AWS account and save them to use later. For AWS IoT endpoints, go to *AWS IoT* -\> *Settings* -\> *Device data endpoint*

![img](./img/retrieve_iot_data_endpoint.png)

* Get the AWS IoT credentials endpoint for your AWS account.

```
    aws iot describe-endpoint --endpoint-type iot:CredentialProvider
```

  The response looks similar to the following example, if the request succeeds.

```json
  {
    "endpointAddress": "a1k4o270sj58h.credentials.iot.eu-central-1.amazonaws.com"
  }
```

5. Create a token exchange role

* For creating a token exchange role, go to *IAM* -\> *Roles* \-> <Badge vertical="middle" text="Create role"/>

![img](./img/iam_create_roles_menu.png)

* Select IoT from the list of AWS services and click <Badge vertical="middle" text="Next:Permissions"/>

![img](./img/select_iot_role.png)

* For Permissions, don’t select any. Just click <Badge vertical="middle" text="Next:Tags"/>

![img](./img/create_role_select_permission_policies.png)

* For Tags, just leave empty and click <Badge vertical="middle" text="Next:Review"/>

![img](./img/create_role_add_tags.png)

* Fill in the role name, such as *GreengrassV2TokenExchangeRole* and click <Badge vertical="middle" text="Create Role"/>

![img](./img/create_token_exchange_role.png)

* Next, find the role just created in the side-pane by pasting the name in the search bar and select the role by clicking on its name.

![img](./img/add_policy_to_role_select_role.png)

* Then click the **Add inline policy** link on the role summary page.

![img](./img/attach_policy_to_role_select_add_policy.png)

* On the next Create Policy screen, select the JSON tab and copy/paste the following JSON to the editor. Then click <Badge vertical="middle" text="Review Policy"/> button.

```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "iot:DescribeCertificate",
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
            "logs:DescribeLogStreams",
            "s3:GetBucketLocation"
          ],
          "Resource": "**"
        }
      ]
    }
```

![img](./img/attach_policy_to_role_create_policy.png)

* Next, name the policy, such as *GreengrassV2TokenExchangeRoleAccess* and click the <Badge vertical="middle" text="Create Policy"/> button.

![img](./img/attach_policy_to_role_review_policy.png)

* When you click Create Policy, it returns you to the token exchange role edit page, click the trust relationship tab, then click
<Badge vertical="middle" text="Edit trust relationship"/>.

![img](./img/add_trust_to_role_select_edit.png)

* On the next screen, copy the following JSON policy document and paste it into the editor. Click the <Badge vertical="middle" text="Update Trust Policy"/> button

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "credentials.iot.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

![img](./img/update_trust_policy.png)

* Next, go to the AWS IoT Core console again and select *Secure* -\> *Role Aliases* -\> <Badge vertical="middle" text="Create"/>

![img](./img/ggv2_select_create_role_alias.png)

* Enter the role alias name, such as *GreengrassCoreTokenExchangeRoleAlias*, select the previously created *GreengrassV2TokenExchangeRole*
  from the list of existing roles by clicking the *Select* link and then click the <Badge vertical="middle" text="Create role alias"/> button.

![img](./img/ggv2_create_role_alias.png)

The role alias is now created. Next, we need to retrieve the ARN for this role alias.

* Retrieve the created role alias ARN by running the following aws cli command

```
    aws iot describe-role-alias --role-alias GreengrassCoreTokenExchangeRoleAlias
```

The response should be similar to the following;

```json
    {
        "roleAliasDescription": {
            "roleAlias": "GreengrassCoreTokenExchangeRoleAlias",
            "roleAliasArn": "arn:aws:iot:eu-central-1:001217820901:rolealias/GreengrassCoreTokenExchangeRoleAlias",
            "roleArn": "arn:aws:iam::006109802163:role/GreengrassV2TokenExchangeRole",
            "owner": "006109802163",
            "credentialDurationSeconds": 3600,
            "creationDate": 1635760633.693,
            "lastModifiedDate": 1635760633.693
        }
    }
```

* Next, create a role alias policy be selecting *Secure* -\> *Policies* -\> <Badge vertical="middle" text="Create"/> from the AWS Iot Core menu

![img](./img/ggv2_select_create_iot_policy.png)

* On the Create Policy screen, name to the policy as **GreengrassCoreTokenExchangeRoleAliasPolicy**, Click the **Advanced Mode** to switch to the
advanced policy mode creation, copy/paste the following JSON to the editor. Replace the Resource field value in the document with the roleAliasArn
field listed in the previous step's aws iot describe-role-alias response and click the <Badge vertical="middle" text="Create"/> button.

```json
  {
        "Version":"2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": "iot:AssumeRoleWithCertificate",
            "Resource": "arn:aws:iot:eu-central-1:003214702401:rolealias/GreengrassCoreTokenExchangeRoleAlias"
          }
        ]
  }
```

![img](./img/ggv2_create_role_alias_policy.png)

* Now, go to *Manage* -\> *Things* and select the *MyGreengrassCore* thing that you had created previously from the AWS IoT Core menu.

![img](./img/attach_policy_to_thing_certificate_select_thing.png)

* Then click the *Certificates* tab and select the listed certificate of the thing from the list of certificates.

![img](./img/attach_policy_to_thing_certificate_select_certificate.png)

* Then click on the *Actions* and select *Attach policy* from the drop down options

![img](./img/attach_policy_to_thing_certificate_select_attach_policy.png)

* Select the *GreengrassCoreTokenExchangeRoleAliasPolicy* that we had created on the previous step and click the <Badge vertical="middle" text="Attach"/> button.

![img](./img/attach_policy_to_thing_certificate.png)

6. Setup Your Computer For Installation

* Create the Greengrass root folder on your local computer. You'll later install the AWS IoT Greengrass Core software to this folder.

```
  sudo mkdir -p /greengrass/v2
```

* Set the permissions of the parent of the Greengrass root folder.

```
  sudo chmod 755 /greengrass
```

* Copy the AWS IoT thing certificates to the Greengrass root folder.

```
  sudo cp -R ~/greengrass-v2-certs/* /greengrass/v2
```

* Install the Java runtime, which AWS IoT Greengrass Core software requires to run. For Debian-based or Ubuntu-based distributions:

```
  sudo apt install default-jdk
```

For Red Hat-based distributions:

```
  sudo yum install java-11-openjdk-devel
```

* (Optional) Create the default system user and group that runs components on your device. You can also choose to let the AWS IoT Greengrass Core software installer create this user and group during installation with the ``--component-default-user`` installer argument.

```
  sudo adduser --system ggc_user
  sudo addgroup --system ggc_group
```

* Verify that the user that runs the AWS IoT Greengrass Core software (typically root), has permission to run sudo with any user and any group.
  Open the ``/etc/sudoers`` file and verify that the permission for the user looks like the following example.

```
  root    ALL=(ALL:ALL) ALL
```

7. Download the AWS IoT Greengrass Core software

* You can download the latest version of the AWS IoT Greengrass Core software from the following location: <a href="https://d2s8p88vqu9w66.cloudfront.net/releases/greengrass-nucleus-latest.zip" style="color:teal">https://d2s8p88vqu9w66.cloudfront.net/releases/greengrass-nucleus-latest.zip</a>

* Unzip the AWS IoT Greengrass Core software to a folder on your device. Replace GreengrassInstaller with the folder that you want to use.

```
  unzip greengrass-nucleus-latest.zip -d GreengrassInstaller && rm greengrass-nucleus-latest.zip
```

8. Install the AWS IoT Greengrass Core software

* Use a text editor to create a configuration file named *config.yaml* to provide to the installer.
  For example, on a Linux-based system, you can run the following command to use GNU nano to create the file.

```
  nano GreengrassInstaller/config.yaml
```

* Copy the following YAML content into the file. This partial configuration file specifies system parameters and Greengrass nucleus parameters.

```yaml
  system:
    certificateFilePath: "/greengrass/v2/6rtg6edae91ac1c14dbe5e5b1ada23cokl734ec3da238907f015ff8d0fda011p-certificate.pem.crt"
    privateKeyPath: "/greengrass/v2/6add6edae91ac1c12pdfe5e5b1aio89cadb734ec3da2175376f015fp8l0fda011f-private.pem.key"
    rootCaPath: "/greengrass/v2/AmazonRootCA1.pem"
    rootpath: "/greengrass/v2"
    thingName: "MyGreengrassCore"
  services:
    aws.greengrass.Nucleus:
      componentType: "NUCLEUS"
      version: "2.5.0"
      configuration:
        awsRegion: "eu-central-1"
        iotRoleAlias: "GreengrassCoreTokenExchangeRoleAlias"
        iotDataEndpoint: "a2e8i142dk314s-ats.iot.eu-central-1.amazonaws.com"
        iotCredEndpoint: "prc2sujeydg5o.credentials.iot.eu-central-1.amazonaws.com"
```

* Run the installer, and specify --init-config to provide the configuration file.

```
  sudo -E java -Droot="/greengrass/v2" -Dlog.store=FILE \
    -jar ./GreengrassInstaller/lib/Greengrass.jar \
    --init-config ./GreengrassInstaller/config.yaml \
    --component-default-user ggc_user:ggc_group \
    --setup-system-service true
```

The installer should run and finish with the following message

```
  Successfully set up Nucleus as a system service
```

## Connecting with Thingpark

### Bridge topic or device topic ?

Depending of your use case, you need do a choice that impact your architecture. The communication between Thingpark and GreengrassV2 Core (Local), could be done through one unique topic (Bridge topic) that collect all uplinks of all Thingpark devices, or you can choose a more traditional way by using one topic per devices.

### Bridge topic architecture (recommended)

A bridge topic concentrate all uplinks of all devices on a local Lambda function, you can create your own security rules and dispatch on AWS IoT-Core Cloud all messages that you want see. You control the traffic exchanged with the Cloud.
![img](./img/GG_BridgeTopic.png)

Your `uplinkTopicPattern` should be similar to this : `tpx/things/ActilityGreengrassBridge/uplink`

### Device topic architecture

Each device has is own topic. You assume that all of your local devices can communicate with your AWS IoT-Core. If you already use AWS IoT-Core, this behavior is more traditional, but not recommended on a GreengrassV2 architecture, the traffic generated is not really controlled.

![img](./img/GG_DeviceTopic.png)

Your `uplinkTopicPattern` should be similar to this : `tpx/things/{DevEUI}/uplink`

### Using REST API

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
    "accessKeyId": "I2DGDQPEUJNDTGFAR98Q",
    "secretAccessKey": "UKLctg3V/rFORwr9EF8Gxs/ciZlbI5bDNmPoellj",
    "awsRootCa": "-----BEGIN CERTIFICATE-----MIIDQTCAAimgAwIBGxxxx-----END CERTIFICATE-----",
    "ggHostName": "127.0.0.1:8883",
    "ggadThingName": "ActilityGreenGrassBridge",
    "ggadCertificateId": "arn:aws:iot:eu-central-1:054762841076:cert/b129xxxx",
    "ggadCertificate": "-----BEGIN CERTIFICATE-----MIIDWTCQAkGsAwIB-----END CERTIFICATE-----",
    "ggadPrivateKey": "-----BEGIN RSA PRIVATE KEY-----MIIEsr-----END RSA PRIVATE KEY-----",
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
2. Execute the following command:    `cat cb908e54bc.private.key | sed 's/$/\n/' | tr -d '\n'`
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

1. Go to Test and subscribe to your topic (tpx/things/ActilityGreenGrassBridge/uplink)

![img](./img/image34.png)

![img](./img/image35.png)

2. Start the Actility AWS Greengrass connection and wait for devices to send uplinks.

![img](./img/image36.png)

The missing devices are automatically created (unless `createDevices` is set explicit to false in connection config) using the specified deviceType inside connection config and having same thingPrincipal as bridge device.

![img](./img/image37.png)
