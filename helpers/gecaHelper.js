var gecaHelper = {
	prePopulateCaptains : function(){
		var mongoose = require('mongoose');
		var Captain = require('../models/captain').Captain;
		
		//insert these four captains to the db, only if not present
		Captain.find({},function(err,captains){
			if(!err && captains.length !=4){

				Captain.remove({},function(){
					console.log('removed captains if any.....');

					var ninjas = new Captain({
						name:"Mohan Raj",
						teamName:"Ninjas",
						pointsRemaining: 6400
					});

					ninjas.save();

					var redhawks = new Captain({
						name:"Sridharan R",
						teamName:"Red Hawks",
						pointsRemaining:5980
					});

					redhawks.save();

					var gillies = new Captain({
						name:"Abdul",
						teamName: "Gillies",
						pointsRemaining:5980
					});

					gillies.save();

					var kiwis = new Captain({
						name:"Rajkumar",
						teamName: "Kiwis",
						pointsRemaining:7640
					});

					kiwis.save();
					console.log('saved all four captains.');
				});
				
			}
		});
		
		
	}
}
module.exports.gecaHelper = gecaHelper;
