/*
 * A filter object for finding events that end yesterday 
 * in a MongoDB collection that only has a `startDate` field and a `duration` (in minutes) field.
 */
const yesterdayMidnight = new Date(new Date().setUTCHours(0,0,0,0) - 8.64e7).toUTCString();
const filter = {
    '$expr' : {
        // Yesterday's midnight equals the midnight before the endDate
        '$eq': [
            {$toDate : yesterdayMidnight},
            // Construct midnight before endDate
            {
                $dateFromParts: {
                    // Pull year part from endDate
                    year : {$year :
                        // Convert startDate + duration into endDate
                        {$toDate :
                            {$add : [
                                {$toDate: '$startDate'},
                                // Get duration in milliseconds
                                {$multiply: ['$duration', 60000]}
                            ]}
                        }
                    },
                    // Pull month part from endDate
                    month : {$month :
                        // Convert startDate + duration into endDate
                        {$toDate :
                            {$add : [
                                {$toDate: '$startDate'},
                                // Get duration in milliseconds
                                {$multiply: ['$duration', 60000]}
                            ]}
                        }
                    },
                    // Pull day part from endDate
                    day : {$dayOfMonth :
                        // Convert startDate + duration into endDate
                        {$toDate :
                            {$add : [
                                {$toDate: '$startDate'},
                                // Get duration in milliseconds
                                {$multiply: ['$duration', 60000]}
                            ]}
                        }
                    }
                }
            }
        ]
    }
};
