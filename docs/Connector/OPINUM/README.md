---
sidebarDepth: 4
---

# CREATING A QUBITRO CONNECTION

## Collecting Expected Information

**Parameters required**

| Field | Description |
| ------ | ----------- |
| ```Project ID``` | Get it when creating a device |
| ```Webhook Signing Key``` | Get it when creating a device |

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
  "name":"Actility to Qubitro",
  "connectorId":"actility-http-iot",
  "configuration": {
      "destinationURL":"https://webhook.qubitro.com/integrations/actility",
      "headers": {
        "projectId":"aa62ebe1-7ff3-4d05-baec-e6ff2edf34a4",
        "webhookSigningKey":"NGtFMlNZdEZpRVpmeXRMNFJpbVM1THVJa3EzMg=="
      }
  },
  "brand":"QUBITRO"
}
```

The following table lists the properties applicable to a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-http-iot for Tago platform. |
| ```configuration/projectId``` | Must be replaced by your Project ID, found during device creation. |
| ```configuration/webhookSigningKey``` | Must be replaced by your Webhook Signing Key during device creation. |
| ```brand``` | Must be set to ```GEAR_STUDIO```. |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection With UI

1. Click Connections -> Create -> **ThingPark X IoT Flow**
![create](./images/create.png)


2. Then, a new page will open. Select the connection type: **Qubitro**.
![select](./images/select.png)

3. Fill in the form as in the example below and click on **Create**.
![filled_form](./images/filled_form.png)

::: tip Note
Parameters marked with * are mandatory.
:::

4. A notification appears on the upper right side of your screen to confirm that the application has been created.

5. After creating the application, you will be redirected to the connection details.

## Limitations

Limitations depends on Account Plan you own.

## Displaying information to know if it worked

1.	Connect to your **Qubitro** account.

2.  Click on **New project**, chose a **Name** and a **Description**, and then click **Create project**.
![new_project](./images/new_project.png)

3. Now chose **Actility** connectivity method, and click on **Continue**.
![add_device](./images/add_device.png)

4. You now have access to your **Project ID** and **Webhook Signing Key**. Put these informations in Thingpark X Qubitro form.
![device_info](./images/device_info.png)

5. You'll now be able to see if you received **Devices** messages.
![data](./images/data.png)
![device_data](./images/device_data.png)

## Troubleshooting

As for now, there are no detected bugs.

* Qubitro documentation: <https://docs.qubitro.com/integrations/thingpark>