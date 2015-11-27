
Meteor.methods({
    "removeMeasurementsByPatientId": function(patientId) {
        Measurements.remove(
            {patientId: patientId}
        );
    },

    "removePatientMeasurement": function(lesionObject) {

        // Find patient data
        var measurementData = Measurements.findOne(
            {
                patientId: lesionObject.patientId,
                isTarget: lesionObject.isTarget,
                lesionNumber: lesionObject.lesionNumber
            }
        );

        // Get timepoints
        var timepoints = measurementData.timepoints;

        // Create an array to hold keys of timepoints
        var timepointsIds = Object.keys(timepoints).slice(0);

          timepointsIds.forEach(function(timepointId){
              if(timepointId === lesionObject.timepointId) {
                  delete timepoints[timepointId];
              }
          });

        var newTimepointsIds = Object.keys(timepoints);
        // If there is no timepoints object, remove measurement data
        if(newTimepointsIds.length) {
            //Update measurement timepoints
            Measurements.update(
                {
                    patientId: lesionObject.patientId,
                    isTarget: lesionObject.isTarget,
                    lesionNumber: lesionObject.lesionNumber
                 },
                {
                    $set: {
                        timepoints: timepoints
                    }
                }
            );
        }else {
            // Remove all data
            Measurements.remove(
                {
                    patientId: lesionObject.patientId,
                    isTarget: lesionObject.isTarget,
                    lesionNumber: lesionObject.lesionNumber
                }
            );
        }


    }

});
