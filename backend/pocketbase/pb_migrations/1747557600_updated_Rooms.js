/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1982237561")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool3844664272",
    "name": "Cable",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1982237561")

  // remove field
  collection.fields.removeById("bool3844664272")

  return app.save(collection)
})
