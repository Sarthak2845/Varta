module.exports = (participants, senderId) =>
  participants.find(id => id.toString() !== senderId.toString());
