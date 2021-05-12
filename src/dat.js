async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision')
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient()
  
    // Performs label detection on the image file
    const [result] = await client.textDetection('./resources/score.jpg')
    const text = result.textAnnotations
    console.log('Text:')
    const pictureFunction = identifyPictureType(text[0].description)
    console.log(pictureFunction)
    const buffer = await pictureFunction('./resources/score.jpg')
    const [secondBuffer] = await client.textDetection(buffer)
    const secondBufferResult = secondBuffer.textAnnotations
    
    console.log(secondBufferResult[0].description)
    // console.log(identifyPictureType(text[0].description))
    // text.forEach(text => console.log(text))
    // console.log(text[0].description)
    // const resultArray = text[0].description.split('\n')
    // console.log(resultArray)

    // const resultMap = {
    //     date: resultArray[1],
    //     location: resultArray[2],
    //     pokemon: resultArray[3],
    //     score: resultArray[5],
    //     pose: resultArray[7],
    //     size: resultArray[9],
    //     direction: resultArray[11],
    //     placement: resultArray[14],
    //     otherPokemon: resultArray[16]
    // }
    // console.log(resultMap)
}

function identifyPictureType(text) {
    if(text.includes('Score') && text.includes('Pose') && text.includes('Size') && text.includes('Placement')){
        return cropOutScorePiece
    }
    else{
        return 'pls no'
    }
}

async function cropOutScorePiece(picture) {
    const sharp = require('sharp')
    const extractSharp = sharp(picture).extract({
        left: 170,
        top: 30,
        width: 940,
        height: 479
    })
    
    return await extractSharp.toBuffer()
    
}

quickstart()
