var scheduleData = new Firebase("https://first-project-c590d.firebaseio.com/")

$(document).ready(function(){
	console.log("loading complete");

	var train = $("#train-name");
	var destination = $("#destination");
	var firstTime = $("#first-time");
	var frequency = $("#frequency");
	var submit = $("#form-submit");
	
	submit.on("click", function(e){
		e.preventDefault();

		var train = $("#train-name").val().trim();
		var destination = $("#destination").val().trim();
		var firstTime = moment($("#first-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequency = $("#frequency").val().trim();
		var submit = $("#form-submit").val().trim();

		var trainInfo = {
			name:  train,
			destination: destination,
			firstTrain: firstTime,
			frequency: frequency
		};

		scheduleData.push(trainInfo);

		
	})
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		

		return false;
});

scheduleData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		
		var fireName = childSnapshot.val().name;
		var fireDestination = childSnapshot.val().destination;
		var fireFrequency = childSnapshot.val().frequency;
		var fireFirstTrain = childSnapshot.val().firstTrain;

		
		var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
		var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
		var minutes = fireFrequency - remainder;

		var arrival = moment().add(minutes, "m").format("hh:mm A"); 
		console.log(minutes);
		console.log(arrival);

		console.log(moment().format("hh:mm A"));
		console.log(arrival);
		console.log(moment().format("X"));

		
		$("#trainSchedule > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

	});
