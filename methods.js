const express= require('express');
const app=express();


app.use(express.json());
app.listen(3000,()=>{
    console.log('connected to port 3000')
});

// let users={};

// app.get('/users',(req,res)=>{
//     res.send(users);
// })
// app.post('/users',(req,res)=>{
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data sent successfully",
//         users: req.body
//     })
// })

// app.patch('/users',(req,res)=>{
//     dataToBeUpdated=req.body;
//     //update data in user object
//     for(key in dataToBeUpdated){
//         users[key]=dataToBeUpdated[key];
//     }
//     res.json({
//         message:"Data updated succesfully",
//         user: users
//     })
// })


// app.delete('/users',(req,res)=>{
//    users={}
//     res.json({
//         message:"data has been deleted"
//     })
// })



///params//

// let users={
//     "U1":
//             {
//                 "id":1,
//                 "name":"Sandip"
//             },
//     "U2":
//             {
//                 "id":2,
//                 "name":"Nikith"
//             },
//     "U2":
//             {
//                 "id":3,
//                 "name":"Sharon"
//             },
// }


// let users = [];

// app.post('/users', (req, res) => {
//     const newUser = req.body; 
//     users.push(newUser); // Add the new user to the users array
//     console.log(newUser); // Log the new user
//     res.json({
//         message: "User posted successfully"
//     });
// });

/////////// mini app /////////////////////



