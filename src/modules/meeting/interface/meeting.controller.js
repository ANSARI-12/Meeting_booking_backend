const meetingService = require("../service/meeting.service");

async function create(req, res, next) {
  try {
    const { userId, title, startTime, endTime } = req.body;

    if (!userId || !title || !startTime || !endTime) {
      return res.status(400).json({
        message: "userId, title, startTime, and endTime are required",
      });
    }

    const meeting = await meetingService.createMeeting({
      userId,
      title,
      startTime,
      endTime,
    });

    res.status(201).json(meeting);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const meetings = await meetingService.getAllMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const meeting = await meetingService.getMeetingById(id);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.status(200).json(meeting);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const { userId, title, startTime, endTime } = req.body;

    const updatedMeeting = await meetingService.updateMeeting(id, {
      userId,
      title,
      startTime,
      endTime,
    });

    res.status(200).json(updatedMeeting);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const result = await meetingService.deleteMeeting(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: remove,
};
