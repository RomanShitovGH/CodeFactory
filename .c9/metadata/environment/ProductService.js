{"filter":false,"title":"ProductService.js","tooltip":"/ProductService.js","undoManager":{"mark":16,"position":16,"stack":[[{"start":{"row":27,"column":4},"end":{"row":28,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":28,"column":0},"end":{"row":28,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":27,"column":4},"end":{"row":32,"column":3},"action":"insert","lines":["let mongoId;","  try {","    mongoId = ObjectID(id);","  } catch(err) {","    ...","  }"],"id":3}],[{"start":{"row":28,"column":0},"end":{"row":28,"column":2},"action":"insert","lines":["  "],"id":4},{"start":{"row":29,"column":0},"end":{"row":29,"column":2},"action":"insert","lines":["  "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":2},"action":"insert","lines":["  "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":2},"action":"insert","lines":["  "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":27,"column":4},"end":{"row":28,"column":0},"action":"insert","lines":["",""],"id":5},{"start":{"row":28,"column":0},"end":{"row":28,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":41,"column":12},"end":{"row":41,"column":13},"action":"remove","lines":[";"],"id":6},{"start":{"row":41,"column":11},"end":{"row":41,"column":12},"action":"remove","lines":["u"]}],[{"start":{"row":35,"column":14},"end":{"row":35,"column":63},"action":"remove","lines":["productCollection.findOne({ _id: ObjectID(id) });"],"id":7}],[{"start":{"row":41,"column":11},"end":{"row":41,"column":60},"action":"insert","lines":["productCollection.findOne({ _id: ObjectID(id) });"],"id":8}],[{"start":{"row":41,"column":44},"end":{"row":41,"column":56},"action":"remove","lines":["ObjectID(id)"],"id":9},{"start":{"row":41,"column":44},"end":{"row":41,"column":51},"action":"insert","lines":["mongoId"]}],[{"start":{"row":35,"column":4},"end":{"row":40,"column":9},"action":"remove","lines":["const u = ","    //  .then(function (products) {","    //    if (products) {","    //      return  products;  ","    //    }","    //});"],"id":10},{"start":{"row":35,"column":2},"end":{"row":35,"column":4},"action":"remove","lines":["  "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":2},"action":"remove","lines":["  "]},{"start":{"row":34,"column":4},"end":{"row":35,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"remove","lines":["."],"id":11},{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"remove","lines":["."]},{"start":{"row":32,"column":6},"end":{"row":32,"column":7},"action":"remove","lines":["."]}],[{"start":{"row":32,"column":6},"end":{"row":32,"column":30},"action":"insert","lines":["return Promise.reject();"],"id":12}],[{"start":{"row":32,"column":19},"end":{"row":32,"column":20},"action":"remove","lines":["e"],"id":13}],[{"start":{"row":32,"column":13},"end":{"row":32,"column":19},"action":"remove","lines":["Promis"],"id":14},{"start":{"row":32,"column":13},"end":{"row":32,"column":20},"action":"insert","lines":["Promise"]}],[{"start":{"row":32,"column":28},"end":{"row":32,"column":54},"action":"insert","lines":["new Error(\"Error message\")"],"id":15}],[{"start":{"row":27,"column":2},"end":{"row":27,"column":4},"action":"remove","lines":["  "],"id":16},{"start":{"row":27,"column":0},"end":{"row":27,"column":2},"action":"remove","lines":["  "]},{"start":{"row":26,"column":16},"end":{"row":27,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":33,"column":2},"end":{"row":33,"column":4},"action":"remove","lines":["  "],"id":17},{"start":{"row":33,"column":0},"end":{"row":33,"column":2},"action":"remove","lines":["  "]},{"start":{"row":32,"column":5},"end":{"row":33,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":31,"column":39},"end":{"row":31,"column":52},"action":"remove","lines":["Error message"],"id":18},{"start":{"row":31,"column":39},"end":{"row":31,"column":40},"action":"insert","lines":["5"]},{"start":{"row":31,"column":40},"end":{"row":31,"column":41},"action":"insert","lines":["0"]},{"start":{"row":31,"column":41},"end":{"row":31,"column":42},"action":"insert","lines":["0"]}]]},"ace":{"folds":[],"scrolltop":180,"scrollleft":0,"selection":{"start":{"row":31,"column":42},"end":{"row":31,"column":42},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":102,"mode":"ace/mode/javascript"}},"timestamp":1584953076647,"hash":"1f649d51ef62eb63cbc8c8cca985db90ea52bcac"}