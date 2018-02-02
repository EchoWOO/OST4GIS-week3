(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // clean data
  _.forEach(schools,function(school){
     // If we have '19104 - 1234', splitting and taking the first (0th) element
      // as an integer should yield a zip in the format above
  if (typeof school.ZIPCODE === 'string') {
       split = school.ZIPCODE.split(' ');
       normalized_zip = parseInt(split[0]);
       school.ZIPCODE = normalized_zip;
     }
  // Check out the use of typeof here — this was not a contrived example.
      // Someone actually messed up the data entry
     if (typeof school.GRADE_ORG === 'number') {  // if number
       school.HAS_KINDERGARTEN = school.GRADE_LEVEL < 1;
       school.HAS_ELEMENTARY = 1 < school.GRADE_LEVEL < 6;
       school.HAS_MIDDLE_SCHOOL = 5 < school.GRADE_LEVEL < 9;
       school.HAS_HIGH_SCHOOL = 8 < school.GRADE_LEVEL < 13;
     } else {  // otherwise (in case of string)
       school.HAS_KINDERGARTEN = school.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
       school.HAS_ELEMENTARY = school.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
       school.HAS_MIDDLE_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
       school.HAS_HIGH_SCHOOL = school.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
      }
   })

  // filter data
  // filter data
  var filtered_data = [];
    var filtered_out = [];
   _.forEach(schools, function(filteredschool) {
      isOpen = filteredschool.ACTIVE.toUpperCase() == 'OPEN';
      isPublic = (filteredschool.TYPE.toUpperCase() !== 'CHARTER' ||
                  filteredschool.TYPE.toUpperCase() !== 'PRIVATE');
      isSchool = (filteredschool.HAS_KINDERGARTEN ||
                  filteredschool.HAS_ELEMENTARY ||
                  filteredschool.HAS_MIDDLE_SCHOOL ||
                  filteredschool.HAS_HIGH_SCHOOL);
      meetsMinimumEnrollment = filteredschool.ENROLLMENT > minEnrollment;
      meetsZipCondition = acceptedZipcodes.indexOf(filteredschool.ZIPCODE) >= 0;
      filter_condition = (isOpen &&
                          isSchool &&
                          meetsMinimumEnrollment &&
                          !meetsZipCondition);

      if (filter_condition) {
        filtered_data.push(filteredschool);
      } else {
        filtered_out.push(filteredschool);
      }
    })
    console.log('Included:', filtered_data.length);
    console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  var color;
  _.forEach(filtered_data,function(schooltype){
   isOpen = schooltype.ACTIVE.toUpperCase() == 'OPEN';
   isPublic = (schooltype.TYPE.toUpperCase() !== 'CHARTER' ||
               schooltype.TYPE.toUpperCase() !== 'PRIVATE');
   meetsMinimumEnrollment = schooltype.ENROLLMENT > minEnrollment;
    // Constructing the styling  options for our map
    if (schooltype.HAS_HIGH_SCHOOL){
      color = '#0000FF';
   } else if (schooltype.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': schooltype.ENROLLMENT / 30,
                    'fillColor': color};
   L.circleMarker([schooltype.Y, schooltype.X], pathOpts)
     .bindPopup(schooltype.FACILNAME_LABEL)
      .addTo(map);
 })

})();
