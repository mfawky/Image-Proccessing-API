# Image-Proccessing-API

To Run the app on your local machine

Type ---> [ npm i OR npm install ] to install node_modules file

Type ---> [ npm run build ] to compile and convert the ts into js

Type ---> [ npm start OR npm run start ] to start the server

Type ---> [ npm run prettier ] to run prettier

Type ---> [ npm run lint ] to run eslint

The URL of the app to test :
Try this to test the img
    -[ http://localhost:3000/api/images?fileName=santamonica&width=300&height=400 ]
    
You can add any img to the assets\full folder and test it

Just write the name of the img and the new size you want it to be in

for example ---> [ icelandwaterfall.jpg ] is located in the assets\full folder and i haven't tested it 

yet so you may try typing --->
    -[ http://localhost:3000/api/images?fileName=icelandwaterfall&width=170&height=210 ]

The img will appear with the new size you written and the resized img will be created in 

assets\thumb   folder with the same name as before+"_thumb"+"_170"+"_210".jpg so its new name & path will be  : 
    -[ assets\full\icelandwaterfall_thumb_170_210.jpg ]

Also, evertime you resize the same img it will be created again and again with the new size, name & 

path, only if its not existed before in the assets\thumb folder.

    



