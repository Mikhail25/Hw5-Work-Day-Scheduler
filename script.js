var currentDay = $('#currentDay');
var todayDate = moment().format("dddd, MMMM Do");
var ulContainer = $('#scheduleContainer');


console.log(todayDate);
currentDay.text(todayDate);

var timeStart = "6:00:00";
var timeFormat = "hh:mm A";
var timeSet = moment(timeStart, timeFormat);

//For the for loop refrence

//console.log(timeSet.add(1, "hour").format("LT"));
console.log(moment(timeSet).isBefore(moment()));

//dynamically generates the schedule
function generateTimeSchedule(){

    ulContainer.empty();

    var i=0
    while(i< 20){
        //List container for the schedule
        var liContainer = $("<li>");
        liContainer.attr("class","row w-auto my-1");
        ulContainer.append(liContainer);

        //Appending the items inside the list

        var hourContainer = $(`<span class="hour col text-right pt-3">`);
        hourContainer.text(timeSet.add(1, "hour").format("LT"));
        liContainer.append(hourContainer);

        liContainer.append(`<textarea class="schedule-text form-control col-10 rounded-0" id="textList" rows="3"></textarea>`);
        liContainer.append(`<button type="button" class="saveBtn btn btn-primary col ">🖫</button>`);

        var textContainers = $(".schedule-text");
        
        // if(moment(timeSet).isBefore(moment())){
        //     console.log("Before: "+timeSet.format("LT"));
        //     textContainers.addClass("past");

        // }else if(timeSet.hour() === moment().hour()){
        //     console.log("Now: "+timeSet.format("LT"));

        // }else if(moment(timeSet).isAfter(moment())){
        //     console.log("After: "+timeSet.format("LT"));
        //     textContainers.addClass("future");
        // }

        i++;
    }


}

generateTimeSchedule();