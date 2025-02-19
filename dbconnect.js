const {Sequelize}=require("sequelize");
const sequelize=new Sequelize("backendzomato","root","riya",{
host:"localhost",
dialect:"mysql"
});
sequelize.authenticate().then(()=>{
    console.log("data base connected succesfully");
})
.catch((err)=>{
    console.log("error to connect"+err);
})
sequelize.sync({alert:true})
.then(()=>{
    console.log("data sync succesfully");
})
.catch((err)=>{
    console.log("data havent sync succesufully",err);
})
module.exports=sequelize;