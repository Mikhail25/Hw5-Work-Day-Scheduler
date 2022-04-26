var currentDay = $('#currentDay');
var todayDate = moment().format("dddd, MMMM Do");
var ulContainer = $('#scheduleContainer');


console.log(todayDate);
currentDay.text(todayDate);

var timeStart = "6:00:00";
var timeFormat = "hh:mm A";
// var timeFormat = "hh:mm A";
var timeSet = moment(timeStart, timeFormat);

//For the for loop refrence

//console.log(timeSet.add(1, "hour").format("LT"));
//console.log(moment(timeSet).isBefore(moment()));

//dynamically generates the schedule
function generateTimeSchedule(){

    ulContainer.empty();

    var i=0
    while(i< 16){
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
        

        i++;
    }
    //reiterates though the list
    var listContent = $("li");
    var listItemArray = JSON.parse(localStorage.getItem("listItem"));

    //reiterates though the list
    for (var i = 0; i < listContent.length; i++){
        
        var timeChecker = moment(listContent.eq(i).children('span').text(), "hh:mm A");
        var textAreaList = listContent.eq(i).children('textarea');

        //Dynamically colors the textarea depending on time
        if(moment(timeChecker).isBefore(moment()) && timeChecker.hour() !== moment().hour()){
            console.log("Before: "+timeChecker.format("LT"));
            textAreaList.addClass("past");

        }else if(timeChecker.hour() === moment().hour()){
            textAreaList.addClass("present");

        }else if(moment(timeChecker).isAfter(moment())){
            console.log("After: "+timeChecker.format("LT"));
            textAreaList.addClass("future");

        }

        //populates the textarea 
        if(listItemArray !== null){
            for(var n = 0; n < listItemArray.length; n++){
                if(listItemArray[n].itemPos == i){
                    listContent.eq(i).children('textarea').val(listItemArray[n].itemText);
                }
            }
        }
    }

}

//function to save in localhost
function saveListItem(event){
    var btnClicked = $(event.target);
    console.log(btnClicked.parent('li').index());
    console.log(btnClicked.parent('li').children('textarea').val());

    var listItem = {
        itemText: btnClicked.parent('li').children('textarea').val().trim(),
        itemPos: btnClicked.parent('li').index()
    }

    var itemStorage;

    //Checks if array is empty
    if(localStorage.getItem("listItem") == null){
        itemStorage = [];
    }else{
        itemStorage = JSON.parse(localStorage.getItem("listItem"));
    }

    //Small function that relaces values in a variable if that position is occupied
    //Basically optimizes the program to 
    var replace = false;
    for(var i = 0; i < itemStorage.length; i++){
        if(itemStorage[i].itemPos === listItem.itemPos){
            itemStorage[i] = listItem;
            replace = true;
        }
    }
    if(!replace){
        itemStorage.push(listItem);
    }

    localStorage.setItem("listItem", JSON.stringify(itemStorage));

}

generateTimeSchedule();

//Dynamic save button
ulContainer.on("click", ".saveBtn", saveListItem);