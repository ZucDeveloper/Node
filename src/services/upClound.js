var cloudinary = require('cloudinary').v2
const config = require('../config');

cloudinary.config({
  cloud_name: config.containerConnectionString.cloundName,
  api_key: config.containerConnectionString.apiKey,
  api_secret: config.containerConnectionString.apiSecret
});


exports.upProduct = async (data, id, folder) => {
  cloudinary.uploader.upload(
    data,
    {      
      public_id: id,
      folder: folder
    },
    function (error, result) {
      console.log('entrei na function resposta do cloudinary')
      if (error) {
        console.log('erro do cloudnary', error)
        
      }
      else if (result) {
        console.log('acerto do cloudinary', result)
      }
    })
};