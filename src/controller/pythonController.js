const {spawn} = require("child_process")
const path = require("path");
const fs = require("fs");
const which = require("which")

const pythonScript = function(req,res){
    const pythonExecutable = which.sync("python");
      const saveLocation = path.join(__dirname,"../../img.jpg");
    // const filepath = 
    fs.readFile(saveLocation, (err, data) => {
        if (err) {
          console.error("Error reading image:", err);
          return;
        }
        
        // Convert the image data to a base64 string
        const base64Image = Buffer.from(data).toString("base64");
    
        // Use the 'spawn' function to execute the Python script
        const pythonProcess = spawn("python", [
          path.join(__dirname, "../../../pro23_playing_card_ml/predict_pipeline.py"),
          "--model",
          path.join(
            __dirname,
            "../../../pro23_playing_card_ml/card_predict(model1).onnx"
          ),
          "--source",
          base64Image,
        ]);
    
        // Capture the standard output and standard error of the Python script
        pythonProcess.stdout.on("data", (data) => {
          const result = data.toString();
          // Send the result back to the renderer process (frontend)
          res.send({data:result,type:typeof(result)})});
    
        pythonProcess.stderr.on("data", (data) => {
          // console.log(data,"data")
          console.error(`Python : ${data}`);
        });
    
        // Handle the Python script exit event
        pythonProcess.on("close", (code) => {
          console.log(`Python script exited with code ${code}`);
        });
      });

}

module.exports=pythonScript