/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2035562045")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number306194849",
    "max": null,
    "min": null,
    "name": "Electric_Old",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1191098625",
    "max": null,
    "min": null,
    "name": "Electric_New",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number1131724608",
    "max": null,
    "min": null,
    "name": "Electric_KW",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number491703804",
    "max": null,
    "min": null,
    "name": "Electric_Charge",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2035562045")

  // remove field
  collection.fields.removeById("number306194849")

  // remove field
  collection.fields.removeById("number1191098625")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1131724608",
    "max": null,
    "min": null,
    "name": "Quantity_Electric",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number491703804",
    "max": null,
    "min": null,
    "name": "Electric",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
