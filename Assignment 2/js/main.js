/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Aria Avazkhani Student ID: 134465160 Date: Feb 1,2019
*
*
********************************************************************************/ 

const link = "https://salty-sierra-99932.herokuapp.com/"
let employeesModel=[];

$(document).ready(function(){
    $("#employee-search").val("");
    initializeEmployeesModel();

    $("#employee-search").on("keyup", function(){
        let filtered = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filtered);
    });
    
    $(document.body).on('click', '.body-row' ,function(){
        let employee = getEmployeeModelById($(this).attr("data-id"));
        if(employee != null){
            
            employee.HireDate = moment(employee.HireDate).format('LLLL');
            
            let template = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %>, ' +
                '<%- employee.AddressCity %>, <%- employee.AddressState %>.' +
                '<%- employee.AddressZip %></br><strong>Phone Number:</strong> ' + 
                '<%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
              );
              let modal = template({'employee':employee});
   
              showGenericModal(employee.FirstName + ' ' + employee.LastName, modal);
        }
    });
});

function initializeEmployeesModel(){
    $.ajax({
        url: link + "employees",
        type: "GET",
        contentType: "application/json"
    })
    .done(function(data){
        employeesModel=data;
        refreshEmployeeRows(employeesModel);
    })
    .fail(function(err){
        showGenericModal('Error', 'Unable to get Employees');
    });
};

function showGenericModal(title,message){
    $(".modal-title").empty()
        .append(title);
    $(".modal-body").empty()
        .append(message);
    $("#genericModal").modal("show");
};

function refreshEmployeeRows(employees){
    let template =_.template(
        '<% _.forEach(employees, function(employee){%>' +
        '<div class="row body-row" data-id="<%- employee._id %>">' +
        '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>'+
        '<div class="col-xs-4 body-column"><%- employee.LastName %></div>'+
        '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>'+
        '</div><% }); %>');
    $("#employees-table").empty();
    $("#employees-table").append(template({'employees': employees}));
};

function getFilteredEmployeesModel(filterString){
    let filtered=_.filter(employeesModel, function(i){
        if(i.FirstName.toLowerCase().includes(filterString.toLowerCase())
            ||i.LastName.toLowerCase().includes(filterString.toLowerCase())
            ||i.Position.PositionName.toLowerCase().includes(filterString.toLowerCase())) return true;
        else 
            return false;            
    });
    return filtered;        
};

function getEmployeeModelById(id){
    let ret=null;
    $.grep(employeesModel, function(item, i) {
        if(item._id==id) ret=_.cloneDeep(item);
    });
return ret;
}