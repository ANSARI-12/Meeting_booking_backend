const { Op } = require("sequelize");
const Meeting = require("../modules/meeting/model/meeting.model");

async function hasConflict({ userId, startTime, endTime, excludeId }) {
  if (!userId) {
    throw new Error("userId is required");
  }
  const whereClause = {
    userId,
    startTime: { [Op.lt]: endTime },
    endTime: { [Op.gt]: startTime },
  };

  if (excludeId) {
    whereClause.id = { [Op.ne]: excludeId };
  }

  return Meeting.findOne({ where: whereClause });
}

module.exports = hasConflict;
