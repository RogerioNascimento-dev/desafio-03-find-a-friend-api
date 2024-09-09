# Challenge find a friend api

## [Challenge regarding the module: Node.js API with SOLID](https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19#b932fdc8ace240568a620ac4dc4c82e5)

### Functional requirements

- ✅ It must be possible to register a pet
- ✅ It must be possible to list all the pets available for adoption in a city
- ✅ It must be possible to filter pets by their characteristics
- ✅ It should be possible to view details of a pet for adoption
- ✅ It should be possible to register as an ORG
- ✅ It must be possible to log in as an ORG


### Non-functional requirements

- ✅ In order to list the pets, we must inform the city
- ✅ An ORG must have an address and a WhatsApp number
- ✅ A pet must be linked to an ORG
- ✅ The user who wants to adopt will contact the ORG via WhatsApp
- ✅ All filters, apart from the city, are optional
- ✅ For an ORG to access the application as an admin, it must be logged in

### Summary
🟨 Pending
✅ Completed

Translated with DeepL.com (free version)

## Organizations

### Organizations Routes `/organization`
| Method | Route          | Description                     | Authentication Required |
| ------ | ------------   | ------------------------------- | ----------------------- |
| POST   | `/organization`| Create a new organization       | No                      |

### Auth Routes `/auth`
| Method | Route          | Description                     | Authentication Required |
| ------ | ------------   | ------------------------------- | ----------------------- |
| POST   | `/auth/login`  | Organization authentication     | No                      |
| POST   | `/auth/refresh`| Refresh token                   | No                      |

### Pet Routes `/pet`
| Method | Route                | Description                         | Authentication Required |
| ------ | -------------------- | ----------------------------------- | ----------------------- |
| POST   | `/pet`               | Create a new pet                    | Yes, Require JWT Token  |
| GET    | `/pet/:city?q`       | List all pets with filters          | No                      |
| GET    | `/pet/:petId/detail` | returns all the details of the pet  | No                      |

