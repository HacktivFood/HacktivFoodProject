# HacktivFoodProject

**HacktivFood**
----
HacktivFood Apps merupakan aplikasi untuk mencari makanan dengan keyword bahan makanannya, serta mencari data restoran terdekat

**URL**

`/users/register`

Method:

`POST`

Data Params

```JSON
    {
        "email" : STRING,
        "password" : STRING
    }
```

**Success Response:**<br/>
**Code:** 200<br/>

```JSON
    {
        "email" : STRING,
        "password" : STRING
    }
```

**Code:** 500 INTERNAL SERVER ERROR <br />
```JSON
    {
        "status" : 500,
        "body" :
            {
                "error" : "Internal Server Error",
                "message" : [STRING Message]
            }
    }
```

------------------------------------------------------------------------------------------------------
<br/>

**URL**

`/users/login`

Method:

`POST`

Data Params

```JSON
    {
        "email" : STRING,
        "password" : STRING
    }
```

**Success Response:**<br/>
**Code:** 200<br/>

```JSON
    {
        "token" : STRING
    }
```

**Error Response:**<br/>
**Code:** 500 INTERNAL SERVER ERROR <br />

```JSON
    {
        "status" : 500,
        "body" :
            { 
                "error" : "Internal Server Error",
                "message" : [STRING Message]
            }
    }
```

------------------------------------------------------------------------------------------------------
<br/>

**URL**

`/restaurants`

Method:

`GET`

Request Header
```JSON
    {
        "token": STRING Token   
    }
```

URL Params

Required:

```id=[integer]```

**Success Response:**<br />
**Code:** 200<br />
```JSON
    {
        "status" : 200,
        "xxx": {
            "id": INTEGER,
            "title": STRING,
            "description": STRING,
            "status": false,
            "due_date": DATEONLY,
            "updatedAt": TIMESTAMP,
            "createdAt": TIMESTAMP
        }
    }
```

**Error Response:** <br />
**Code:** 404 ERROR NOT FOUND <br />
```JSON
    {
        "status" : 404,
        "body" :
            {
                error : "Error Not Found"
            }
    }
```

------------------------------------------------------------------------------------------------------
<br/>

**URL**

`/recipes`

Method:

`POST`

Data Params

```JSON
    {
        "title" : STRING
    }
```

**Success Response:**<br/>
**Code:** 200<br/>

```JSON
    {
        "status" : 200,
        "xxx" :
            {
                "id": INTEGER,
                "title": STRING,
                "description": STRING,
                "status": false,
                "due_date": DATEONLY,
                "updatedAt": TIMESTAMP,
                "createdAt": TIMESTAMP
            }
    }
```

**Error Response:**<br />
**Code:** 500 INTERNAL SERVER ERROR <br />
```JSON
    {
        "status" : 500,
        "body" :
            {
                error : "Internal Server Error"
            }
    }
```

------------------------------------------------------------------------------------------------------
<br/>

**URL**

`/nutrition/:food`

Method:

`GET`

Data Params

```JSON
    {
        "food" : STRING,
    }
```

**Success Response:**<br/>
**Code:** 200<br/>

```JSON
{
    "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_fbd2f1d8bf8b4fe9b00b716839cefda9",
    "calories": 62,
    "totalWeight": 44.0,
    "dietLabels": [
        "LOW_CARB"
    ],
    "healthLabels": [
        "SUGAR_CONSCIOUS",
        "VEGETARIAN",
        "PEANUT_FREE",
        "TREE_NUT_FREE",
        "ALCOHOL_FREE",
        "SULPHITE_FREE"
    ],
    "cautions": [],
    "totalNutrients": {
        "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 62.92,
            "unit": "kcal"
        },
        "FAT": {
            "label": "Fat",
            "quantity": 4.1844,
            "unit": "g"
        },
        "FASAT": {
            "label": "Saturated",
            "quantity": 1.37544,
            "unit": "g"
        },
        "WATER": {
            "label": "Water",
            "quantity": 33.506,
            "unit": "g"
        }
    },
    "totalDaily": {
        "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 3.146,
            "unit": "%"
        },
        "CHOLE": {
            "label": "Cholesterol",
            "quantity": 54.56,
            "unit": "%"
        }
    },
    "totalNutrientsKCal": {
        "ENERC_KCAL": {
            "label": "Energy",
            "quantity": 63,
            "unit": "kcal"
        },
        "PROCNT_KCAL": {
            "label": "Calories from protein",
            "quantity": 23,
            "unit": "kcal"
        },
        "FAT_KCAL": {
            "label": "Calories from fat",
            "quantity": 39,
            "unit": "kcal"
        },
        "CHOCDF_KCAL": {
            "label": "Calories from carbohydrates",
            "quantity": 1,
            "unit": "kcal"
        }
    }
}```

**Error Response:**<br />
**Code:** 500 INTERNAL SERVER ERROR <br />
```JSON
    {
        "status" : 500,
        "body" :
            {
                error : "Internal Server Error"
            }
    }
```