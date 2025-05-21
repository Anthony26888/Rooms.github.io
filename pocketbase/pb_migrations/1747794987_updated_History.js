/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2035562045")

  // add field
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2035562045")

  // remove field
  collection.fields.removeById("number1131724608")

  return app.save(collection)
})
