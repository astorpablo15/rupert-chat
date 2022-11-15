const httpServer = require("./app");
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () =>
  console.info(`Server up and running on port ${PORT}`)
);
