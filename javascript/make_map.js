function MakeMap(error) {
  if (error) throw error;
  var map = new Datamap({element: document.getElementById('container'),
	fills: { defaultFill: "lightgrey" }
	})
 };