---
sidebarDepth: 4
---

# CREATING A MODBUS CONNECTION

## Creating a connection with API

The creation of a connection establishes a unidirectional (uplink) messaging transport link between ThingPark X IoT Flow and an embedded MODBUS slave. Values that come from your devices are mapped to MODBUS register values with the required mapping. The partners can connect to the MODBUS slave and poll the written registry values via their own MODBUS slave implementations.

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
    "connectorId": "actility-modbus-iot",
    "name": "Modbus Slave",
    "configuration": {
      "bindAddress": "127.0.0.1",
      "bindPort": 502,
      "coilsSize": 1000,
      "holdingRegistersSize": 1000,
      "mappingRules": [
        {
          "devEUI": "A81758FFFE05A086",
          "data": "/temperature",
          "register": 100,
          "type": "FLOAT"
        },
        {
          "devEUI": "A81758FFFE05A086",
          "data": "/humidity",
          "register": 80,
          "type": "INTEGER"
        }
      ]
    }
}
```

The following table lists properties of a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to `actility-modbus-iot`. |
| ```bindAddress``` | The IP address on which the embedded MODBUS slave will bind on in case the server has multiple network interfaces. |
| ```bindPort``` | The port on which the embedded MODBUS slave will be listening on. Only port range from 502 to 507 are allowed. |
| ```coilsSize``` | The number of MODBUS coils (coils hold boolean true/false values) in the registry. |
| ```holdingRegistersSize``` | The number of MODBUS holding registers (each register holds a 16 bit value) in the registry. |
| ```mappingRules``` | Is an array of rules which describes the mapping between the incoming uplink JSON payload and how it will be represented in the MODBUS registry. |

::: tip Note on Coils
MODBUS coils are registers that hold boolean (true/false) values. So if coilsSize property is set to 1000, this means we can hold 1000 discrete true/false values inside the registry.
:::

::: tip Note on holdsing registers
MODBUS holdsing registers are 16 bit length registers that can hold arbitrary values. For example, a single MODBUS holding register can hold one of the following values:
- A 16 bit short value
- A 16 bit unsigned int value
- A 16 bit half precision float value
For storing other data types, we need to use multiple registers. How the data is written and read is completely dependent on the implementation.
:::

Actility MODBUS connector currently supports the following data types which are mapped from an uplink JSON field to one of the data types listed below:
- BOOLEAN: A single true/false value that is written to a MODBUS coil. The address of the coil that the value will be read from or written to must be specified in the mapping rules configuration property.
- INTEGER: A 16 bit signed INTEGER value that is written to a MODBUS holding register. The address of the holding register that the value will be read from or written to must be specified in the mapping rules configuration property.
- FLOAT: A 16 bit half precision floating point value that is written to a MODBUS holding register. The address of the holding register that the value will be read from or written to must be specified in the mapping rules configuration property.
- WORD: A 16 bit signed INTEGER value that is written to a MODBUS holding register. The address of the holding register that the value will be read from or written to must be specified in the mapping rules configuration property.
- DWORD: A 32 bit signed INTEGER value that is written to a MODBUS holding register. The starting address of the holding register that the value will be read from or written to must be specified in the mapping rules configuration property.
Since the value is 32 bits, it will occupy 2 consecutive MODBUS holding registers.
:::

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection From UI

You need to know the parameters that are required to perform this task. To learn more, check the [Parameters required for connecting to an OPCUA platform](#OPCUAparameters) below in this topic.

1. Click Applications -> Create -> View More Applications Type.

![img](./images/ui/modbus_application_create.png)

Then, a new page will open. Select the connection type : MODBUS.

![img](./images/ui/select_a_connection.png)

2. Fill in the form as in the example below and click on **Create**.

![img](./images/ui/form-filled.png)

::: tip Note
Parameters marked with * are mandatory.
:::

* A notification appears on the upper right side of your screen to confirm that the application has been created.

![img](./images/ui/notification-creation.png)

4. After creating the application, you will be redirected to the application details.

![img](./images/ui/application-details.png)

**Changing the Settings after Creation**

You can change the settings parameters such as the destination URL or the Headers after the creation of the MODBUS application.

To do this, proceed as follows:

1. Select the MODBUS application for which you want to change one or several parameters.

2. In the application information dashboard, click on the **Edit** icon corresponding to the parameter you want to change.

![img](./images/ui/edit-button.png)

3. Enter the new value, and click on the **Confirm** icon.

![img](./images/ui/confirm-edit.png)

* The Confirmation window displays,

![img](./images/ui/proceed-update.png)

* A notification will inform you that the parameter is updated.

![img](./images/ui/notification-update.png)

<a id="OPCUAparameters">**Parameters required for connecting to an OPCUA platform**</a>

The parameters are the following:

| Field | Description |
| ------ | ----------- |
| ```Application Name``` | Name of the application that you want to register (Editable). |
| ```bindPort``` | The port on which the embedded MODBUS slave will be listening on |
| ```coilsSize``` | The number of MODBUS coils (coils hold boolean true/false values) in the registry|
| ```holdingRegistersSize``` | The number of MODBUS holding registers (each register holds a 16 bit value) in the registry|
| ```mappingRules``` | Is an array of rules which describes the mapping between the incoming uplink JSON payload and how it will be represented in the MODBUS registry|
| ```Description``` | Description of the application that you want to register (Editable). |

## Limitations

When the coils size or inputRegistersSize properties of the MODBUS connector is changed, the existing MODBUS registry is wiped out
and a new MODBUS registry is created. Thus, all the existing values inside the registry will be lost.

## Displaying information to know if it worked

1. Download and install a MODBUS master, for example [MODBUS Doctor](https://www.kscada.com/modbusdoctor.html).

2. Go to the **Devices List** section, and click on the device you want to affect to your MODBUS application.

![img](./images/list-devices.png)

3. When you are on the device's details page, click on **Add an application**.

![img](./images/add-application.png)

4. Select your MODBUS application and click on the **Confirm** icon.

![img](./images/select-application.png)

* A notification appears to confirm that the application has been added to the device.

![img](./images/notification-application.png)

5.	Connect to the embedded MODBUS registry via your own MODBUS master from the configured address

![img](./images/posthere.png)

* You can then browse the contents of the embedded MODBUS registry to verify whether the registry is updated/populated according the the defined DevEUIs and mapping rules configuration of your connection.

![img](./images/posthere-result.png)

##  Troubleshooting

[comment]: <> (<a name="troubleshooting"></a>)
As for now, there are no detected bugs.
