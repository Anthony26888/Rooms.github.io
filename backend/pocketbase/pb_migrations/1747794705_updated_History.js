/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2035562045")

  // add field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1982237561",
    "hidden": false,
    "id": "relation237923757",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Room_Id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2035562045")

  // remove field
  collection.fields.removeById("relation237923757")

  return app.save(collection)
})
