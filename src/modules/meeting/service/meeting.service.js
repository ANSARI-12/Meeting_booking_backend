const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

async function createMeeting(data) {
  const { userId, title, startTime, endTime } = data;

  const conflict = await hasConflict({ userId, startTime, endTime });
  if (conflict) {
    throw new Error("Meeting conflict detected");
  }

  return Meeting.create(data);
}

async function hasConflict({ userId, startTime, endTime, excludeId }) {
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

async function getAllMeetings() {
  return Meeting.findAll();
}

async function getMeetingById(id) {
  return Meeting.findByPk(id);
}

async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw new Error("Meeting not found");
  }
  const { userId, title, startTime, endTime } = data;
  if (userId !== undefined) meeting.userId = userId;
  if (title !== undefined) meeting.title = title;
  if (startTime !== undefined) meeting.startTime = startTime;
  if (endTime !== undefined) meeting.endTime = endTime;
  await meeting.save();
  return meeting;
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw new Error("Meeting not found");
  }
  await meeting.destroy();
  return { message: "Meeting deleted successfully" };
}

module.exports = {
  createMeeting,
  hasConflict,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
