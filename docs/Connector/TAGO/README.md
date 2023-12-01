---
sidebarDepth: 4
---

# CREATING A TAGO CONNECTION

## Collecting Expected Information

**Parameters required**

| Field | Description |
| ------ | ----------- |
| ```Authorization``` | The key generated [here](https://admin.tago.io/devices/authorization).|

### Generate Authorization

The **Authorization** is a key generated in [TAGO](https://admin.tago.io/).
Follow these steps to generate a new **Authorization** in your TAGO admin interface:

1. Open this [link](https://admin.tago.io/). Go to the **Devices** section, and **Authorization** in the top right corner.

![goto_authorization](images/authorization.png)

2. You can now copy your **Authorization** key, by clicking the **Copy** button.

![generate_key](images/copy_authorization.png)

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
  "name":"Actility To Tago",
  "connectorId":"actility-http-iot",
  "configuration": {
      "destinationURL":"https://actility.middleware.tago.io/uplink?authorization={YOUR-AUTHORIZATION}"
  },
  "brand":"TAGO"
}
```

The following table lists the properties applicable to a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-http-iot for Tago platform. |
| ```configuration/destinationURL/authorization``` | Must be replaced by your Authorization Token (refer to [this section](#authorization)). |
| ```brand``` | Must be set to ```TAGO```. |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection With UI

1. Click Connections -> Create -> **ThingPark X IoT Flow**

![create](images/create.png)

2. Then, a new page will open. Select the connection type: **Tago**.

![select_tago](images/select_tago.png)

3. Fill in the form as in the example below and click on **Create**.

![form_filled](images/fill_form.png)

::: tip Note
Parameters marked with * are mandatory.
:::

4. A notification appears on the upper right side of your screen to confirm that the application has been created.

5. After creating the application, you will be redirected to the connection details.

6. Once you are redirected on connection UI, copy the downlink URL that is on the blue panel.

![connection_main](images/connection_main.png)

7. Paste this downlink URL on the Tago Authorization section (click on the pen button).

![downlink_tago](images/downlink_tago.png)

## Limitations

Limitations depends on Account Plan you own (refer to this [link](https://docs.tago.io/en/articles/114-account-plans)).

## Displaying information to know if it worked

1.	Connect to your [TAGO account](https://admin.tago.io/).

2.	Go to **Devices** section and click the **"+ Add Device"** button to create a new **Device**.

![add_device](images/add_device.png)

3.  Choose **LoRaWan Actility** in the scrolling menu, and look for the **Device** model you want to add.

![choose_device](images/choose_device.png)

4.  Fill in the form, with the **Device name** and the **Device EUI** (find **Device EUI** at https://yourdomain.com/tpe/#/devices/list)

![fill_device_form](images/fill_device_form.png)

5.  Wait a few minutes, to see if you get an **input** from your **Device** (see exemple bellow).

![device_input](images/device_input.png)

You can also create dashboard to see live uplinks.
![dashboard](images/dashboard.png)

## Sending a downlink
1.	Dashboard + Analysis Method:
The most common method is to utilize a combination of a Dashboard and an Analysis. This allows you to send downlink commands to devices directly from the Dashboard interface. You can find detailed instructions on how to set up this method in our documentation here: [Downlinks Using Dashboards](https://help.tago.io/portal/en/kb/articles/221-downlinks-using-dashboards).

2.	Device Configuration Parameters:
Another quick method is by using the Device Configuration Parameters feature in TagoIO. This allows you to define specific parameters that can be sent as downlink commands to your devices. You can find step-by-step instructions on how to implement this method in our documentation here: [Downlink for LoRaWAN](https://help.tago.io/portal/en/kb/articles/220-downlink-for-lorawan).

## Troubleshooting

As for now, there are no detected bugs.

* Tago documentation: [https://help.tago.io/portal/en/kb/tagoio](https://help.tago.io/portal/en/kb/tagoio)
