---
sidebarDepth: 4
---

# CREATING A YANDEX CONNECTION

## Configuring your YANDEX account

::: tip Note
If you don't have the Yandex.Cloud command line interface yet, [install and initialize it](https://cloud.yandex.com/en/docs/cli/quickstart#install).
:::

1. Open the command line (CMD) and type the command <code>yc init</code>. You should see a similar result:

```
    yc init
    Welcome! This command will take you through the configuration process.
    Please go to https://oauth.yandex.ru/authorize?response_type=token&client_id=1a0967aa636643d9b2ef855fa7bec2fb in order to obtain OAuth token.
```

2. Go to the link and connect to your account in order to get the OAuth token needed for the next step.

![login](images/ui/login.png)

* You will be redirected to a page that will show the token.

![login](images/ui/oauth.png)

3. After entering the OAuth token, you will need to choose a folder.

```
 You have one cloud available: 'cloud-sdeschaepmeester' (id = b1guj45qubqp266nra43). It is going to be used by default.
 Please choose folder to use:
  [1] default (id = b1go9m152l1drhp8khe6)
  [2] Create a new folder
 Please enter your numeric choice: 1
```

4. Finally, you will need to choose a compute zone like below.

```
   Your current folder has been set to 'default' (id = b1go9m152l1drhp8khe6).
   Do you want to configure a default Compute zone? [Y/n] Y
   Which zone do you want to use as a profile default?
   [1] ru-central1-a
   [2] ru-central1-b
   [3] ru-central1-c
   [4] Don't set default zone
   Please enter your numeric choice: 1
   Your profile default Compute zone has been set to 'ru-central1-a'.
```

## Creating a Connection With API

The creation of a connection establishes a bidirectional messaging transport link between ThingPark X IoT Flow and the cloud provider. Events and commands from multiple Devices will be multiplexed over this messaging transport link.

To do this, you need to use the **Connections** group resource:

* `POST/connections` to create a new Connection instance
* `PUT/connections` to update a Connection instance
* `DELETE/connections` to delete a Connection instance

::: tip Note
We follow the REST-full API pattern, when updating configuration properties for a connection resource. Thus, you must also provide the whole configuration again.
:::

Example for creation of a new connection instance :

```json
POST /connections
{
  "connectorId": "actility-yandex-iot",
  "name": "Test Yandex Connection",
  "configuration": {
    "serviceAccountId": "ajeolm791v8k2qje7tht",
    "authorizedKeyId": "auve9n3a5peq39kcuhtg",
    "authorizedPrivateKey": "-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----",
    "folderId": "b1f7re11con4ut4g3s6v"
  }
}
```

