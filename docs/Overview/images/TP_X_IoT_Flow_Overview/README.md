
# ThingPark Solution Overview

The ThingPark X IoT Flow module aims at interconnecting ThingPark Wireless sensor event sources and command sinks (or other bidirectional data endpoints) with IoT cloud providers (Microsoft Azure, AWS or MQTT) or ThingPark X IoT Core.
As depicted below, ThingPark Wireless forwards uplinks messages to TP X IoT Flow that then deliver those messages to the selected IoT Cloud platform, through the available connections implementing the proper connector type.

![img](./images/Dataflow.png)


## Key Concepts

The following key concepts are defined in ThingPark X IoT Flow.

###### Connector

TP X IoT Flow `connectors` is a profile that will determine the communication parameters toward the IoT Cloud platform.
Amongst the available connectors currently available you will find :

* 	AWS IoT
*   Azure IoT Hub
* 	ThingWorx
* 	IBM Watson IoT
* 	MQTT

###### Connection

A **connection** is a specific instance of a `Connector` for which you define specific parameters to establish a communication stream with the selected IoT cloud platform. 

###### IoT Flow

An **IoT Flow** is the object that will create an association between a sensor and an IoT cloud platform.
This association is done by matching sensors traffic to a specific **Connection** using `tags` available as metadata in uplink/downlink messages.

###### IoT Flow Rest API

The IoT Flow REST API is a set of webservice allowing to create and configure the IoT Flows.

##### Configuration Steps

In order to establish a bi-directional communication between an LPWAN connected sensor and a compatible IoT cloud platform using TP X IoT Flow, you need to complete the following steps:

![img](./images/followingSteps.png)

This flow is described in the subsequent sections of this document.

*	To create your first IoT Flow, get started here [Getting Started](../../Getting_Started/Getting_Started_ThingPark/).


