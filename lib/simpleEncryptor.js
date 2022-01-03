const encryptKey = "1234567890123456";
const encryptor = require("simple-encryptor")(encryptKey);

const EncryptionHelper = {
  encryptString: function (text) {
    return encryptor.encrypt(text);
  },
  decryptString: function (hash) {
    return encryptor.decrypt(hash);
  },
};

module.exports = EncryptionHelper;
