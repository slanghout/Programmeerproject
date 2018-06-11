// Sylvie Langhout
// 10792368
// 
// project.js
// File with the functions for D3 Map with charts

// import {MakeMap} from 'make_map'
window.onload = function() {

  console.log('Lets GO GO GO!')

// load in the needed json files
queue()
	.defer(d3.json, 'data/Food_supply.json')
	.defer(d3.json, 'data/patients.json')
	.defer(d3.json, 'data/obesity.json')
	.defer(d3.json, 'data/deceased.json')
	.await(MakeMyProject);

};
function MakeMyProject(error, Food_supply, patients, obesity, deceased) {
  if (error) throw error;

  all_info = []
  male_info = []
  female_info = []

  data_options = ["All", "Male", "Female"]
  patients_lenght = patients.length

  for (var element = 0; element < patients_lenght; element ++)
    {
      if (patients[element].YEA == "2012")
      {
        if (patients[element].Measure == "Incidence per 100 000 population")
        {
          all_info.push(patients[element])
        }
      }
    }

    for (var element = 0; element < patients_lenght; element ++)
    {
      if (patients[element].YEA == "2012")
      {
        if (patients[element].Measure == "Incidence per 100 000 females")
        {
          female_info.push(patients[element])
        }
      }
    }
    for (var element = 0; element < patients_lenght; element ++)
    {
      if (patients[element].YEA == "2012")
      {
        if (patients[element].Measure == "Incidence per 100 000 males")
        {
          male_info.push(patients[element])
        }
      }
    }

    patient_info = [all_info, male_info, female_info]

  start_map = map_data(patient_info, 0)
  make_map(start_map)




 }  
