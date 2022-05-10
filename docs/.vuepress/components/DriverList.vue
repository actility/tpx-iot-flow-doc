<template>
  <div>
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <input v-model="filter" @input="changeFilter" class="filterTable" type="text" placeholder="Search..." />
    <table 
    :per-page="perPage"
    :current-page="currentPage"
    :items="driversInPage"
     id="my-table"
    >
      <th>Driver Id</th><th>Name</th><th>Module Id</th><th>Producer Id</th><th>Version</th>
      <tr v-for="driver in driversInPage" v-bind:key="driver.id">
        <td style="font-weight: bold">{{ driver.id }}</td>
        <td>{{ driver.name }}</td>
        <td>{{ driver.moduleId }}</td>
        <td>{{ driver.producerId }}</td>
        <td>{{ driver.version }}</td>
      </tr>
    </table>
    <div style="flexDirection: row; justifyContent: space-between">
    </div>

      <!-- <div class="row">
          <button v-for="page in total" :key="page" :class="this.getStyle(page)" v-on:click="this.switchPage(page)">
              {{page}}
          </button>
      </div> -->

    Page: {{this.currentPage}}/{{this.total}}
  </div>
</template>

<script>
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
//import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data() {
    return {
      allDrivers: [],
      driversInPage: [],
      perPage: 5,
      currentPage: 1,
      total: 0,
      previousPage: null,
      nextPage: null,
      renderComponent: true,
      filter: null,
      initialDrivers: []
    };
  },

  methods: {
    getStyle(page){
      if(page != this.currentPage){
        return "paginationButtonSquare";
      }else{
        return "paginationButtonSquareActive";
      }
    },
    switchPage(page){
      this.currentPage = page;
      this.driversInPage = this.getDriverForPage();
    },
    changeFilter(){
      this.allDrivers = this.groupDriversByPage(this.initialDrivers);
      this.pageNumber = 1
      this.driversInPage = this.getDriverForPage();
    },
    getDriverForPage(){
      let page = this.allDrivers.find((page) => page.idPage == this.currentPage);
      return page.drivers;
    },
    filterDrivers(allDrivers){
      return allDrivers.filter((driver) => driver.id.includes(this.filter));
      
    },
    groupDriversByPage(allDrivers){
      if(this.filter){
        allDrivers = this.filterDrivers(allDrivers);
      }
      let drivers = [];
      let pageNumber = 1;
      let page = [];
      for(let index = 0; index<allDrivers.length; index++){
        if(page.length < this.perPage){
          page.push(allDrivers[index])
        }else{
          // Page is complete, push it to all Drivers
          let completePage = {
            idPage: pageNumber,
            drivers: page
          }
          drivers.push(completePage);
          pageNumber++;
          page = [];
          page.push(allDrivers[index])
        }
        // If last item, push last page
        if(index == allDrivers.length - 1){
          let completePage = {
            idPage: pageNumber,
            drivers: page
          }
          drivers.push(completePage);
        }
      }
      this.total = drivers.length;
      return drivers;
    },
    async getData() {
    let allDrivers= [
        {
            "id": "abeeway:asset-tracker:3",
            "name": "asset tracker js driver",
            "type": "thingpark-x-js",
            "moduleId": "asset-tracker",
            "producerId": "abeeway",
            "source": "system",
            "version": "3.3.0",
            "application": {
                "producerId": "abeeway",
                "moduleId": "asset-tracker",
                "version": "2"
            },
            "private": true
        },
        {
            "id": "actility:adeunis-analog:1",
            "name": "Adeunis Analog v2 driver",
            "type": "thingpark-x-js",
            "moduleId": "adeunis-analog",
            "producerId": "actility",
            "source": "system",
            "version": "1.4.1",
            "application": {
                "producerId": "adeunis",
                "moduleId": "analog",
                "version": "2"
            },
            "private": false
        },
        {
            "id": "actility:adeunis-comfort:1",
            "name": "Adeunis Comfort v1 driver",
            "type": "thingpark-x-js",
            "moduleId": "adeunis-comfort",
            "producerId": "actility",
            "source": "system",
            "version": "1.4.1",
            "application": {
                "producerId": "adeunis",
                "moduleId": "comfort",
                "version": "1"
            },
            "private": false
        },
        {
            "id": "actility:adeunis-delta-p:1",
            "name": "Adeunis Delta-p v1 driver",
            "type": "thingpark-x-js",
            "moduleId": "adeunis-delta-p",
            "producerId": "actility",
            "source": "system",
            "version": "1.4.1",
            "application": {
                "producerId": "adeunis",
                "moduleId": "delta-p",
                "version": "1"
            },
            "private": false
        },
        {
            "id": "actility:dl-sht21:1",
            "name": "decentlab dl-sht21 driver",
            "type": "thingpark-x-js",
            "moduleId": "dl-sht21",
            "producerId": "actility",
            "source": "system",
            "version": "1.3.1",
            "application": {
                "producerId": "dl",
                "moduleId": "dl-sht21",
                "version": "1"
            },
            "private": false
        },
        {
            "id": "test1",
            "name": "decentlab dl-sht21 driver",
            "type": "thingpark-x-js",
            "moduleId": "dl-sht21",
            "producerId": "actility",
            "source": "system",
            "version": "1.3.1",
            "application": {
                "producerId": "dl",
                "moduleId": "dl-sht21",
                "version": "1"
            },
            "private": false
        },
        {
          "id": "test2",
          "name": "decentlab dl-sht21 driver",
          "type": "thingpark-x-js",
          "moduleId": "dl-sht21",
          "producerId": "actility",
          "source": "system",
          "version": "1.3.1",
          "application": {
              "producerId": "dl",
              "moduleId": "dl-sht21",
              "version": "1"
          },
          "private": false
        },
                {
            "id": "test3",
            "name": "decentlab dl-sht21 driver",
            "type": "thingpark-x-js",
            "moduleId": "dl-sht21",
            "producerId": "actility",
            "source": "system",
            "version": "1.3.1",
            "application": {
                "producerId": "dl",
                "moduleId": "dl-sht21",
                "version": "1"
            },
            "private": false
        }
      ];
      this.initialDrivers = allDrivers;
      this.allDrivers = this.groupDriversByPage(this.initialDrivers); // Prepare data
      this.driversInPage = this.getDriverForPage();
    },
  },

  created() {
    this.getData();
  },
};
</script>