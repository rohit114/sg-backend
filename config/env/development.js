module.exports = {


 data: {

  message: "Hello from dev!!!",
 },

 myConnections: {

    postgresM1: {
      adapter: 'sails-postgresql',
      host: 'localhost',
      port: '5432',
      user: 'admin',
      password: '',
      database: 'mydb',
      pool: false,
      ssl: false,
    },

  },

  clientData: {
    "cpSide": './sg-data/sample-data/OneToOneMatchingSampleData/ClientOneToOneMatchingSampleData/',
    "sgSide": './sg-data/sample-data/OneToOneMatchingSampleData/SgOneToOneMatchingSampleData/'
  }


};