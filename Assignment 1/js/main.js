/********************************************************************************* *
* WEB422 – Assignment 1 
* I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source 
* (including web sites) or distributed to other students. 
*  
* Name: Aria Avazkhani Student ID: 134465160 Date: Jan 14, 2019 
* 
* 
********************************************************************************/  
 

const link = "https://salty-sierra-99932.herokuapp.com/"

$(document).ready(function(){
    console.log("jQuery Working");
    $( "#teams-menu" ).on( "click", function(event) {
        event.preventDefault();
        $.ajax({
            url: link + "teams",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $(".well").empty()
            .append("<h3>Teams</h3>")
            .append(JSON.stringify(data));
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });
    $( "#employees-menu" ).on( "click", function(event) {
        event.preventDefault();
        $.ajax({
            url: link + "employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $(".well").empty()
            .append("<h3>Employees</h3>")
            .append(JSON.stringify(data));
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });
    $( "#projects-menu" ).on( "click", function(event) {
        event.preventDefault();
        $.ajax({
            url: link + "projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $(".well").empty()
            .append("<h3>Projects</h3>")
            .append(JSON.stringify(data));
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });
    $( "#positions-menu" ).on( "click", function(event) {
        event.preventDefault();
        $.ajax({
            url: link + "positions",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            $(".well").empty()
            .append("<h3>Positions</h3>")
            .append(JSON.stringify(data));
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
    });
});