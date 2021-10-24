const messages = [];
  
  const getMessages = () => {
    return messages;
  };
  
  const saveMessages = (message) => {
    messages.push(message);
  }
  
  module.exports = {
    getMessages,
    saveMessages
  };