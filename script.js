$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"))
    // listen for save button clicks
    $('.saveBtn').on('click', function () {
        // get nearby values
        var value = $(this).siblings('.description').val();
        var time = $(this).parent().attr('id')
        console.log("this", time)
        console.log("value", value)

        // var time = $(this)
        // console.log("time", time) 

        // save in localStorage
        localStorage.setItem(time, value)

        // Show notification that item was saved to localStorage by adding class 'show'

        // Timeout to remove 'show' class after 5 seconds
    });    

    setTimeout(function () {
        $('.notification').removeClass('show');
    }, 5000);

    function hourUpdater() {
        // get current number of hours (preferably with moment.js)
        var currentHour = parseInt(moment().format('HH'));
        console.log("currentHour", currentHour)

        // loop over time blocks
        // var eachFunction = function() {
            // var _
        $('.time-block').each(function(block) {
            // console.log(block, this)
            var times = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm","4pm","5pm"]
            this.setAttribute("id", times[block])
            this.children[0].textContent = times[block]

            var hourOfTheBlock = block + 9;

            // var blockHour = parseInt($(this).attr('id')).split('-')[1]);
            // loop over time blocks ---> https://api.jquery.com/each/
            // inside this loop, // check if we've moved past this time. If we have, make the row grey. If it's future, make it green. if it's past, make it red. Using the past, present, and future classes in css file
            
            // check if we've moved past this time
            if (hourOfTheBlock < currentHour) {
                this.children[1].classList.add('past');
            } else if (hourOfTheBlock === currentHour) {
                // this.children[1].removeClass('past');
                this.children[1].classList.add('present');
            } else {
                // this.children[1].removeClass('past');
                // this.children[1].removeClass('present');
                this.children[1].classList.add('future');  
            }

            this.children[1].value = localStorage.getItem(times[block])
        });
    }

    hourUpdater();

    // set up interval to check if current time needs to be updated
    var interval = setInterval(hourUpdater, 15000);

    // load any saved data from localStorage
    $('#hour-9 .description').val(localStorage.getItem('hour-9'));
    ///need to repeat line 21 for all the other hours


    // display current day on page
});
