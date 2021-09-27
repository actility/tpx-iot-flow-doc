---
sidebarDepth: 4
---

# CREATING A HERE CONNECTION

## Collecting Expected Information

<a id="HEREparameters">**Parameters required**</a>

| Field | Description |
| ------ | ----------- |
| ```Application Name``` | Name of the application that you want to register (Editable). |
| ```Email``` | Email of the subscriber's HERE account (Editable). |
| ```Password``` | Password of the application that you want to register (Editable). |
| ```Description``` | Description of the application that you want to register (Editable). |

### Account Email

After you have created your HERE account, you need to retrieve the parameter values that will be required to configure the HERE connector.

The only parameter needed is the user's email used for the HERE account.

## Creating a Connection With API

The creation of a connection establishes a bidirectional messaging transport link between ThingPark X IoT Flow and the cloud provider. Events and commands from multiple Devices will be multiplexed over this messaging transport link.


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
    "connectorId": "actility-here-iot",
    "name": "Here_connection",
    "configuration": {
        "email": "samantha@here.com",
        "password": "mypassword"
    }
}
```

The following table lists the properties applicable to a connection instance.

| Field | Description |
| ------ | ----------- |
| ```connectorId``` | Must be set to actility-here-iot for HERE platform. |
| ```email``` | Email of the subscriber's HERE account. |
| ```password``` | Password of the application that you want to register. |

::: warning Important note
All properties are not present in this example. You can check the rest of these properties in the [common parameters section](../../Getting_Started/Setting_Up_A_Connection_instance/About_connections.html#common-parameters).
:::

## Creating a Connection From UI

You must have an active HERE account prior to creating a HERE connection in ThingPark. 

You also need to know the parameters that are required to perform this task. To learn more, check [Parameters required for connecting to a HERE platform](#HEREparameters).

1. Click Applications -> Create -> View More Applications Type. 

![img](./images/ui/here_application_create.png)

Then, a new page will open. Select the connection type : HERE Technologies.

![img](./images/ui/here_select_connection.png)

2. Fill in the form as in the example below and click on **Create**.

![img](./images/ui/set_your_connection.png)

::: tip Note
Parameters marked with * are mandatory.
:::

* A notification appears on the upper right side of your screen to confirm that the application has been created.

![img](./images/ui/connection_created.png)

4. After creating the application, you will be redirected to the application details.

![img](./images/ui/connection_page.png)


**Changing the Settings after Creation**

You can change the settings parameters such as the email or the password after the creation of the HERE application.

To do this, proceed as follows:

1. Select the Here application for which you want to change one or several parameters.

2. In the application information dashboard, click on the **Edit** button corresponding to the parameter you want to change.

![img](./images/ui/edit_button.png)

3. Enter the new value, and click on the **Confirm** icon.

* The Confirmation window displays,

![img](./images/ui/proceed_update.png)

* A notification will inform you that the parameter is updated.

![img](./images/ui/confirmation_update.png)

## Limitations

There are currently no known limitations to the HERE connector.

## Displaying information to know if it worked

1.	Connect to your HERE Admin Portal account.

![img](./images/here_admin_sign_in.png)

2.	Check if you are subscribed to the right project.
      
![img](./images/project_subscribe.png)

3. Connect to your HERE tracking Web App account and go to the **Workspace** section.

![img](./images/here_workspace.png)

4. You can now verify the list of your devices or add more.

![img](./images/here_devices.png)

## Troubleshooting

[comment]: <> (<a id="troubleshooting"></a>)

As for now, there are no detected bugs.


