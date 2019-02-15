/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Aria Avazkhani Student ID: 134465160 Date: Feb 15,2019
*
*
********************************************************************************/

const link = "https://salty-sierra-99932.herokuapp.com/";

var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
};


$(document).ready(function () {
    try {
        initializeTeams()
            .then(initializeEmployees)
            .then(initializeProjects)
            .then(() => {
                ko.applyBindings(viewModel, $("body")[0]);
                $("select.multiple").multipleSelect({ filter: true });
                $("select.single").multipleSelect({ single: true, filter: true });
            })
    }
    catch (message) {
        showGenericModal("Error", message);
    };
});

function showGenericModal(title, message) {
    $(".modal-title").empty().append(title);
    $(".modal-body").empty().append(message);
    $("#genericModal").modal("show");
};

function initializeTeams() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: link + "teams-raw",
            type: 'GET',
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.teams = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the team data");
            });
    });
};

function initializeEmployees() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: link + "employees",
            type: 'GET',
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.employees = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the team data");
            });
    });
};

function initializeProjects() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: link + "projects",
            type: 'GET',
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.projects = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the team data");
            });
    });
};

function saveTeam() {
    let currentTeam = this;
    $.ajax({
        url: link + "team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify({
            Projects: currentTeam.Projects(),
            Employees: currentTeam.Employees(),
            TeamLead: currentTeam.TeamLead()
        })
    })
    .done(function (){
        showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully");
    })
    .fail(function(){
        showGenericModal("Error", "Error updating the team information.");
    });
};

