//google.charts.load('current', { 'packages': ['corechart'] });
//google.charts.setOnLoadCallback(getChartData);

/* -----------------------------
    CODE FOR REGISTER PAGE
 --------------------------------- */

function registerOnSubmit() {
    // let user = $("#user").val();
    let uni = $("#uni").val();
    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let pass = $("#pass").val();
    let confirm = $("#confirm").val();
    let responses = [uni, fname, lname, pass, confirm];

    for (var i = 0; i < responses.length; i++) {
        if (pass != confirm) {
            alert("Passwords don't match.");
            break;
        }

        if (responses[i] == "") {
            alert("Please complete all fields.");
            break;
        } else {
            insertSignUpData(responses);
            // insert code to create Account class?
            // alert("Account succesfully created!");
            // window.location.href = "index.html"
            break;
        }
    }
}

// Put data into database
function insertSignUpData(responses) {
    let userData = {
        "uni": responses[0],
        "fname": responses[1],
        "lname": responses[2],
        "pass": responses[3]
    };

    console.log(userData);

    // Call C# metohd to insert into table
    $.ajax({
        type: 'POST',
        url: "\AccountServices.asmx\RequestAccount",
        data: userData,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(msg) {
            console.log("success");
        }
    });

}

/* 
    CODE FOR GRADE ENTRY PAGE
*/

function submitGradeEntryData() {
    let school = $("#school").val();
    let year = $("#year").val();
    let term = $("#term").val();
    let major = $("#major").val();
    let cumGpa = $("#cumGpa").val();
    let termGpa = $("#termGpa").val();
    let course = $("#course").val();
    let grade = $("#grade").val();
    let required = [school, year, term, major, cumGpa, termGpa];
    let fullGrades = [school, year, term, major, cumGpa, termGpa, course, grade];
    let optional = false;

    if (fullGrades[6] == "") {
        //handle required
        for (var i = 0; i < required.length; i++) {
            if (required[i] == "") {
                alert("Please complete all fields.");
                break;
            } else if (required[4] > 4 || required[5] > 4) {
                alert("GPA cannot be over 4.0.");
                break;
            } else {
                insertSignUpData(required);
                break;
            }
        }
    } else {
        // handle fullGrades
        for(var i = 0; i < fullGrades.length; i++) {
            if (fullGrades[i] == "") {
                alert("Please complete all fields.");
                break;
            } else if (fullGrades[4] > 4 || fullGrades[5] > 4) {
                alert("GPA cannot be over 4.0.");
                break;
            } else if(fullGrades[7] > 100) {
                alert("Grade cannot be over 100.");
                break;
            } else {
                insertSignUpData(fullGrades);
                break;
            }
        }

    }
}

// GetAccounts js and ajax call
window.onload = function() {
    console.log("hello world")
    $.ajax({
        url: "./AccountServices.asmx.cs",
        type: "POST",
        dataType: "json",
        contextType: "application/json",
        data: { action: "getChartData" },
        traditional: true,
        success: function (results) {
            console.log(grades);
            //var data = google.visualization.arrayToDataTable(grades);
            //var options = {
            //    title: 'My Daily Activities'
            //};
            //var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            //chart.draw(data, options);

            //console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
        }
    }).responseJSON;
}