The following table lists the properties applicable to a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-yandex-iot for YANDEX platform. |
| ```serviceAccountId``` | Service account ID that allows the management of registry and devices |
| ```authorizedKeyId``` | Defines the ID of the key for the service account. |
| ```authorizedPrivateKey``` | Defines the private key of the authorization.  |
| ```folderId``` | The Folder ID that you want to use. |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [**common parameters section**](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection From UI

You must have an active YANDEX account prior to creating a YANDEX connection in ThingPark.

[Register a new account](https://passport.yandex.com/registration) if you don't have one already.

You also need to know the parameters that are required to perform this task. To learn more, check [Parameters required for connecting to a YANDEX platform](#YANDEXparameters) below in this topic.

1. Click Connections -> Create -> ThingPark X IoT Flow.

![select-application](images/ui/create_connection.png)

Then, a new page will open. Select the connection type : YANDEX.

![select-application](images/ui/create_yandex.png)

2. Fill in the form as in the example below and click on **Create**.

![form_filled](images/ui/form_filled.png)

::: tip Note
Parameters marked with * are mandatory.
:::

* A notification appears on the upper right side of your screen to confirm that the application has been created.

![notification_created](images/ui/notification_created.png)


4. After creating the application, you will be redirected to the application details.


![application_details](images/ui/application_details.png)

**Creating a new registry**

Follow these steps in order to add a new registry.

1. In the [management console](https://console.cloud.yandex.com/), select the folder where you want to add a new registry.

![select_folder](images/ui/select_folder.png)

2. Click on **Yandex IoT Core** in the left menu.

![yandex_iot_core](images/ui/yandex_iot_core.png)

3. Click on **Create registry**.

![create_registry](images/ui/create_registry.png)

4. Fill in the form like the example below.

![create_registry](images/ui/form_create_registry.png)

5. Click on **Create**.

**Adding devices to the registry**

Follow these steps in order to add a new device to your registry.

1. In the [management console](https://console.cloud.yandex.com/), select the folder where you want to add a new device.

![select_folder](images/ui/select_folder.png)

2. Click on **Yandex IoT Core** in the left menu.

![yandex_iot_core](images/ui/yandex_iot_core.png)

3. Select the registry.

4. In the left part of the window, select **Devices**.

5. Click on **Add device**.

6. Enter the name and the password of the new device.

7. Click on **Create**.

**Changing the Settings after Creation**

You can change the settings parameters of the YANDEX application.

To do this, proceed as follows:

1. Select the Yandex application for which you want to change one or several parameters.

2. In the application information dashboard, click on the **Edit** button corresponding to the parameter you want to change.

![edit_button](images/ui/edit_button.png)

3. Enter the new value, and click on the **Confirm** icon.

![confirmation_button](images/ui/confirmation_button.png)

* The Confirmation window displays,

![proceed_update](images/ui/proceed_update.png)

* A notification will inform you that the parameter is updated.

![notification_update](images/ui/notification_update.png)

<a id="YANDEXparameters">**Parameters required for connecting to a YANDEX platform**</a>

The parameters are the following:

| UI Field | Description |
| ------ | ----------- |
| **Application Name*** | Name of the application that you want to register (Editable). |
| **Folder ID*** | The Folder ID that you want to use (Editable). |
| **Service Account ID*** | Service account ID that allows the management of registry and devices (Editable). |
| **Authorized Key ID*** | Defines the ID of the key for the service account (Editable). |
| **Authorized Private Key*** | Defines the private key of the authorization (Editable). |
| **Registry ID** | An existing registry could be used. If empty, a new registry named "Actility_ThingPark" will be created (Editable). |
| **Description** | Description of the application that you want to register (Editable). |

## Collecting Expected Information

### Service Account ID

After you have created your YANDEX account, you need to retrieve the parameter values that will be required to configure the YANDEX connector.

1. Go to the [Yandex Cloud service](https://console.cloud.yandex.ru/)

2. Click on the **Management Console** tab and select the **Overview** tab. 

![management_console](images/management_console.png)

3. You can then retrieve the **service account ID** parameter.

![management_console](images/service_account_id.png)

### Authorized Key ID and Authorized Private Key

1. Go to the [Yandex Cloud service](https://console.cloud.yandex.ru/) and select your service.

![folder](images/ui/available_clouds.png)

2. Click on the **Service accounts** tab.

![service_account](images/ui/service_account.png)

3. Click on **Create a service account** if you don't have one already.

![create_service](images/ui/create_service_account.png)

4. Choose a name and add one or several roles for your service account, then click on **Create**. You will need to create or link a billing account.

![create_service](images/ui/service_account_form.png)

5. Go back to the Service accounts tab. Choose the service account and click the line with its name.

6. Click **Create new key** in the top panel.

7. Click **Create API key**. Enter a description of the key so that you can easily find it in the management console.

8. Save the ID and private key.

### Folder ID

1. Go to the [management console](https://console.cloud.yandex.com/). You can see the folder ID. Otherwise, select a folder.

![select_cloud_folder_id](images/ui/select_cloud_folder_id.png)

2. You can see the folder ID in the URL. For the example above, the folder ID is :

![select_cloud_folder_id](images/ui/folder_id_in_url.png)
<code>https://console.cloud.yandex.com/folders/b1g9jainvkdss7dljq72</code>

* **b1gd129pp9ha0vnvf5g7** is the folder ID.

### Registry ID (optional)

1. Open the Yandex.Cloud command line.
   
2. Get the list of registries in the default folder with the command below:

````
$ yc container registry list
````

You should see a result like this :


    $ yc container registry list
    +----------------------+--------+----------------------+
    |          ID          |  NAME  |      FOLDER ID       |
    +----------------------+--------+----------------------+
    | udol16490s9a2t1gr8mi | my-reg | b1g13tyubu5ek1omtsu0 |
    +----------------------+--------+----------------------+


* The folder specified in the CLI profile is used by default. You can specify a different folder using the --folder-name or --folder-id parameter.

## Limitations

There are currently no known limitations to the YANDEX connector.

## Displaying information to know if it worked

You need to have [MQTT.fx](https://mqttfx.jensd.de/index.php/download) and [Mosquitto](https://mosquitto.org/download/) installed prior to these steps.

1. Open MQTT.fx and create a connection with the following parameters :

![broker_configuration](images/broker_configuration.png)

| Parameter | Description |
| --------- | ----------- |
| **Certification authority certificate** | Security certificate needed to connect to the broker. |
| **Broker address** | mqtt.cloud.yandex.net |
| **Broker port** | 8883 |
| **Protocol** | TLSv1.2 |

2. Go to the root folder of Mosquitto, open a new command prompt and enter this command :
```
    net start mosquitto
```

3. Subscribe a registry to a single device's topic by entering the following command :
```
    mosquitto_sub -h mqtt.cloud.yandex.net \
    -p 8883 \
    --cafile rootCA.crt \
    --cert registry-cert.pem \
    --key registry-key.pem \
    -t '$devices/<device ID>/events' \
    -q 1
```

4. Send data to the device's topic with following command :
```
    $ mosquitto_pub -h mqtt.cloud.yandex.net \
    -p 8883 \
    --cafile rootCA.crt \
    --cert device-cert.pem \
    --key device-key.pem \
    -t '$devices/<device ID>/events' \
    -m 'Test data' \
    -q 1
```

* You will see the result in the MQTT's window.

## Troubleshooting

[comment]: <> (<a name="troubleshooting"></a>)
As for now, there are no detected bugs.
