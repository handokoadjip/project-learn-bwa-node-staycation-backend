const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");

const expect = chai.expect;
chai.use(chaiHttp);

const app = require("../app");

describe("API ENDPOINT TESTING", function () {
  this.timeout(6000);
  it("GET hero data", (done) => {
    chai
      .request(app)
      .get("/v1/api/general/hero")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        // expect(res.body).to.be.an("object");
        // expect(res.body).to.have.property("data");

        // expect(res.body.data).to.have.all.keys(
        //   "travelers",
        //   "treasures",
        //   "cities"
        // );

        done();
      });
  });

  it("GET most picked data", (done) => {
    chai
      .request(app)
      .get("/v1/api/vacation/most-picked")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        // expect(res.body).to.be.an("object");
        // expect(res.body).to.have.property("data");

        // expect(res.body.data).to.have.an("array");
        // expect(res.body.data).to.have.all.keys(
        //   "_id",
        //   "name",
        //   "imageUrl",
        //   "country",
        //   "city",
        //   "price",
        //   "unit"
        // );

        done();
      });
  });

  it("GET category data", (done) => {
    chai
      .request(app)
      .get("/v1/api/category")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        // expect(res.body).to.be.an("object");
        // expect(res.body).to.have.property("data");

        // expect(res.body.data).to.have.all.keys(
        //   "_id",
        //   "name",
        //   "imageUrl",
        //   "country",
        //   "city",
        //   "isPopular"
        // );

        done();
      });
  });

  it("GET testimony data", (done) => {
    chai
      .request(app)
      .get("/v1/api/general/testimony")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        // expect(res.body).to.be.an("object");
        // expect(res.body).to.have.property("data");

        // expect(res.body.data).to.have.all.keys(
        //   "_id",
        //   "imageUrl",
        //   "name",
        //   "rate",
        //   "content",
        //   "familyName",
        //   "familyOccupation"
        // );

        done();
      });
  });

  it("GET vacation detail data", (done) => {
    chai
      .request(app)
      .get("/v1/api/vacation/5e96cbe292b97300fc902222")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        done();
      });
  });

  it("POST booking data", (done) => {
    const image = __dirname + "/bukti-bayar.jpeg";
    const dataSample = {
      bookingStartDate: "02-04-2020",
      bookingEndDate: "08-04-2020",
      vacationId: "5e96cbe292b97300fc902223",
      duration: 7,
      firstName: "Riris",
      lastName: "Cantik",
      email: "rizkianus@gmail.com",
      phoneNumber: "089650574913",
      accountHolder: "Rizkia",
      bankFrom: "BCA",
      image,
    };

    chai
      .request(app)
      .post("/v1/api/booking/store")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("bookingStartDate", dataSample.bookingStartDate)
      .field("bookingEndDate", dataSample.bookingEndDate)
      .field("vacationId", dataSample.vacationId)
      .field("duration", dataSample.duration)
      .field("firstName", dataSample.firstName)
      .field("lastName", dataSample.lastName)
      .field("email", dataSample.email)
      .field("phoneNumber", dataSample.phoneNumber)
      .field("accountHolder", dataSample.accountHolder)
      .field("bankFrom", dataSample.bankFrom)
      .attach("image", fs.readFileSync(dataSample.image), "bukti-bayar.jpeg")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);

        done();
      });
  });
});
