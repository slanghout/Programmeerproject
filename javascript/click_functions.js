  document.getElementById("Calories").onclick = function() {
    UpdateScatter(ScatterData(calories, patient_info[0]), "Kilocalories", "per capita per day");
  }
  document.getElementById("Fat").onclick = function() {
    UpdateScatter(ScatterData(fat, patient_info[0]), "Grammes of fat", "per capita per day");
  }
  document.getElementById("Protein").onclick = function() {
    UpdateScatter(ScatterData(protein, patient_info[0]), "Grammes of protein", "per capita per day");
  }
  document.getElementById("Fruit").onclick = function() {
    UpdateScatter(ScatterData(fruit, patient_info[0]), "Kilos of fruit", "per capita per year");
  }
  document.getElementById("Vegetables").onclick = function() {
    UpdateScatter(ScatterData(veggies, patient_info[0]), "Kilos of vegetables", "per capita per year");
  }
  document.getElementById("Sugar").onclick = function() {
    UpdateScatter(ScatterData(sugar, patient_info[0]), "Kilos of sugar", "per capita per year");
  }

  document.getElementById("All").onclick = function() {
    UpdateMapAll(MapData(patient_info, 0));
  }
  document.getElementById("Male").onclick = function() {
    UpdateMapMale(MapData(patient_info, 1));
  }
  document.getElementById("Female").onclick = function() {
    UpdateMapFemale(MapData(patient_info, 2));
  }