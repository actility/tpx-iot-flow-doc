# IoT Admin API

If you want to directly interact with the API go to [Swagger UI](../../swagger-ui/index.html?urls.primaryName=IoT%20Admin%20API)

## Concepts

The ThingPark X IoT Admin API is the base API for a user to access its reachable list of accounts and to manage them.

An account could be either:
* **Personal**: it means the account is linked to a single user who owns it. A user can only have one personal account
* **Organization**: it means the account relates to an organization composed of several users (called **Members**)

An account is always composed of a list of **Members** who are associated with a **Role** which are:
 * **Reader**: the member can access in read-only to the ThingPark X account
 * **Writer**: the member can access in read-write to the ThingPark X account (but cannot send downlinks nor delete resources)
 * **Controller**: the member can access in read-write and send downlinks to things on the ThingPark X account (but cannot delete resources) 
 * **Owner**: the member has all rights on the ThingPark X account

In the case of a **Personal** account there is only one possible member who is the **Owner**

An account could be created through two ways:
 * using a POST on the IoT Admin API when it is authorized for the realm. It is only possible to create a **Personal**
   account through this way
 * by subscribing to a VGSCL gateway on ThingPark OS. This will create an **Organization** account accessible to all
   ThingPark users linked to the **Subscriber**


<!--
## Domain model


* **Account**: a ThingPark X account in a realm related to a user or a group of users
* **Member**: a member of a ThingPark X account. A member can see the account and interact with it depending on its role
* **Role**: a role associated to an account member. It could be either:

-->
