var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb://localhost/staycation",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Bank",
      "./models/Booking",
      "./models/Category",
      "./models/Feature",
      "./models/Image",
      "./models/Member",
      "./models/Treasure",
      "./models/User",
      "./models/Vacation",
    ]);

    // Clear specified collections
    seeder.clearModels(
      [
        "Bank",
        "Booking",
        "Category",
        "Feature",
        "Image",
        "Member",
        "Treasure",
        "User",
        "Vacation",
      ],
      function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
          seeder.disconnect();
        });
      }
    );
  }
);

var data = [
  // start bank
  {
    model: "Bank",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903322"),
        bank: "Mandiri",
        accountNumber: "089898",
        name: "Hans Natadiredja",
        imageUrl: "images/bank/logo-mandiri.png",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903323"),
        bank: "BCA",
        accountNumber: "878678",
        name: "Rizkianus",
        imageUrl: "images/bank/logo-bca.png",
      },
    ],
  },
  // end bank

  // start booking
  {
    model: "Booking",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cee1"),
        bookingStartDate: "12-12-2020",
        bookingEndDate: "12-12-2020",
        invoice: 1231231,
        vacationId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
          name: "Tabby Town",
          price: 12,
          duration: 2,
        },
        total: 24,
        memberId: mongoose.Types.ObjectId("5e96cbe292b97300fc903333"),
        bankId: mongoose.Types.ObjectId("5e96cbe292b97300fc903323"),
        payments: {
          proofPayment: "images/payment/bukti.jpg",
          bankFrom: "BCA",
          status: "Proses",
          accountHolder: "Handoko Adji Pangestu",
        },
      },
    ],
  },
  // end booking

  // start category
  {
    model: "Category",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        name: "Houses with beauty backyard",
        vacationId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        name: "Hotels with large living room",
        vacationId: [],
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
        name: "Apartment with kitchen",
        vacationId: [],
      },
    ],
  },
  // end category

  // start feature
  {
    model: "Feature",
    documents: [
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa01"),
        name: "bedroom",
        qty: 2,
        imageUrl: "images/feature/feature-1.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa02"),
        name: "living room",
        qty: 23,
        imageUrl: "images/feature/feature-2.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa03"),
        name: "televison",
        qty: 12,
        imageUrl: "images/feature/feature-3.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa04"),
        name: "televison",
        qty: 5,
        imageUrl: "images/feature/feature-4.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa05"),
        name: "mbp/s",
        qty: 5,
        imageUrl: "images/feature/feature-5.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa06"),
        name: "unit ready",
        qty: 5,
        imageUrl: "images/feature/feature-6.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa07"),
        name: "refigrator",
        qty: 5,
        imageUrl: "images/feature/feature-7.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa08"),
        name: "televion",
        qty: 5,
        imageUrl: "images/feature/feature-8.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      // item 2
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa09"),
        name: "badroom",
        qty: 2,
        imageUrl: "images/feature/feature-9.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa10"),
        name: "living room",
        qty: 23,
        imageUrl: "images/feature/feature-10.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa11"),
        name: "televison",
        qty: 12,
        imageUrl: "images/feature/feature-11.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa12"),
        name: "televison",
        qty: 5,
        imageUrl: "images/feature/feature-12.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa13"),
        name: "mbp/s",
        qty: 5,
        imageUrl: "images/feature/feature-13.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa14"),
        name: "unit ready",
        qty: 5,
        imageUrl: "images/feature/feature-14.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa15"),
        name: "refigrator",
        qty: 5,
        imageUrl: "images/feature/feature-15.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa16"),
        name: "televion",
        qty: 5,
        imageUrl: "images/feature/feature-16.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
    ],
  },
  // end feature

  // start image
  {
    model: "Image",
    documents: [
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb1"),
        imageUrl: "images/vacation/item-1.png",
      },
      // done
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb2"),
        imageUrl: "images/vacation/item-2.png",
      },
      // done
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb3"),
        imageUrl: "images/vacation/item-3.png",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb4"),
        imageUrl: "images/vacation/item-4.png",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb5"),
        imageUrl: "images/vacation/item-5.png",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb6"),
        imageUrl: "images/vacation/item-6.png",
      },
    ],
  },
  // end image

  // start member
  {
    model: "Member",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903333"),
        firstName: "Hans",
        lastName: "Natadiredja",
        email: "handokoadjipangestu@gmail.com",
        phoneNumber: "089650574913",
      },
    ],
  },
  // end member

  // start treasure
  {
    model: "Treasure",
    documents: [
      // done
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb01"),
        name: "Green Lake",
        category: "Nature",
        imageUrl: "images/treasure/activity-1.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb02"),
        name: "Dog Clubs",
        category: "Pool",
        imageUrl: "images/treasure/activity-2.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb03"),
        name: "Labour and Wait",
        category: "Shopping",
        imageUrl: "images/treasure/activity-3.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb04"),
        name: "Labour and Wait",
        category: "Shopping",
        imageUrl: "images/treasure/activity-4.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      },
      // done 2
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb05"),
        name: "Green Lake",
        category: "Nature",
        imageUrl: "images/treasure/activity-5.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb06"),
        name: "Dog Clubs",
        category: "Pool",
        imageUrl: "images/treasure/activity-6.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb07"),
        name: "Labour and Wait",
        category: "Shopping",
        imageUrl: "images/treasure/activity-7.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb08"),
        name: "Labour and Wait",
        category: "Shopping",
        imageUrl: "images/treasure/activity-4.png",
        vacationId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      },
    ],
  },
  // end treasure

  // start user
  {
    model: "User",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903345"),
        username: "admin",
        password: "rahasia",
      },
    ],
  },
  // end user

  // start vacation
  {
    model: "Vacation",
    documents: [
      // houses
      // done
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
        name: "Tabby Town",
        price: 12,
        country: "Indonesia",
        city: "Lampung",
        isPopular: false,
        desc:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        unit: "night",
        sumBooking: 2,
        categoryId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        },
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb4") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb5") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb6") },
        ],
        featureId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa09") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa10") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa11") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa12") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa13") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa14") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa15") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa16") },
        ],
        treasureId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb05") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb06") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb07") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb08") },
        ],
      },
      // done
      {
        // done
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
        name: "Seattle Rain",
        price: 20,
        country: "Indonesia",
        city: "Bandung",
        isPopular: false,
        desc:
          "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
        unit: "night",
        sumBooking: 4,
        categoryId: {
          _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        },
        imageId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb1") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb2") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb3") },
        ],
        featureId: [
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa01") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa02") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa03") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa04") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa05") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa06") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa07") },
          // done
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa08") },
        ],
        activityId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb01") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb02") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb03") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb04") },
        ],
      },
    ],
  },
  // end vacation
];
