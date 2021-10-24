const messages = [];
  
  const getMessages = () => {
    return messages;
  };
  
  const saveMessage = (message) => {
    messages.push(message);
  }
  
  module.exports = {
    getMessages,
    saveMessage
  };