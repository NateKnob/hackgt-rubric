This is the backend

Run it using `npm run dev` or `npm run start`

Requirements:
```
node
npm
mongo
mongoku
```


## GET /class/:name

Gets the class rubric and the grades of the current user for that class

```json
{
  "classname": "Physics 2212",
  "professor": "Mr. Physics",
  "creator": "George P. Burdell",
  "rubric":[
    {
      "name": "Homework",
      "weight": 0.20,
      "format": "drop_2",
      "subcategories": []
    }
  ],
  "grades":[
    {
      "category": "Homework",
      "name": "Homework 1",
      "percent_grade": 0.92,
      "points": 37,
      "max_points": 40,
      "weight": 1,
      "extra-credit": "false"
    }
  ]
}
```

## POST /class/:name/grade

Add a grade

```json
{
  "category": "Homework",
  "name": "Homework 1",
  "percent_grade": 0.92,
  "points": 37,
  "max_points": 40,
  "weight": 1,
  "extra-credit": "false"
}
```

## POST /class/:name/grade/delete

Deletes the grade with the given name

```json
{
  "name": "Homework 1"
}
```
