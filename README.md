# NodeJS-PetStore



## Getting Started

- Clone/Download the project .
#### For AuctionEndPoints Folder :
- Install dependencies using ``` npm install ```
- Run server using on localhost ``` npm run server```<br>
- To bid on some pet with pet id:  POST api/pets/bid/:id<br>
ex : `http://localhost:5000/api/pets/bids/1`<br>
with body: `{ "user_id": "1", "bid_amount": "500"} `

- To get all bids on some pet with pet ID : GET api/pets/bid/:id<br>
ex :  `http://localhost:5000/api/pets/bids/{PET_ID}`

#### For Script Folder :
- Add bidders names with amount of bid seperated by tab in `input.txt` file
- Run Script using ``` node auction.js```
- Winners are generated in `output.txt` file
#### **Assumption : bidders names and amount of bid are seperated with tab**



### Prerequisites

You must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [Postman](https://www.postman.com/) : For testing our api

#### **All routes were tested with Postman**

### Dependencies

| Server-side
| ---
|express: ^4.17.1
|express-validator: ^6.5.0

## Built With

- [Express](https://github.com/expressjs/express) -Server/routing API for web app.
- [Node](https://github.com/nodejs/node) - Backend JS runtime.

## Authors

* **Fatma Akram**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

