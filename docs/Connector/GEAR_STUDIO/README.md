---
sidebarDepth: 4
---

# CREATING A TAGO CONNECTION

## Collecting Expected Information

**Parameters required**

| Field | Description |
| ------ | ----------- |
| ```Instance hostname``` | URL used when connecting to Gear Studio instance.|
| ```Access Token``` | Generated in your instance settings.|

### Generate Authorization

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
  "name":"Actility To GearStudio",
  "connectorId":"actility-http-iot",
  "configuration": {
      "instanceHostname":"https://gear.studio.cloud",
      "accessToken":"at5f66e790ee914ab4a32eda5729b565a2"
  },
  "brand":"GEAR_STUDIO"
}
```

The following table lists the properties applicable to a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-http-iot for Tago platform. |
| ```configuration/instanceHostname``` | Must be replaced by your Instance hostname, used when you connect to Gear Studio. |
| ```configuration/accessToken``` | Must be replaced by your Access Token created in your instance settings. |
| ```brand``` | Must be set to ```GEAR_STUDIO```. |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection With UI

1. Click Connections -> Create -> **ThingPark X IoT Flow**

2. Then, a new page will open. Select the connection type: **Gear Studio**.

3. Fill in the form as in the example below and click on **Create**.

::: tip Note
Parameters marked with * are mandatory.
:::

4. A notification appears on the upper right side of your screen to confirm that the application has been created.

5. After creating the application, you will be redirected to the connection details.

## Limitations

Limitations depends on Account Plan you own (refer to this [link](https://docs.tago.io/en/articles/114-account-plans)).

## Displaying information to know if it worked

1.	Connect to your **Gear Studio** instance.

2.	Go to **Devices** section and click the **"+ Add Device"** buton to create a new **Device**.


3.  Choose **LoRaWan Actility** in the scrolling menu, and look for the **Device** model you want to add.


4.  Fill in the form, with the **Device name** and the **Device EUI** (find **Device EUI** at https://yourdomain.com/tpe/#/devices/list)


5.  Wait a few minutes, to see if you get an **input** from your **Device** (see exemple bellow).


You can also create dashboard to see live uplinks.

## Troubleshooting

As for now, there are no detected bugs.