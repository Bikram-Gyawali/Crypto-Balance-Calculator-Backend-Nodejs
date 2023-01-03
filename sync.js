let cron = require("node-cron");
const storeNewWalletBalance = require("./utils/storeWallets");
const moveCollections = require("./utils/moveCollections");

let scheduledTask = async () =>
  cron.schedule("*/5 * * * *", async () => {
    console.log("inside schedule");
    try {
      await storeNewWalletBalance();
    } catch (error) {
      return error;
    } finally {
      try {
        await moveCollections();
      } catch (error) {
        return error;
      }
    }
  });

module.exports = scheduledTask;
