---
sidebarDepth: 4
sidebar_label: Connecting to Cumulocity
---

# CREATING A CUMULOCITY CONNECTION

## Collecting Expected Information

**Parameters required**

| Field | Description |
| ------ | ----------- |
| ```Hostname``` | URL used when connecting to Gear Studio instance.|
| ```Tenant ID``` | Collected in your profile page |
| ```Username``` | Credential used when connecting to Cumulocity IoT.|
| ```Password``` | Credential used when connecting to Cumulocity IoT.|

### Hostname

**Hostname** corresponds to the link you are using to connect to your Cumulocity instance.

For example: `actility.cumulocity.com`

### Tenant ID

To collect your **Tenant ID**, connect to your Cumulocity instance, and then click on your username on the top right corner of the page.

![tenant_id](images/tenant_id.png)

You will be able to copy it.

### Username and Password

**Username** and **Password** are credentials used to connect to your Cumulocity instance.

## Creating a Connection From UI

You need to know the parameters that are required to perform this task. To learn more, check the [Parameters required for connecting to a Cumulocity platform](#CumulocityParameters) below in this topic.

1. Click Connections -&gt; Create -&gt; ThingPark X IoT Flow.

![img](images/ui/cumulocity_connection_create.png)

Then, a new page will open. Select the connection type : Cumulocity.

![img](images/ui/select_cumulocity_connection.png)

2. Fill in the form as in the example below and click on **Create**.

![img](images/ui/cumulocity_form_filled.png)

:::tip Note
Parameters marked with * are mandatory.
:::

* A notification appears on the upper right side of your screen to confirm that the application has been created.

![img](images/ui/cumulocity_notification_creation.png)

4. After creating the application, you will be redirected to the application details.

![img](images/ui/cumulocity_connection_details.png)

**Changing the Settings after Creation**

You can change the settings parameters such as the Headers after the creation of the Cumulocity connection.

To do this, proceed as follows:

1. Select the Cumulocity application for which you want to change one or several parameters.

2. In the connection information dashboard, click on the **Edit** icon corresponding to the parameter you want to change.

![img](images/ui/edit_button.png)

3. Enter the new value, and click on the **Confirm** icon.

![img](images/ui/confirm_edit.png)

* The Confirmation window displays,

![img](images/ui/confirmation_window.png)

* A notification will inform you that the parameter is updated.

![img](images/ui/cumulocity_notification_update.png)

<a id="CumulocityParameters">**Parameters required for connecting to a Cumulocity platform**</a>

The parameters are the following:

| UI Field | Description |
| ------ | ----------- |
| **Name** | Name of the connection that you want to register (Editable). |
| **Host Name** | The hostname of your account on Cumulocity IoT cloud platform |
| **Tenant ID** | The tenant of your account on Cumulocity IoT cloud platform |
| **Username** | The username of your account on Cumulocity IoT cloud platform |
| **Password** | The password of your account on Cumulocity IoT cloud platform |
| **Description** | Description of the connection that you want to register (Editable). |

## Creating a Connection With API

The creation of a connection establishes a messaging transport link between ThingPark X IoT Flow and the cloud provider. Events and commands from multiple Devices will be sent over this messaging transport link.

To do this, you need to use the **Connections** group resource:

*	`POST/connections` to create a new Connection instance
*	`PUT/connections` to update a Connection instance
*	`DELETE/connections` to delete a Connection instance

:::tip Note
We follow the REST-full API pattern, when updating configuration properties for a connection resource. Thus, you must also provide the whole configuration again.
:::

Example for creation of a new connection instance :

```json
POST /connections
{
  "connectorId": "actility-cumulocity-iot",
  "name": "Actility Cumulocity Connection",
  "configuration": {
    "description": "Cumulocity connection test",
    "hostName": "actility.cumulocity.com",
    "tenantId": "mytenant",
    "username": "myusername",
    "password": "mypassword"
  }
}
```

The following table lists the properties applicable to a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-cumulocity-iot for Cumulocity IoT cloud platform. |
| ```configuration/hostName``` | URL used to connect to Cumulocity instance. |
| ```configuration/tenantId``` | Tenant ID collected in your Cumulocity instance. |
| ```configuration/username``` | Username used when connection to Cumulocity instance |
| ```configuration/password``` | Password used when connection to Cumulocity instance |

:::warning Important note
Not all properties are present in this example. You can check the rest of these properties in the [common parameters section](../../Getting%20started/Setting%20Up%20A%20Connection%20instance/About_connections#common-parameters).
:::

## Limitations

Your device drivers must be compatible with points and ontologies to work with the Cumulocity IoT cloud platform.

## Displaying information to know if it worked

1. Go to [ThingPark Actility Enterprise](https://community.thingpark.io/tpe/#/login)

2. Go to the **Devices List** section, and click on the device you want to affect to your Cumulocity application.

![img](images/list_devices.png)

3. When you are on the device's details page, click on **Add a connection**.

![img](images/add_connection.png)

4. Select your Cumulocity connection and click on the **Confirm** icon.

![img](images/select_connection.png)

* A notification appears to confirm that the application has been added to the device.

![img](images/cumulocity_notification_add_connection.png)

5. Go to the Cumulocity IoT Cloud Platform depends on the host name used and login. Here [Tpx EU Hostname](https://tpx.eu-latest.cumulocity.com/apps/devicemanagement) for our example.

![img](images/cumulocity_platform_login.png)

6. Select Devices -&gt; All devices.

![img](images/cumulocity_all_devices.png)

* You can then verify if your device is listed and the uplinks are correctly sent.

7. By clicking on a device, you'll be able to measurements received.

![img](images/cumulocity_device_measurements.png)

## Troubleshooting

[comment]: &lt;&gt; (<a name="troubleshooting"></a>)
As for now, there are no detected bugs.

* Cumulocity documentation: [https://www.softwareag.cloud/site/dev-center/cumulocity-iot.html#/](https://www.softwareag.cloud/site/dev-center/cumulocity-iot.html#/)
